import React, { Component } from 'react';
import Tweet from './Tweet';

class Tweets extends Component {
  render(){
    var content = this.props.tweets.map(function(tweet){
      return (
        <Tweet key={tweet._id} tweet={tweet} />
      )
    });

    return (
      <ul className="tweets">{content}</ul>
    )
  }
}

export default Tweets;
