// https://graphql.github.io/graphql-js/constructing-types/

const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const {userQuery, usersQuery} = require('./queries');

// Define the Query type
const queryRootType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: userQuery,
    users: usersQuery,
  },
});

const schema = new graphql.GraphQLSchema({
  query: queryRootType
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');