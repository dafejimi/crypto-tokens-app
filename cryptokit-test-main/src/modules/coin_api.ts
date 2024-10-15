import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// import Configs from '../config/index';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache()
});

export const GET_TOKENS = gql`
  query GetTokens($limit: Int) {
    tokens(limit: $limit) {
      id
      name
      symbol
      price
      market_cap
      percent_change_24h
    }
  }
`;

export const GET_TOKEN = gql`
  query GetToken($id: ID!) {
    token(id: $id) {
      id
      name
      symbol
      price
      market_cap
      percent_change_24h
    }
  }
`;

export { client };