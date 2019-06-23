import { resolve } from 'rsvp';
import { warn } from '@ember/debug';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['message-editor'],
  session: service(),

  message: '',

  // The default closure action invoked when clicking the "Send" button.
  // Override like this:
  onSend() {
    return resolve(
      warn(
        'the "onSend" handler/closure action was not defined for this component'
      )
    );
  },

  actions: {
    async doSend() {
      const handler = this.onSend;
      const message = this.get('message');
      const result = await handler(message);
      this.set('message', '');
      return result;
    }
  }
});
