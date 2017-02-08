import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
               defaultValue={this.props.currentUser.name}
               onKeyPress={this.props.changeName} />
        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               onKeyPress={this.props.enterMessage} />
      </footer>
    );
  }
}

export default ChatBar;
