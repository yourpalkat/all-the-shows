
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

require('dotenv').config();
const URI = process.env.CLIENT_URI || "http://localhost:4000/";
const client = new ApolloClient({
  uri: URI,
});
// If 'uri' is not passed in, the client will default to './graphql' on the same host the app is served from

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
