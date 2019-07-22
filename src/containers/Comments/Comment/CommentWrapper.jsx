import React, { useState } from "react";
import styles from "./Comment.module.css";
import CommentForm from "src/componentsv2/CommentForm";
import { useComment } from "../hooks";
import Comment from "./Comment";

const CommentWrapper = ({ comment, children, numOfReplies, ...props }) => {
  const {
    onSubmitComment,
    onLikeComment,
    getCommentLikeOption,
    enableCommentVote,
    recordAuthorID,
    loadingLikes,
    userLoggedIn,
    recordToken,
    recordType,
    threadParentID,
    readOnly
  } = useComment();
  const {
    comment: commentText,
    token,
    commentid,
    resultvotes,
    timestamp,
    username,
    userid,
    parentid
  } = comment;

  const isRecordAuthor = recordAuthorID === userid;
  const isThreadParent = +parentid === 0 || +commentid === +threadParentID;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(isThreadParent);

  function handleToggleReplyForm() {
    setShowReplyForm(!showReplyForm);
  }
  function handleToggleReplies() {
    setShowReplies(!showReplies);
  }

  async function handleSubmitComment(comment) {
    return onSubmitComment({
      comment,
      token,
      parentID: commentid
    });
  }
  function handleCommentSubmitted() {
    setShowReplyForm(false);
    setShowReplies(true);
  }
  function handleLikeComment() {
    return onLikeComment(commentid, "1");
  }
  function handleDislikeComment() {
    return onLikeComment(commentid, "-1");
  }
  return (
    <Comment
      permalink={`/${recordType}/${recordToken}/comments/${commentid}`}
      topLevelComment={isThreadParent}
      author={username}
      authorID={userid}
      createdAt={timestamp}
      highlightAuthor={isRecordAuthor}
      disableLikes={!enableCommentVote}
      disableLikesClick={!userLoggedIn || loadingLikes || readOnly}
      disableReply={readOnly}
      likesCount={resultvotes}
      likeOption={getCommentLikeOption(commentid)}
      onLike={handleLikeComment}
      onDislike={handleDislikeComment}
      showReplies={showReplies}
      onClickReply={handleToggleReplyForm}
      onClickShowReplies={handleToggleReplies}
      numOfReplies={numOfReplies}
      commentBody={commentText}
      {...props}
    >
      {showReplyForm && (
        <CommentForm
          onSubmit={handleSubmitComment}
          onCommentSubmitted={handleCommentSubmitted}
        />
      )}
      {showReplies && (
        <div className={styles.childrenContainer}>{children}</div>
      )}
    </Comment>
  );
};

export default CommentWrapper;
