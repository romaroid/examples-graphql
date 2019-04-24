const graphql = require('graphql');

const {postType} = require('../types');

// Mock
const fakeDatabase = [
  {
    'id': '1',
    'title': 'Title 1',
    'content': 'Content 1',
    'user': {
      'id': '1',
      'firstName': 'Berniece',
      'lastName': 'Kris',
      'username': 'Ana_Quigley',
    },
  },
  {
    'id': '2',
    'title': 'Title 2',
    'content': 'Content 2',
    'user': {
      'id': '1',
      'firstName': 'Berniece',
      'lastName': 'Kris',
      'username': 'Ana_Quigley',
    },
  },
  {
    'id': '3',
    'title': 'Title 3',
    'content': 'Content 3',
    'user': {
      'id': '3',
      'firstName': 'Bradly',
      'lastName': 'Lind',
      'username': 'Winona_Kulas12',
    },
  },
];

// Post query
const postQuery = {
  type: postType,
  args: {
    id: {
      type: graphql.GraphQLNonNull(graphql.GraphQLString),
    },
  },
  resolve: function (_, {id}) {
    const post = fakeDatabase.find(item => item.id === id);

    if (!post) {
      throw new Error('Post is not exist');
    }

    return post;
  },
};

// Posts query
const postsQuery = {
  type: graphql.GraphQLList(postType),
  resolve: function () {
    return fakeDatabase;
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