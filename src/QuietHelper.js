import quiet from 'quietjs-bundle';

export default class QuietHelper {
  static sharedInstance = QuietHelper.sharedInstance == null ? new QuietHelper() : this.sharedInstance;
  constructor() {
    this.qi = null;
    this.tx = null;
    this.subscribers = [];
    this.listening = false;
    quiet.addReadyCallback(() => {
      alert('ready')
      this.qi = quiet;
      this.tx = quiet.transmitter({
        profile: 'audible',
        onFinish: () => {
          if (!this.listening) {
            this.subscribeListener();
          }
          alert('sent')
        },
      });
      setTimeout(() => {
        this.unlockAudio();
      }, 1000);
    });
  }
  unlockAudio() {
    this.tx.transmit(quiet.str2ab('hall world'));
  }
  subscribeListener() {
    this.listening = true;
    alert('subscribing')
    quiet.receiver({
      profile: 'audible',
      onReceive: (rawMessage) => {
        const newMessage = quiet.ab2str(rawMessage);
        this.subscribers.forEach((subscriber) => {
          subscriber(newMessage);
        })
      }
    })
  }
  subscribeToNewMessage(fn) {
    this.subscribers.push(fn);
  }
  unsubscribeToNewMessage(fn) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== fn);
  }
  send(message) {
    if (this.tx) {
      this.tx.transmit(quiet.str2ab("foooo bar"));
    }
  }
}
