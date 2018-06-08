import { Component, State } from '@stencil/core';
import Tunnel, { State as TunnelState, MessageLog } from './data-tunnel'; // Import the Tunnel

// Unique enough for a demo
function getUniqueId() {
  return (Math.random() * 10e16).toString().match(/.{4}/g).join('-');
}

@Component({
  tag: 'demo-app',
  styles: `
    demo-app {
      display: block;
      width: 700px;
      margin: 0 auto;
    }
  `
})
export class DemoApp {

  @State() listOfReceivers = [];
  @State() messageLog: MessageLog = [];

  sendMessage = (msgText: string) => {
    this.messageLog = [
      ...this.messageLog,
      {
        id: getUniqueId(),
        timeStamp: new Date(),
        message: msgText,
        recipients: this.listOfReceivers
      }
    ];
  }

  addReceiver = (receiverName: string) => {
    this.listOfReceivers = [
      ...this.listOfReceivers,
      receiverName
    ];
  }

  removeReceiver = (receiverName: string) => {
    this.listOfReceivers = this.listOfReceivers.filter(name => name !== receiverName);
  }

  render() {
    const tunnelState: TunnelState = {
      listOfReceivers: this.listOfReceivers,
      messageLog: this.messageLog,
      sendMessage: this.sendMessage,
      addReceiver: this.addReceiver,
      removeReceiver: this.removeReceiver
    };
    return (
      <Tunnel.Provider state={tunnelState}>
        <header>
          <h1>Message Demo App</h1>
        </header>
        <demo-manage-receivers />
        <demo-send-message
          hasReceivers={this.listOfReceivers.length > 0}
          sendMessage={this.sendMessage} />
        <demo-message-log />
      </Tunnel.Provider>
    );
  }
}