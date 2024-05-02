import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"

/*
const database = require('./database')
console.log(database)*/

const client = new ApolloClient({
  uri: 'http://13.209.3.204:5000/graphql',
  cache: new InMemoryCache()  // 캐시 저장
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={(client)}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
);


reportWebVitals();