import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function TagRow(props) {
  return (
    <div className="list-group-item">
      {props.tag.count.inChats > 0 ? (
        <Link to={`/tags/${props.tag.name}`}><h4 className="list-group-item-heading">{props.tag.name}</h4></Link>
      ) : (
        <h4 className="list-group-item-heading">{props.tag.name}</h4>
      )}
      <p className="list-group-item-text">
          <em><strong>{props.tag.count.inChats}</strong> chats using it.</em>
      </p>
    </div>
  );
}

function TagsList(props) {
  let rows = [];
  for (let tag of props.tags) {
    rows.push(
      <TagRow key={tag.name} tag={tag} />
    );
  }

  return (
    <div className="list-group">
      {rows}
    </div>
  );
}

class Tags extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  componentDidMount() {
    fetch('/api/tags')
      .then((response) => response.json())
      .then((data) => this.setState({tags: data}));
  }

  render() {
    return (
      <div>
        <h1 className="page-header">Tags</h1>
        {this.state.tags.error ? 
          (
            <h4>There was an error processing your request.</h4>
          ) : (
            <TagsList tags={this.state.tags} />
          )
        }
      </div>
    )
  }

}

export default Tags;