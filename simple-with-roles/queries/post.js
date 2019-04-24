const graphql = require('graphql');

const {postType} = require('../types');
const {postMock} = require('../mocks');

// Post query
const postQuery = {
  type: postType,
  args: {
    id: {
      type: graphql.GraphQLNonNull(graphql.GraphQLString),
    },
  },
  // https://graphql.org/learn/execution/#root-fields-resolvers
  // https://graphql.org/learn/authorization/
  resolve: function (obj, args, context) {
    if (!context.permission || !context.permission.isReadPost) {
      throw new Error('UNAUTHORIZED');
    }

    const post = postMock.find(item => item.id === args.id);

    if (!post) {
      throw new Error('Post is not exist');
    }

    return post;
  },
};

// Posts query
const postsQuery = {
  type: graphql.GraphQLList(postType),
  resolve: function (obj, args, context) {
    if (!context.permission || !context.permission.isReadPost) {
      throw new Error('UNAUTHORIZED');
    }

    return postMock;
  },
};

const postCreateMutation = {
  type: graphql.GraphQLBoolean,
  args: {
    title: {
      type: graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    content: {
      type: graphql.GraphQLNonNull(graphql.GraphQLString),
    },
  },
  resolve: function (obj, args, context) {
    // TODO add to mocks new post

    if (!context.permission || !context.permission.isWritePost) {
      throw new Error('UNAUTHORIZED');
    }

    return true;
  },
};

/*
{
  user(id: "1") {
    id
    firstName
    lastName
    username
  }
  post(id: "1") {
    id,
    title
  }
	posts {
    id,
    title,
    content
  }
}
 */

exports.postQuery = postQuery;
exports.postsQuery = postsQuery;
exports.postCreateMutation = postCreateMutation;