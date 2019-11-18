import quiet from 'quietjs-bundle';

export default class QuietHelper {
  static sharedInstance = QuietHelper.sharedInstance == null ? new QuietHelper() : this.sharedInstance;
  constructor() {
    this.qi = null;
    this.tx = null;
    this.subscribers = [];
    this.transmitQueue = 0;
    this.listening = false;
  }
  setup() {
    quiet.addReadyCallback(() => {
      this.qi = quiet;
      this.tx = quiet.transmitter({
        profile: 'audible',
        onFinish: () => {
          this.transmitQueue -= 1;
        },
      });
      this.subscribeListener();
    });
  }
  isTransmitting() {
    return this.transmitQueue !== 0;
  }
  transmit(message) {
    this.tx.transmit(quiet.str2ab(message));
    this.transmitQueue += 1;
  }
  subscribeListener() {
    this.listening = true;
    quiet.receiver({
      profile: 'audible',
      onReceive: (rawMessage) => {
        const newMessage = quiet.ab2str(rawMessage);
        this.subscribers.forEach((subscriber) => {
          subscriber(newMessage);
        });
      }
    })
  }
  subscribeToNewMessage(fn) {
    this.subscribers.push(fn);
  }
  unsubscribeToNewMessage(fn) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== fn
    );
  }
}
