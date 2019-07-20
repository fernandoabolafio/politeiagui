import React, { useEffect, useReducer } from "react";
import { Card, H2, classNames } from "pi-ui";
import styles from "./Comments.module.css";
import LoggedInContent from "src/componentsv2/LoggedInContent";
import CommentForm from "src/componentsv2/CommentForm";
import { useComments, CommentContext } from "./hooks";
import CommentsList from "./CommentsList";
import CommentLoader from "./Comment/CommentLoader";
import Select from "src/componentsv2/Select";
import useQueryString from "src/hooks/useQueryString";
import {
  estimateNumberOfTopLevelComments,
  getSortOptionsForSelect,
  createSelectOptionFromSortOption,
  commentSortOptions
} from "./helpers";
import { commentsReducer, initialState, actions } from "./commentsReducer";

const Comments = ({
  numOfComments,
  recordToken,
  recordAuthorID,
  className
}) => {
  const [state, dispatch] = useReducer(commentsReducer, initialState);
  const [sortOption, setSortOption] = useQueryString(
    "sort",
    commentSortOptions.SORT_BY_TOP
  );
  const {
    onSubmitComment,
    comments,
    onLikeComment,
    loading,
    ...commentsCtx
  } = useComments({
    recordToken,
    numOfComments
  });

  function handleSubmitComment(comment) {
    return onSubmitComment({
      comment,
      token: recordToken,
      parentID: 0
    });
  }

  function handleSetSortOption(option) {
    setSortOption(option.value);
    dispatch({
      type: actions.SORT,
      sortOption: option.value
    });
  }

  useEffect(
    function handleUpdateComments() {
      if (!!comments && !!comments.length) {
        dispatch({
          type: actions.UPDATE,
          comments,
          sortOption
        });
      }
    },
    [comments, sortOption]
  );

  function renderCommentLoaders() {
    const numberOfContents = estimateNumberOfTopLevelComments(numOfComments);
    const contents = [];
    for (let i = 0; i < numberOfContents; i++) {
      contents.push(<CommentLoader />);
    }
    return contents;
  }
  return (
    <Card className={classNames(styles.commentAreaContainer, className)}>
      <LoggedInContent>
        <CommentForm onSubmit={handleSubmitComment} />
      </LoggedInContent>
      <div className={classNames("justify-space-between", "margin-top-m")}>
        <H2 className={styles.commentsTitle}>
          Comments{" "}
          <span className={styles.commentsCount}>
            {state.comments.length || numOfComments}
          </span>
        </H2>
        <div className={styles.sortContainer}>
          {!!comments && !!comments.length && (
            <Select
              value={createSelectOptionFromSortOption(sortOption)}
              onChange={handleSetSortOption}
              options={getSortOptionsForSelect()}
            />
          )}
        </div>
      </div>
      {loading ? (
        renderCommentLoaders()
      ) : (
        <div className="margin-top-m">
          <CommentContext.Provider
            value={{
              onSubmitComment,
              onLikeComment,
              recordAuthorID,
              ...commentsCtx
            }}
          >
            <CommentsList comments={state.comments} />
          </CommentContext.Provider>
        </div>
      )}
    </Card>
  );
};

export default Comments;
