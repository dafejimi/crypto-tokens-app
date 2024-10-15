import React from 'react';
import App from './routes';
import { ApolloProvider } from '@apollo/client';
import { client } from './modules/coin_api';

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>);

export default Root;
