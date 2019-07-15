import React from "react";
import { Card, H2, classNames } from "pi-ui";
import styles from "./Comments.module.css";
import LoggedInContent from "src/componentsv2/LoggedInContent";
import CommentForm from "src/componentsv2/CommentForm";
import { useComment } from "./hooks";

const Comments = ({ numOfComments, recordToken, className }) => {
  const { onSubmitComment } = useComment({ recordToken });
  async function handleSubmitComment(comment) {
    return onSubmitComment({
      comment,
      token: recordToken,
      parentID: 0
    });
  }
  return (
    <Card className={classNames(styles.commentAreaContainer, className)}>
      <LoggedInContent>
        <CommentForm onSubmit={handleSubmitComment} />
      </LoggedInContent>
      <div className={classNames("justify-space-between")}>
        <H2 className={styles.commentsTitle}>
          Comments{" "}
          <span className={styles.commentsCount}>
            {!!numOfComments && numOfComments}
          </span>
        </H2>
      </div>
    </Card>
  );
};

export default Comments;
