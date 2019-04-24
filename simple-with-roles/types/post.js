const graphql = require('graphql');

const {userType} = require('./user');
const {userMock} = require('../mocks');

// Post type
const postType = new graphql.GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: graphql.GraphQLString,
      description: 'Post id',
    },
    title: {
      type: graphql.GraphQLString,
      description: 'Post title',
    },
    content: {
      type: graphql.GraphQLString,
      description: 'Post content',
    },
    user: {
      type: userType,
      description: 'Post user info, resolver',
      resolve: (obj, args, context) => {
        const user = userMock.find(item => item.id === obj.uid);

        return user || null
      }
    }
  },
});

exports.postType = postType;