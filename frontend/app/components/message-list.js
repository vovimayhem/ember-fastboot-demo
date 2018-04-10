import Component from '@ember/component';

export default Component.extend({
  tagName: 'ul',
  classNames: ['message-list', 'messages'],

  didRender() {
    this._super(...arguments);

    // Scroll to the bottom:
    window.scrollTo(0, document.body.scrollHeight);
  }
});
