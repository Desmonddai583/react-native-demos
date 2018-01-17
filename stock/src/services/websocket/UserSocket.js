import { Socket } from 'phoenix';

let instance = null;
const ROOT_SOCKET = 'http://192.168.10.22:4000';

class UserSocket {
  constructor(token, uid) {
    if (!instance) {
      instance = this;
      const socketOptions = {
        // logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }
      };
      this.socket = new Socket(`${ROOT_SOCKET}/socket`, socketOptions);
      this.socket.connect();
    }
    this.channel = this.socket.channel(`room:${uid}`, { token });
    return instance;
  }
}

export default UserSocket;
