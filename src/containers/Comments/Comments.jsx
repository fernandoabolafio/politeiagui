import React, { useEffect, useReducer } from "react";
import { Card, H2, Text, classNames } from "pi-ui";
import styles from "./Comments.module.css";
import LoggedInContent from "src/componentsv2/LoggedInContent";
import CommentForm from "src/componentsv2/CommentForm";
import { useComments, CommentContext } from "./hooks";
import CommentsListWrapper from "./CommentsList/CommentsListWrapper";
import CommentLoader from "./Comment/CommentLoader";
import Link from "src/componentsv2/Link";
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
  threadParentID,
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
    recordType,
    ...commentsCtx
  } = useComments({
    recordToken,
    numOfComments
  });

  const isSingleThread = !!threadParentID;

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
    const numberOfContents = estimateNumberOfTopLevelComments(
      isSingleThread ? 1 : numOfComments
    );
    const contents = [];
    for (let i = 0; i < numberOfContents; i++) {
      contents.push(<CommentLoader />);
    }
    return contents;
  }
  return (
    <Card className={classNames(styles.commentAreaContainer, className)}>
      {!isSingleThread && (
        <LoggedInContent>
          <CommentForm onSubmit={handleSubmitComment} />
        </LoggedInContent>
      )}
      <div className={classNames("justify-space-between", "margin-top-m")}>
        {!isSingleThread && (
          <H2 className={styles.commentsTitle}>
            Comments{" "}
            <span className={styles.commentsCount}>
              {state.comments.length || numOfComments}
            </span>
          </H2>
        )}
        <div className={styles.sortContainer}>
          {!!comments && !!comments.length && (
            <Select
              isSearchable={false}
              value={createSelectOptionFromSortOption(sortOption)}
              onChange={handleSetSortOption}
              options={getSortOptionsForSelect()}
            />
          )}
        </div>
        {isSingleThread && (
          <div className="justify-right">
            <Text className="margin-right-xs">Single comment thread. </Text>
            <Link to={`/${recordType}/${recordToken}`}> View all.</Link>
          </div>
        )}
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
              recordToken,
              threadParentID,
              recordType,
              ...commentsCtx
            }}
          >
            <CommentsListWrapper
              threadParentID={threadParentID}
              comments={state.comments}
            />
          </CommentContext.Provider>
        </div>
      )}
    </Card>
  );
};

export default Comments;
