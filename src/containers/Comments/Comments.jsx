import React, { useState } from "react";
import { Card, H2, classNames } from "pi-ui";
import styles from "./Comments.module.css";
import LoggedInContent from "src/componentsv2/LoggedInContent";
import CommentForm from "src/componentsv2/CommentForm";
import { useComments, CommentContext } from "./hooks";
import CommentsList from "./CommentsList";
import CommentLoader from "./Comment/CommentLoader";

const commentSortOptions = {
  SORT_BY_TOP: "top",
  SORT_BY_OLD: "old",
  SORT_BY_NEW: "new"
};

const Comments = ({
  numOfComments,
  recordToken,
  recordAuthorID,
  className
}) => {
  const [sortOption, setSortOption] = useState({
    value: commentSortOptions.SORT_BY_TOP
  });
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
  async function handleSubmitComment(comment) {
    return onSubmitComment({
      comment,
      token: recordToken,
      parentID: 0
    });
  }

  function renderCommentLoaders() {
    // estimates the number of comments placeholder to be shown while loading
    // the content from the API. The formula '6 log (0.2 numOfComments)' is an
    // estimative of how many top level comments exists based on the current
    // dataset from proposals.decred.org.
    const numberOfContents =
      numOfComments < 7
        ? numOfComments
        : Math.round(6 * Math.log(0.2 * numOfComments));
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
        <div className={styles.sortContainer}></div>
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
            <CommentsList comments={comments} />
          </CommentContext.Provider>
        </div>
      )}
    </Card>
  );
};

export default Comments;
