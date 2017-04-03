import React, { Component } from 'react';
import Tweets from './Tweets';
import HashTagBar from './HashTagBar';
import io from 'socket.io-client';

class TweetsApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
    this.socket = {};

    this.searchHashtag = this.searchHashtag.bind(this);
  }

  componentWillReceiveProps(newProps, oldProps){
    this.setState(this.getInitialState(newProps));
  }

  // Called directly after component rendering, only on client
  componentDidMount(){

    // Preserve self reference
    var self = this;

    // Initialize socket.io
    this.socket = io();

    // On tweet event emission...
    this.socket.on('tweet', function (data) {

        // Add a tweet to our queue
        self.addTweet(data);

    });
    console.log('Socket in mount -', this.socket);
  }

  addTweet(tweet){

    // Get current application state
    var updated = this.state.tweets;

    // Add tweet to the beginning of the tweets array
    if(updated.length > 20) {
      updated.pop();
    }
    updated.unshift(tweet);

    // Set application state
    this.setState({tweets: updated});

  }

  searchHashtag(hashtag) {
    this.socket.emit("new hashtag", hashtag);
    this.setState({tweets: []});


  }

render() {
    return (
      <div className="tweets-app">
        <HashTagBar eventHandler={this.searchHashtag}/>
        <Tweets tweets={this.state.tweets} />
      </div>
    )
  }
}

export default TweetsApp;
