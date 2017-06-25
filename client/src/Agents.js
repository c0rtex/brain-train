import React, { Component } from 'react';

function AgentRow(props) {
  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">{props.agent.name}</h4>
      <p className="list-group-item-text">
        <strong>Permission:</strong> {props.agent.permission}<br />
        <strong>Login:</strong> {props.agent.login}<br />
        <strong>Status:</strong> {props.agent.status}<br />
        <strong>Avatar:</strong><br />
        <img src={`//${props.agent.avatar}`} alt={props.agent.login} />
      </p>
    </div>
  );
}

function AgentsList(props) {
  let rows = [];
  for (let agent of props.agents) {
    rows.push(
      <AgentRow key={agent.login} agent={agent} />
    );
  }

  return (
    <div className="list-group">
      {rows}
    </div>
  );
}

class Agents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      agents: []
    };
  }

  componentDidMount() {
    fetch('/api/agents')
      .then((response) => response.json())
      .then((data) => this.setState({agents: data}));
  }

  render() {
    return (
      <div>
        <h1 className="page-header">Agents</h1>
        {this.state.agents.error ? 
          (
            <h4>There was an error processing your request.</h4>
          ) : (
            <AgentsList agents={this.state.agents} />
          )
        }
      </div>
    )
  }

}

export default Agents;