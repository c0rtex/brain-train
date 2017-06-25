import React, { Component } from 'react';

class Agents extends Component {

  constructor(props) {
    super(props);
    this.state = {agents: []};
  }

  componentDidMount() {
    fetch('/api/agents')
      .then((response) => response.json())
      .then((data) => this.setState({agents: data}));
  }

  render() {
    let rows = [];
    for (let agent of this.state.agents) {
      rows.push(
        <div href="#" class="list-group-item">
          <h4 className="list-group-item-heading">{agent.name}</h4>
        </div>
      );
    }

    return (
      <div>
        <h1 className="page-header">Agents</h1>
        <div className="list-group">
          {rows}
        </div>
      </div>
    )
  }

}

export default Agents;