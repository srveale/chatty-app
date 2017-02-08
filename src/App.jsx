import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import index from './index.jsx';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      enterMessage: function(e) {
          if (e.key === 'Enter') {
            this.socket.send(JSON.stringify({ type: 'postMessage', username: this.state.currentUser.name, content: e.target.value}));
          }
      }.bind(this),

      changeName: function(e) {
        if (e.key === 'Enter') {
          this.setState({currentUser: {name: e.target.value}});
          this.socket.send(JSON.stringify({"type": "postNotification", "content": `${this.state.currentUser} has changed their name to ${e.target.value}.`}));
        }
      }.bind(this),

      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      notification: ''
    };
  }

  componentDidMount() {

    const socketServer = new WebSocket("ws://localhost:4000");

    this.socket = socketServer;

    console.log("componentDidMount <App />");

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('event.data', event.data);

      switch(data.type) {
      case "incomingMessage":

        const newMessage = {username: data.username, content :data.content};
        const messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages});
        break;

      case "incomingNotification":
        const notification = data.content;
        this.setSate({notification: notification});

        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }

    }


  }

  render() {
    return (
      <div>
        <div className="message system">
          {this.state.notification}
        </div>
        <main className="messages">
          <Message messages= {this.state.messages} />
        </main>
        <ChatBar currentUser ={this.state.currentUser}
                 enterMessage ={this.state.enterMessage}
                 changeName = {this.state.changeName} />
      </div>
    );
  }
}
export default App;