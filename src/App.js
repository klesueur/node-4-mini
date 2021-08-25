import React, { Component } from 'react';
import axios from 'axios';
import HistoryModal from './components/HistoryModal';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      allMessages: [],
      messageInputDisabled: true,
      showHistory: false
    };
    this.closeHistoryModal = this.closeHistoryModal.bind(this);
  }

  
  componentDidMount() {
    axios.get('/api/messages')
    .then(res => {
      console.log('RESPONSE.DATA: ', res.data)
      this.setState({ allMessages: res.data })
    })
    .catch(error => {
      console.log('ERROR: ', error)
    });
  }

  createMessage() {
    const { username, message } = this.state;

    axios.post('/api/messages', {
      username,
      message
    })
    .then(res => {
      this.setState({ allMessages: res.data })
    })
    .catch(error => {
      console.log('ERROR POSTING MESSAGE: ', error)
    })
  }
  

  saveUsername() {
    if (this.state.username) {
      this.setState({ messageInputDisabled: !this.state.messageInputDisabled });
    }
  }

  showHistoryModal() {
    this.setState({ showHistory: true });
  }
  closeHistoryModal() {
    this.setState({ showHistory: false });
  }

  render() {
    let allMessages = this.state.allMessages.map((messageObj, i) => {
      return (
        <div className="message" key={i}>
          <span>{messageObj.username}</span>
          <span>{messageObj.message}</span>
        </div>
      );
    });

    return (
      <div className="app">
        <div className="content">
          <div className="messages-wrapper">{allMessages}</div>
          <div className="input-wrapper">
            <input
              disabled={!this.state.messageInputDisabled}
              onChange={e => this.setState({ username: e.target.value })}
              value={this.state.username}
              type="text"
              className="input-username"
              placeholder="Type in username..."
            />
            <button
              className="button-username"
              onClick={() => this.saveUsername()}>
              {this.state.messageInputDisabled ? 'save' : 'update'}
            </button>
            <input
              disabled={this.state.messageInputDisabled}
              onChange={e => this.setState({ message: e.target.value })}
              value={this.state.message}
              type="text"
              className="input-message"
              placeholder={
                this.state.messageInputDisabled
                  ? 'Create a username before you send a message'
                  : 'Type in message...'
              }
            />
            <button
              onClick={() => this.createMessage()}
              disabled={this.state.messageInputDisabled}
              className="button-message">
              send
            </button>
            <button onClick={() => this.showHistoryModal()}>history</button>
          </div>
        </div>

        {/* If this.state.showHistory === true, modal will be displayed */}
        {this.state.showHistory ? (
          <HistoryModal closeHistoryModal={this.closeHistoryModal} />
        ) : null}
      </div>
    );
  }
}

export default App;
