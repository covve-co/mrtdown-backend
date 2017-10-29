const logger = require('../logger');
const mongodb = require('./index');

const postsCollection = () => {
  return mongodb.db().collection('posts');
};

module.exports.all = async () => {
  const posts = await postsCollection().find({}).toArray();
  logger.debug('Fetched ' + posts.length + ' posts.');
  return posts;
};

module.exports.insert = async (post) => {
  const document = {
    source: post.source,
    author: post.author,
    content: post.content,
    verified: post.verified,
    votes: post.votes,
  };
  await postsCollection().insert(document);
  logger.debug('Inserted post.');
};
