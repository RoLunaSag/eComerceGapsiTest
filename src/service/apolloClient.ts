import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
  uri: 'https://axesso-walmart-data-service.p.rapidapi.com/',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY!,
    'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST!,
  },
});

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});
