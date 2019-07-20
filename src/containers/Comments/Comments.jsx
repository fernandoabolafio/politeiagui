import React, { useState, useEffect, useReducer } from "react";
import isEqual from "lodash/isEqual";
import maxBy from "lodash/maxBy";
import { Card, H2, classNames } from "pi-ui";
import styles from "./Comments.module.css";
import LoggedInContent from "src/componentsv2/LoggedInContent";
import CommentForm from "src/componentsv2/CommentForm";
import { useComments, CommentContext } from "./hooks";
import CommentsList from "./CommentsList";
import CommentLoader from "./Comment/CommentLoader";
import Select from "react-select";
import {
  estimateNumberOfTopLevelComments,
  getSortOptionsForSelect,
  createSelectOptionFromSortOption,
  commentSortOptions,
  getSort
} from "./helpers";

const initialState = { comments: [] };

const actions = {
  SORT: "sort",
  UPDATE: "update"
};

const commentsReducer = (state, action) => {
  switch (action.type) {
    case actions.SORT:
      const sorter = getSort(action.sortOption);
      return { ...state, comments: sorter(state.comments) };
    case actions.UPDATE:
      // first update
      if (!state.comments.length) {
        return {
          ...state,
          comments: action.comments
        };
      }
      // new comment added
      if (action.comments.length > state.comments.length) {
        const addedComment = maxBy(action.comments, c => +c.commentid);
        return {
          ...state,
          comments: state.comments.concat([addedComment])
        };
      }
      // comment updated
      return {
        ...state,
        comments: state.comments.map(comment => {
          const commentFromNewComments = action.comments.find(
            c => c.commentid === comment.commentid
          );
          if (!isEqual(comment, commentFromNewComments)) {
            return commentFromNewComments;
          }
          return comment;
        })
      };
    default:
      break;
  }
};

const Comments = ({
  numOfComments,
  recordToken,
  recordAuthorID,
  className
}) => {
  const [state, dispatch] = useReducer(commentsReducer, initialState);
  const [sortOption, setSortOption] = useState(
    createSelectOptionFromSortOption(commentSortOptions.SORT_BY_TOP)
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
    setSortOption(option);
    dispatch({
      type: actions.SORT,
      sortOption: option
    });
  }

  useEffect(
    function handleUpdateComments() {
      const emptyComments = !state.comments.length;
      dispatch({
        type: actions.UPDATE,
        comments
      });
      if (emptyComments) {
        dispatch({
          type: actions.SORT,
          sortOption
        });
      }
    },
    [comments]
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
            {!!numOfComments && numOfComments}
          </span>
        </H2>
        <div className={styles.sortContainer}>
          <Select
            value={sortOption}
            onChange={handleSetSortOption}
            options={getSortOptionsForSelect()}
          />
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
