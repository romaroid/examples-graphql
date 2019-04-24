const {userQuery, usersQuery} = require('./user');
const {postQuery, postsQuery, postCreateMutation} = require('./post');

exports.userQuery = userQuery;
exports.usersQuery = usersQuery;
exports.postQuery = postQuery;
exports.postsQuery = postsQuery;
exports.postCreateMutation = postCreateMutation;
