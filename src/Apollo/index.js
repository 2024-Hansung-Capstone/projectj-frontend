import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
export { default as MyComponent } from './MyComponent';

const client = new ApolloClient({
  uri: 'http://52.79.239.157:5000/graphql',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
  
  /*<React.StrictMode>
    <App />
  </React.StrictMode>*/
);

reportWebVitals();