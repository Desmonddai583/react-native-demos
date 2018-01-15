import { Socket } from 'phoenix';

let instance = null;
const ROOT_SOCKET = 'http://192.168.10.22:4000';

class PublicSocket {
  constructor(channel) {
    if (!instance) {
      instance = this;
    }
    const socketOptions = {
      // logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }
    };
    this.socket = new Socket(`${ROOT_SOCKET}/socket`, socketOptions);
    this.socket.connect();
    this.channel = this.socket.channel(channel, {});
    return instance;
  }
}

export default PublicSocket;
