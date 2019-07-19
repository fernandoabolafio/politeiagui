import React, { useState } from "react";
import { Text, Icon, classNames } from "pi-ui";
import styles from "./Comment.module.css";
import DateTooltip from "src/componentsv2/DateTooltip";
import Markdown from "src/componentsv2/Markdown";
import Join from "src/componentsv2/Join";
import Link from "src/componentsv2/Link";
import LoggedInContent from "src/componentsv2/LoggedInContent";
import CommentForm from "src/componentsv2/CommentForm";
import Likes from "src/componentsv2/Likes";
import { useComment } from "../hooks";
import { useLoaderContext } from "src/Appv2/Loader";

const Comment = ({ comment, className, children, numOfReplies }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { initDone, currentUser } = useLoaderContext();
  const {
    onSubmitComment,
    onLikeComment,
    getCommentLikeOption,
    enableCommentVote,
    recordAuthorID
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
  const userLoggedIn = initDone && currentUser;
  const isRecordAuthor = recordAuthorID === userid;
  const isThreadParent = parentid === "0" || parentid === 0;
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
    <div
      className={classNames(
        styles.commentWrapper,
        !isThreadParent && styles.withLeftPadding,
        className
      )}
    >
      <div className="justify-space-between">
        <Join>
          <Link
            className={classNames(
              styles.commentAuthor,
              isRecordAuthor && styles.recordAuthor
            )}
            to={`/user/${userid}`}
          >
            {username}
          </Link>
          <DateTooltip timestamp={timestamp} placement="bottom">
            {({ timeAgo }) => <Text color="gray">{timeAgo}</Text>}
          </DateTooltip>
        </Join>
        {enableCommentVote && (
          <Likes
            disabled={!userLoggedIn}
            likes={resultvotes}
            option={getCommentLikeOption(commentid)}
            onLike={handleLikeComment}
            onDislike={handleDislikeComment}
          />
        )}
      </div>
      <Markdown className="margin-top-s" body={commentText} />
      <div className="justify-space-between margin-top-s">
        <div className="justify-left">
          <LoggedInContent>
            <Text
              weight="semibold"
              color="gray"
              className={styles.reply}
              onClick={handleToggleReplyForm}
            >
              Reply
            </Text>
          </LoggedInContent>
          {numOfReplies > 0 && (
            <span className={styles.showReplies} onClick={handleToggleReplies}>
              {showReplies ? "-" : `+${numOfReplies}`}
            </span>
          )}
        </div>
        <Icon type="link" />
      </div>
      {showReplyForm && (
        <CommentForm
          onSubmit={handleSubmitComment}
          onCommentSubmitted={handleCommentSubmitted}
        />
      )}
      {showReplies && (
        <div className={styles.childrenContainer}>{children}</div>
      )}
    </div>
  );
};

export default Comment;
