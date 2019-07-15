import React, { useState } from "react";
import { Text, classNames } from "pi-ui";
import styles from "./Comment.module.css";
import DateTooltip from "src/componentsv2/DateTooltip";
import Markdown from "src/componentsv2/Markdown";
import Join from "src/componentsv2/Join";
import Link from "src/componentsv2/Link";
import LoggedInContent from "src/componentsv2/LoggedInContent";
import CommentForm from "src/componentsv2/CommentForm";
import { useComment } from "../hooks";

// censored: false
// comment: "ma comment here!"
// commentid: "1"
// parentid: "0"
// publickey: "86d3f681afd5fd48cc7c087e0b18ca09e0adbc27ae95a68ccddb1aad91a5cded"
// receipt: "c1ad24f5b9d2784c0c417a70c79a0eeb4203f8687fb08f06bb869288c26f50899fc814b6c13e8a418b9db1a58cbe957a2b323b4b704c21640b5c1bbdbee4de0a"
// resultvotes: 0
// signature: "114d83ae6bd7af3696fade050e23e067667fb18947cead6dcbb6f0884948b31010cc61da86de80c0d4544f939ad353109aa78b65632b974b9a5f2d8964c26f07"
// timestamp: 1563190913
// token: "dccc6cd34b9475811ced6de630e048ed72ff8db45648535e810e5ad3f638abb0"
// userid: "82c78293-00df-48bb-9277-514ee9cc1473"
// username: "pepino"

const Comment = ({ comment, className, children, numOfReplies }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { onSubmitComment } = useComment();
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
  const isThreadParent = parentid === "0";
  function handleToggleReplyForm() {
    setShowReplyForm(!showReplyForm);
  }
  function handleToggleReplies() {
    setShowReplies(!showReplies);
  }
  async function handleSubmitComment(comment) {
    console.log("got here!!", comment);
    console.log({
      comment,
      token,
      parentID: commentid
    });
    return onSubmitComment({
      comment,
      token,
      parentID: commentid
    });
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
          <Link to={`/user/${userid}`}>{username}</Link>
          <DateTooltip timestamp={timestamp} placement="bottom">
            {({ timeAgo }) => <Text color="gray">{timeAgo}</Text>}
          </DateTooltip>
        </Join>
        <span>likes</span>
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
      </div>
      {showReplyForm && <CommentForm onSubmit={handleSubmitComment} />}
      {showReplies && (
        <div className={styles.childrenContainer}>{children}</div>
      )}
    </div>
  );
};

export default Comment;
