const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');
const LFUCache = require('lfu-cache');

// Initialize Express
const app = express();

// Initialize LFU Cache
const cache = new LFUCache({
  max: 100, // Maximum number of items in cache
  maxAge: 1000 * 60 * 15 // Items expire after 15 minutes
});

// GraphQL Schema
const typeDefs = gql`
  type Token {
    id: ID!
    name: String!
    symbol: String!
    price: Float!
    market_cap: Float!
    percent_change_24h: Float!
  }

  type Query {
    tokens(limit: Int = 10): [Token]!
    token(id: ID!): Token
  }
`;

// Define a type for the Token and TokenResponse
interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
  percent_change_24h: number;
}

interface TokenResponse {
  id: string;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      market_cap: number;
      percent_change_24h: number;
    };
  };
}

// Resolver functions
const resolvers = {
  Query: {
    tokens: async (_: unknown, { limit }: { limit?: number }) => {
      const cacheKey = `tokens_${limit}`;
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }

      try {
        const response = await axios.get(
          `${process.env.COIN_API_URL}/v1/cryptocurrency/listings/latest`,
          {
            params: { limit },
            headers: { 'X-CMC_PRO_API_KEY': process.env.COIN_API_KEY }
          }
        );

        const tokens: Token[] = response.data.data.map((token: TokenResponse) => ({
          id: token.id,
          name: token.name,
          symbol: token.symbol,
          price: token.quote.USD.price,
          market_cap: token.quote.USD.market_cap,
          percent_change_24h: token.quote.USD.percent_change_24h
        }));

        cache.set(cacheKey, tokens);
        return tokens;
      } catch (error) {
        console.error('Error fetching tokens:', error);
        throw new Error('Failed to fetch tokens');
      }
    },
    token: async (_: unknown, { id }: { id: string }) => {
      const cacheKey = `token_${id}`;
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }

      try {
        const response = await axios.get(
          `${process.env.COIN_API_URL}/v2/cryptocurrency/quotes/latest`,
          {
            params: { id },
            headers: { 'X-CMC_PRO_API_KEY': process.env.COIN_API_KEY }
          }
        );

        const tokenData = response.data.data[id];
        const token: Token = {
          id: tokenData.id,
          name: tokenData.name,
          symbol: tokenData.symbol,
          price: tokenData.quote.USD.price,
          market_cap: tokenData.quote.USD.market_cap,
          percent_change_24h: tokenData.quote.USD.percent_change_24h
        };

        cache.set(cacheKey, token);
        return token;
      } catch (error) {
        console.error('Error fetching token:', error);
        throw new Error('Failed to fetch token');
      }
    }
  }
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
});

// Don't forget to handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  cache.clear();
  process.exit();
});
