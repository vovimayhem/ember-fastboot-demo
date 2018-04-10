import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  body(i) { return `Test Post ${i} Body` }
});
