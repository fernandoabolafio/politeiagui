import ProposalList from "./ProposalsList";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const AllVettedQuery = gql`
  query getAllVetted {
    proposals: vettedProposals {
      name
      username
      censorshiprecord {
        token
      }
    }
  }
`;

const AllUnvettedQuery = gql`
  query getAllUnvetted {
    proposals: unvettedProposals {
      name
      censorshiprecord {
        token
      }
    }
  }
`;

export const AllVetted = graphql(AllVettedQuery)(ProposalList);
export const AllUnvetted = graphql(AllUnvettedQuery)(ProposalList);
