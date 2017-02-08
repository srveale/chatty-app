import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map(message =>
          <div key={this.props.messages.indexOf(message) + '-div'}>
            <span className="message-username" key={this.props.messages.indexOf(message) + 'uname'}>{message.username}</span>
            <span className="message-content" key={this.props.messages.indexOf(message) + 'content'}>{message.content}</span>
          </div>
        )}
      </div>
    );
  }
}

export default MessageList;