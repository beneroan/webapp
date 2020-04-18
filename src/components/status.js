import React, { Component } from 'react';

class Status extends Component {
   constructor (props) {
      super(props);

      this.state = {
         loading: true,
         free: false,
         lastFree: null
      }
   }

   componentDidMount () {
      fetch('http://192.168.1.196:5000/status/machine?wing=' + this.props.wing + '&machine=' + this.props.machine)
         .then(response => response.json())
         .then(data => {
            this.setState({
               loading: false,
               free: data.free,
               lastFree: data.lastFree || new Date()
            })
         });
   }

   render = (props) => (
      <div style={{
         display: 'flex',
         width: '100%',
         marginBottom: 6
      }}>
         <div className='status' style={{
            background: this.state.loading 
                        ? '#ccc' 
                        : this.state.free ? '#0F9D58' : '#DB4437'
         }} />
         <p style={{
            marginTop: -6,
            marginLeft: 10
         }}>{this.props.machine}</p>
         <br />
         {
            !this.state.free
            ? <p style={{}}>In use for {Math.floor(((new Date()) - this.state.lastFree) / 1000)} minutes</p>
            : null
         }
      </div>
   )
}

export default Status;
