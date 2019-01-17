const { ApolloServer, gql } = require("apollo-server");
const Politeiawww = require("./datasources/politeiawww");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type File {
    name: String
    mime: String
    digest: String
    payload: String
  }

  type CensorshipRecord {
    token: String
    merkle: String
    signature: String
  }

  type Proposal {
    name: String
    state: Int
    status: Int
    author: String
    timestamp: Int
    userid: String
    username: String
    publickey: String
    files: [File]
    numcomments: Int
    version: String
    statuschangemessage: String
    publishedat: Int
    censoredat: Int
    abandonedat: Int
    censorshiprecord: CensorshipRecord
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    vettedProposals: [Proposal]
    unvettedProposals: [Proposal]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    vettedProposals: (_root, _args, { dataSources }) =>
      dataSources.politeiawwwAPI.getVettedProposals(),

    unvettedProposals: (_root, _args, { dataSources }) =>
      dataSources.politeiawwwAPI.getUnvettedProposals()
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    politeiawwwAPI: new Politeiawww()
  }),
  context: ({ req }) => {
    // get the user token from the headers
    // const token = req.headers.authorization || '';
    const cookie = req.headers.cookie;
    return { cookie };
  }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
