const assert = require('assert');


describe('Tweet tests', () => {
  it('Tweet', function (done) {
    const processor = require('../src/processor');
    processor.twitterProcessor({
      source: 'twitter',
      author: 'test',
      verified: false,
      content: '',
      retweets: 0,
      replies: 0,
      quotes: 0,
    });
    done();
  });
  it('Verfired tweet', function (done) {
    const processor = require('../src/processor');
    processor.twitterProcessor({
      source: 'twitter',
      author: 'test',
      verified: true,
      content: '',
      retweets: 0,
      replies: 0,
      quotes: 0,
    });
    done();
  });
});

