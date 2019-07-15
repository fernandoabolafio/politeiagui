import React from "react";
import { withRouter } from "react-router-dom";
import Proposal from "src/componentsv2/Proposal";
import styles from "./Detail.module.css";
import { useProposal } from "./hooks";
import Proposal from "src/componentsv2/Proposal";
import Comments from "src/containers/Comments";

const ProposalDetail = ({ TopBanner, PageDetails, Sidebar, Main, match }) => {
  const { proposal, loading } = useProposal({ match });
  const { censorshiprecord } = proposal || {};
  const proposalToken = censorshiprecord && censorshiprecord.token;
  return !!proposal && !loading ? (
    <>
      <TopBanner>
        <PageDetails
          title={"Proposal Details"}
          headerClassName="no-margin-top"
        />
      </TopBanner>
      <Sidebar />
      <Main className={styles.customMain}>
        <Proposal proposal={proposal} extended />
        <Comments
          recordToken={proposalToken}
          numOfComments={proposal && proposal.numcomments}
        />
      </Main>
    </>
  ) : null;
};

export default withRouter(ProposalDetail);
