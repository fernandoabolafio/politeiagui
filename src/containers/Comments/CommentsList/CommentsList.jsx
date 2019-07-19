import React, { useEffect, useState } from "react";
import Comment from "../Comment";

const getChildren = (comments, commentId) => {
  return (comments.filter(comment => comment.parentid === commentId) || []).map(
    comment => ({
      ...comment,
      children: getChildren(comments, comment.commentid)
    })
  );
};

const buildNestedList = comments => {
  // const filteredComments = comments.filter(comment => comment.parentid === "0");
  // console.log(filteredComments);
  return comments
    .filter(comment => comment.parentid === "0" || comment.parentid === 0)
    .map(comment => {
      return {
        ...comment,
        children: getChildren(comments, comment.commentid)
      };
    });
};

const CommentsListWrapper = ({ comments }) => {
  const [nestedComments, setNestedComments] = useState([]);
  useEffect(
    function generateNestedComments() {
      const result = buildNestedList(comments);
      setNestedComments(result);
    },
    [comments]
  );
  return <CommentsList comments={nestedComments} />;
};

const CommentsList = ({ comments }) => {
  return comments.map(comment => (
    <Comment
      key={`comment-${comment.commentid}`}
      comment={comment}
      numOfReplies={comment.children.length}
    >
      <CommentsList comments={comment.children} />
    </Comment>
  ));
};

export default CommentsListWrapper;
