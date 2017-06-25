import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function ChatMessageRow(props) {
  return (
    <li className={'list-group-item ' + (props.odd ? 'odd' : 'even')}>
      <strong>{props.message.author_name}</strong> <em>({props.message.date}):</em> {props.message.text}
    </li>
  );
}

function ChatMessages(props) {
  let rows = [];
  let odd = true;
  for (let message of props.messages) {
    odd = !odd;
    rows.push(
      <ChatMessageRow key={message.timestamp} message={message} odd={odd} />
    );
  }

  return (
    <div>
      <h2>Messages</h2>
      <ul className="list-group">
        {rows}
      </ul>
    </div>
  );
}

class Transcript extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chat: {}
    };
  }

  componentDidMount() {
    fetch(`/api/chats/${this.props.match.params.chatId}`)
      .then((response) => response.json())
      .then((data) => {this.setState({chat: data})
      });
  }

  render() {
    let output = '';
    if (this.state.chat.id) {
      output = (
        <div>
          <h4>Visitor Information</h4>
          <ul>
            <li><strong>Name:</strong> {this.state.chat.visitor.name}</li>
            <li><strong>Email:</strong> {this.state.chat.visitor.email}</li>
            <li><strong>IP:</strong> {this.state.chat.visitor.ip}</li>
            <li>
              <strong>Location:</strong> {this.state.chat.visitor.city}, {this.state.chat.visitor.region}, {this.state.chat.visitor.country}
            </li>
          </ul>
          
          <h4>Agent Information</h4>
          <ul>
            <li><strong>Name:</strong> {this.state.chat.agents[0].display_name}</li>
            <li><strong>Email:</strong> {this.state.chat.agents[0].email}</li>
            <li><strong>IP:</strong> {this.state.chat.agents[0].ip}</li>
          </ul>
          <ChatMessages messages={this.state.chat.messages} />
        </div>
      );
    }

    return (
      <div>
        <h1 className="page-header">Transcript {this.state.chat.id ? `(${this.state.chat.id})` : ''}</h1>
        {this.state.chat.error ? (<h4>There was an error processing your request.</h4>) : output}
      </div>
    )
  }

}

export default Transcript;