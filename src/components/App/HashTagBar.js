import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon }  from 'reactstrap';

class HashTagBar extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
  this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.eventHandler(this.state.value);
    event.preventDefault();
  }

  render(){
    var hashtag = this.props.hashtag || '#hashtag';

    return (
      <form className="hashtag" onSubmit={this.handleSubmit}>
          <InputGroup size="lg">
            <InputGroupAddon>#</InputGroupAddon>
            <Input type="text" value={this.state.value} onChange={this.handleChange} />
          </InputGroup>
      </form>
    )
  }
}

export default HashTagBar;
