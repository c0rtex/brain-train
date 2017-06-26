import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function ChatRow(props) {
  return (
    <div className="list-group-item">
      <Link to={`/chats/${props.chat.id}`}><h4 className="list-group-item-heading">{props.chat.id}</h4></Link>
      <p className="list-group-item-text">
        Between <strong>{props.chat.visitor.name}</strong> and <strong>{props.chat.agents[0].display_name}</strong> <em>({moment.unix(props.chat.started_timestamp).format('MMMM Do YYYY, h:mm a')})</em>
      </p>
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

class SingleTag extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tag: { chats: [] }
    };
  }

  componentDidMount() {
    fetch('/api/chats')
      .then((response) => response.json())
      .then((data) => this.setState({tag: data})
    );
  }

  render() {
    return (
      <div>
          <h1 className="page-header">Tag {this.props.match.params.tagName ? `(${this.props.match.params.tagName})` : ''}</h1>
          {this.state.tag.error ? 
          (
            <h4>There was an error processing your request.</h4>
          ) : (
            <div>
                <h3>List of chats tagged with <strong>{this.props.match.params.tagName}</strong></h3>
                <ChatsList chats={this.state.tag.chats} />
            </div>
          )
        }
      </div>
    )
  }

}

export default SingleTag;