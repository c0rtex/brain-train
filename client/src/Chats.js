import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function ChatRow(props) {
  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">{props.chat.id}</h4>
      <div className="list-group-item-text">
        <h5>Visitor Information</h5>
        <ul>
          <li><strong>Name:</strong> {props.chat.visitor.name}</li>
          <li><strong>Email:</strong> {props.chat.visitor.email}</li>
          <li><strong>IP:</strong> {props.chat.visitor.ip}</li>
          <li>
            <strong>Location:</strong> {props.chat.visitor.city}, {props.chat.visitor.region}, {props.chat.visitor.country}
          </li>
        </ul>

        <h5>Agent Information</h5>
        <ul>
          <li><strong>Name:</strong> {props.chat.agents[0].display_name}</li>
          <li><strong>Email:</strong> {props.chat.agents[0].email}</li>
          <li><strong>IP:</strong> {props.chat.agents[0].ip}</li>
        </ul>

        <Link to={`/chats/${props.chat.id}`}>&gt;&gt; Read transcript</Link>

      </div>
    </div>
  );
}

function ChatsList(props) {
  let rows = [];
  for (let chat of props.chats) {
    rows.push(
      <ChatRow key={chat.id} chat={chat} />
    );
  }

  return (
    <div className="list-group">
      {rows}
    </div>
  );
}

class Chats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chats: { chats: [] }
    };
  }

  componentDidMount() {
    fetch('/api/chats')
      .then((response) => response.json())
      .then((data) => {this.setState({chats: data})
      });
  }

  render() {
    return (
      <div>
        <h1 className="page-header">Chats</h1>
        {this.state.chats.error ? 
          (
            <h4>There was an error processing your request.</h4>
          ) : (
            <ChatsList chats={this.state.chats.chats} />
          )
        }
      </div>
    )
  }

}

export default Chats;