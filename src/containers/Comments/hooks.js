import { useEffect } from "react";
import * as sel from "src/selectors";
import * as act from "src/actions";
import { useRedux } from "src/redux";

const mapStateToProps = {
  comments: sel.proposalComments
};

const mapDispatchToProps = {
  onSubmitComment: act.onSaveNewCommentV2,
  onFetchComments: act.onFetchProposalComments
};

export function useComment(ownProps) {
  const fromRedux = useRedux(ownProps, mapStateToProps, mapDispatchToProps);
  useEffect(() => {
    if (ownProps && ownProps.recordToken) {
      fromRedux.onFetchComments(ownProps.recordToken);
    }
  }, []);
  return fromRedux;
}
