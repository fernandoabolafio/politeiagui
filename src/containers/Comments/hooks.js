import { useEffect, useCallback, createContext, useContext } from "react";
import * as sel from "src/selectors";
import * as act from "src/actions";
import { useRedux } from "src/redux";
import { useConfig } from "src/Config";

export const CommentContext = createContext();
export const useComment = () => useContext(CommentContext);

const mapStateToProps = {
  email: sel.loggedInAsEmail,
  comments: sel.proposalComments,
  commentsLikes: sel.commentsLikes
};

const mapDispatchToProps = {
  onSubmitComment: act.onSaveNewCommentV2,
  onFetchComments: act.onFetchProposalComments,
  onFetchLikes: act.onFetchLikedComments,
  onLikeComment: act.onLikeComment
};

export function useComments(ownProps) {
  const {
    onFetchComments,
    onLikeComment: onLikeCommentAction,
    email,
    onFetchLikes,
    commentsLikes,
    ...fromRedux
  } = useRedux(ownProps, mapStateToProps, mapDispatchToProps);
  const { enableCommentVote } = useConfig();

  const recordToken = ownProps && ownProps.recordToken;
  useEffect(
    function handleFetchOfComments() {
      if (recordToken) {
        onFetchComments(recordToken);
      }
    },
    [onFetchComments, recordToken]
  );

  useEffect(
    function handleFetchOfLikes() {
      if (recordToken && enableCommentVote) {
        onFetchLikes(recordToken);
      }
    },
    [onFetchLikes, enableCommentVote, recordToken]
  );

  const onLikeComment = useCallback(
    (commentID, action) => {
      onLikeCommentAction(email, recordToken, commentID, action);
    },
    [recordToken, email, onLikeCommentAction]
  );

  const getCommentLikeOption = useCallback(
    commentID => {
      const actionData = (commentsLikes || []).find(
        cl => cl.commentid === commentID
      );
      if (actionData) {
        return actionData.action;
      }
      return actionData ? actionData.action : 0;
    },
    [commentsLikes]
  );

  return {
    onLikeComment,
    getCommentLikeOption,
    enableCommentVote,
    ...fromRedux
  };
}
