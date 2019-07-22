import React, { useState, useEffect } from "react";
import CommentsList from "./CommentsList";

const getChildren = (comments, commentId) => {
  return (comments.filter(comment => comment.parentid === commentId) || []).map(
    comment => ({
      ...comment,
      children: getChildren(comments, comment.commentid)
    })
  );
};

const buildNestedList = comments => {
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

export default CommentsListWrapper;
