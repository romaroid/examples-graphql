// https://graphql.github.io/graphql-js/constructing-types/

const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const User =require('./classes/user');
const Permission =require('./classes/permission');

const {
  userQuery,
  usersQuery,
  postQuery,
  postsQuery,
  postCreateMutation,
} = require('./queries');

// Define the Query type
const queryRootType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: userQuery,
    users: usersQuery,
    post: postQuery,
    posts: postsQuery,
  },
});

const mutationRootType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: postCreateMutation
  },
});

const schema = new graphql.GraphQLSchema({
  query: queryRootType,
  mutation: mutationRootType,
});

const app = express();

// https://graphql.github.io/graphql-js/authentication-and-express-middleware/
const loggingMiddleware = (req, res, next) => {
  console.log('Request validation');
  next();
};

const context = (req) => {
  const user = req.headers.userid ?  new User(req.headers.userid) : null;
  const permission = user ? new Permission(user.id) : null;

  const context = {
    req: req,
    user: user,
    permission: permission
  };

  return context;
};

app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP((req) => ({
  schema: schema,
  context: context(req),
  graphiql: true,
})));
app.listen(4002);

console.log('Running a GraphQL API server at localhost:4000/graphql');