import React, { useState } from "react";
import { Card, H2, classNames } from "pi-ui";
import Select from "react-select";
import styles from "./Comments.module.css";
import LoggedInContent from "src/componentsv2/LoggedInContent";
import CommentForm from "src/componentsv2/CommentForm";
import { useComments, CommentContext } from "./hooks";
import CommentsList from "./CommentsList";

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
    ...commentsCtx
  } = useComments({
    recordToken
  });
  async function handleSubmitComment(comment) {
    return onSubmitComment({
      comment,
      token: recordToken,
      parentID: 0
    });
  }
  function handleSetSortValue(option) {
    // console.log(option);
    setSortOption(option);
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
            onKeyDown={e => e.keyCode === 8 && e.preventDefault()}
            isSearchable={false}
            isClearable={false}
            escapeClearsValue={false}
            value={sortOption}
            onChange={handleSetSortValue}
            options={Object.values(commentSortOptions).map(op => ({
              value: op,
              label: op
            }))}
          />
        </div>
      </div>
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
    </Card>
  );
};

export default Comments;
