import React, { Component } from 'react';

class Chats extends Component {

  constructor(props) {
    super(props);
    this.state = {chats: []};
  }

  componentDidMount() {
    fetch('/api/chats')
      .then((response) => response.json())
      .then((data) => this.setState({chats: data}));
  }

  render() {
    return (
      <div>
        <h1 className="page-header">Chats</h1>
        <p>{JSON.stringify(this.state.chats)}</p>
      </div>
    )
  }

}

export default Chats;