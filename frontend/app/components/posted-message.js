import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['posted-message'],
  body: '',
  author: null
});
