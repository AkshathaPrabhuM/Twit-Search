module.exports = function(stream, io){

  stream.on('tweet', function(tweet) {

    if (tweet['user'] !== undefined) {

      var tweet = {
        twid: tweet['id_str'],
        active: true,
        author: tweet['user']['name'],
        avatar: tweet['user']['profile_image_url'],
        body: tweet['text'],
        date: tweet['created_at'],
        screenname: tweet['user']['screen_name']
      };

      io.emit('tweet', tweet);
    }

  });

};
