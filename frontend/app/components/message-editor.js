import { resolve } from 'rsvp';
import { warn } from '@ember/debug';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['message-editor'],
  session: service(),

  message: '',

  // The default closure action invoked when clicking the "Send" button. Override like this:
  //
  onSend() { return resolve(warn('the "onSend" handler/closure action was not defined for this component')) },

  actions: {
    doSend() {
      const handler = this.get('onSend');
      const message = this.get('message');
      return handler(message).then(() => { this.set('message', '') });
    }
  }
});
