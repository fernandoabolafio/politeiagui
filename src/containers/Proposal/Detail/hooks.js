import { useEffect, useState } from "react";
import get from "lodash/fp/get";
import compose from "lodash/fp/compose";
import isEqual from "lodash/isEqual";
import { arg, or } from "src/lib/fp";
import * as sel from "src/selectors";
import * as act from "src/actions";
import { useRedux } from "src/redux";

const mapStateToProps = {
  token: compose(
    get(["match", "params", "token"]),
    arg(1)
  ),
  publicProposals: sel.proposalsWithVoteStatus,
  unvettedProposals: sel.apiUnvettedProposals,
  proposalDetail: sel.proposalWithVoteStatus,
  error: sel.proposalError,
  loading: or(sel.proposalIsRequesting, sel.isApiRequestingPropVoteStatus)
};

const mapDispatchToProps = {
  onFetchUser: act.onFetchUser,
  onFetchProposal: act.onFetchProposal,
  onResetProposal: act.onResetProposal,
  onFetchProposalVoteStatus: act.onFetchProposalVoteStatus
};

export function useProposal(ownProps) {
  const {
    error,
    onFetchProposal,
    token,
    proposalDetail,
    publicProposals,
    unvettedProposals,
    loading,
    onResetProposal,
    onFetchProposalVoteStatus
  } = useRedux(ownProps, mapStateToProps, mapDispatchToProps);

  const getProposalFromCache = () => {
    // search in the public proposals
    const proposalFromPublic = publicProposals.find(
      prop => prop.censorshiprecord.token === token
    );

    if (proposalFromPublic) {
      return proposalFromPublic;
    }

    // search in the unvetted proposals
    const proposalFromUnvetted = unvettedProposals.find(
      prop => prop.censorshiprecord.token === token
    );

    if (proposalFromUnvetted) {
      return proposalFromUnvetted;
    }

    return null;
  };

  const [proposal, setProposal] = useState(getProposalFromCache());

  useEffect(
    function resetProposalWhenComponentUnmounts() {
      return () => onResetProposal();
    },
    [onResetProposal]
  );

  useEffect(
    function fetchProposal() {
      if (proposal) {
        return;
      }
      onFetchProposal(token);
      onFetchProposalVoteStatus(token);
    },
    [proposal, token, onFetchProposal, onFetchProposalVoteStatus]
  );

  useEffect(
    function receiveFetchedProposal() {
      if (!!proposalDetail && !isEqual(proposalDetail, proposal)) {
        setProposal(proposalDetail);
      }
    },
    [proposalDetail, proposal]
  );

  if (error) {
    throw error;
  }

  return { proposal, loading };
}
