import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

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

class AddTagForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tagName: '',
      isOpen: false,
      lastTagSaved: '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleChange(event) {
    this.setState({tagName: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/api/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tagName: this.state.tagName })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        this.setState({
          error: true,
          lastTagSaved: ''
        });
      }
      else {
        this.props.reloadTagsHandler();
        this.setState({
          lastTagSaved: data.name,
          error: false
        });
      }
      this.hideModal();
    });
    
    this.setState({tagName: ''});
  }

  openModal() {
    this.setState({
      isOpen: true
    });
  };
  
  hideModal() {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <div className="add-tag-form">
        {this.state.lastTagSaved && 
          <div className="alert alert-success" role="alert">
            The tag <strong>{this.state.lastTagSaved}</strong> was created successfully.
          </div>}

        {this.state.error && 
          <div className="alert alert-danger" role="alert">
            There was an error creating the tag. Make sure it doesn't already exist.
          </div>}

        <button type="button" className="btn btn-success btn-lg" onClick={this.openModal}>
          Add new tag
        </button>

        <form id="addTagForm" onSubmit={this.handleSubmit}>
          <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Add New Tag</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <input className="form-control" type="text" value={this.state.tagName} onChange={this.handleChange} placeholder="Enter the name of the tag" />
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-default" onClick={this.hideModal}>Close</button>
              <button type="submit" className="btn btn-success">Insert</button>
            </ModalFooter>
          </Modal>
        </form>
      </div>
    );
  }
}

class Tags extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };

    this.reloadTags = this.reloadTags.bind(this);
  }

  reloadTags() {
    fetch('/api/tags')
      .then((response) => response.json())
      .then((data) => this.setState({tags: data}));
  }

  componentDidMount() {
    this.reloadTags();
  }

  render() {
    return (
      <div>
        <h1 className="page-header">Tags</h1>
        {this.state.tags.error ? 
          (
            <h4>There was an error processing your request.</h4>
          ) : (
            <div>
              <AddTagForm reloadTagsHandler={this.reloadTags} />
              <TagsList tags={this.state.tags} />
            </div>
          )
        }
      </div>
    )
  }

}

export default Tags;