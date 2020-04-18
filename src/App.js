import React, { Component } from 'react';
import './App.css';
import machines from './machines.json';
import Status from './components/status';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      search: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  render = () => (
    <div className="App">
      <img style={{
        width: '20%',
        margin: '20px auto -20px auto',
        display: 'block'
      }} src='/logo.png' />
      <h1 style={{ textAlign: 'center', color: '#fff' }}>LitLaundry</h1>
      <input type='text' placeholder='Filter wing...' value={this.state.search} onChange={this.handleChange}/>
      {
        Object.keys(machines).map(key => (
          key.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0
          ?
            <div className='wing'>
              <h2>{key}</h2>
              {
                machines[key].map(machine => (
                  <Status wing={key} machine={machine} />
                ))
              }
            </div>
          : null
        ))
      }
    </div>
  )
}

export default App;
