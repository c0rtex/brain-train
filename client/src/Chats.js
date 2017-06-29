import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function ChatRow(props) {
  let tags = [];
  props.chat.tags.forEach((tag) => {
    tags.push(<Link key={tag} to={`/tags/${tag}`}><li className="btn btn-warning">{tag}</li></Link>);
  })
  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">
        <Link to={`/chats/${props.chat.id}`}>{props.chat.id}</Link> <em>({moment.unix(props.chat.started_timestamp).format('MMMM Do YYYY')})</em>
      </h4>
      <div className="list-group-item-text">
        <p>
          Between <strong>{props.chat.visitor.name}</strong> and <strong>{props.chat.agents[0].display_name}</strong> <em>({moment.unix(props.chat.started_timestamp).format('MMMM Do YYYY, h:mm a')})</em>
        </p>

        <p>
          <Link to={`/chats/${props.chat.id}`}>» Read transcript</Link>
        </p>
        {props.chat.tags.length > 0 && <ul className="chat-tags-list">
          {tags}
        </ul>
        }

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
    <div className="list-group messages-list">
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