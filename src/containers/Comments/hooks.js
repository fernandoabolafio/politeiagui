import { useEffect } from "react";
import * as act from "src/actions";
import { useRedux } from "src/redux";

const mapStateToProps = {};

const mapDispatchToProps = {
  onSubmitComment: act.onSaveNewCommentV2,
  onFetchComments: act.onFetchProposalComments
};

export function useComment(ownProps) {
  const fromRedux = useRedux(ownProps, mapStateToProps, mapDispatchToProps);
  useEffect(() => {
    fromRedux.onFetchComments(ownProps.recordToken);
  }, []);
  return fromRedux;
}
