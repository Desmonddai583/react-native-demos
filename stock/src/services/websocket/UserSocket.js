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
      this.socket.onError(() => console.log('Cannot connect.'));
      this.socket.onClose(() => console.log('Goodbye.'));
      this.socket.connect();
    }
    this.channel = instance.socket.channel(`room:${uid}`, { token });
    return instance;
  }

  static getSocket() {
    return instance;
  }
}

export default UserSocket;
