import ProposalList from "./ProposalsList";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const AllVettedProposalsQuery = gql`
  query proposals {
    proposals {
      name
      censorshiprecord {
        token
      }
    }
  }
`;

export default graphql(AllVettedProposalsQuery)(ProposalList);
