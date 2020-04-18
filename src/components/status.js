import React, { Component } from 'react';

const URL = 'http://localhost:5000'

class Status extends Component {
   constructor (props) {
      super(props);

      this.state = {
         loading: true,
         free: false,
         lastFree: null,
         sentReminder: false
      }
   }

   componentDidMount () {
      fetch(URL + '/status/machine?wing=' + this.props.wing + '&machine=' + this.props.machine)
         .then(response => response.json())
         .then(data => {
            this.setState({
               loading: false,
               free: data.free,
               lastFree: data.lastFree ? new Date(data.lastFree) : new Date()
            })
         });
   }

   sendReminder () {
      if (!this.state.sentReminder) {
         this.setState({
            sentReminder: true
         })
         fetch(URL + '/remind?wing=' + this.props.wing)
      }
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
         {
            !this.state.free 
            && !this.state.loading
            && Math.floor(((new Date()) - this.state.lastFree) / 1000) != 0
            ? 
            <div style={{
               flexGrow: 1
            }}>
               <p style={{
                  marginTop: -12,
                  textAlign: 'right',
                  width: '100%'
               }}>
                  In use for {Math.floor(((new Date()) - this.state.lastFree) / 1000)} minutes
                  <span 
                     style={{
                        background: this.state.sentReminder ? '#999' : '#4285F4',
                        borderRadius: 4,
                        padding: 4,
                        marginLeft: 8,
                        cursor: 'pointer',
                        color: '#fff',
                        display: 'inline-block'
                     }}
                     onClick={this.sendReminder.bind(this)}
                  >
                     Send a Reminder
                  </span>
               </p>
            </div>
            : null
         }
      </div>
   )
}

export default Status;
