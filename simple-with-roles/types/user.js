const graphql = require('graphql');

// Post type
const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: graphql.GraphQLString},
    firstName: {type: graphql.GraphQLString},
    lastName: {type: graphql.GraphQLString},
    username: {type: graphql.GraphQLString},
  },
});

exports.userType = userType;