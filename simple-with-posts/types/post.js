const graphql = require('graphql');

const {userType} = require('./user');

// Post type
const postType = new graphql.GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {type: graphql.GraphQLString},
    title: {type: graphql.GraphQLString},
    content: {type: graphql.GraphQLString},
    user: {type: userType}
  },
});

exports.postType = postType;