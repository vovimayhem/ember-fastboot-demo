import steps from './steps';
import { find } from '@ember/test-helpers';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .given('there is a post "$postBody" from "$postAuthorUsername"', function(postBody, postAuthorUsername) {
      let testAuthor = this.server.create('user', { username: postAuthorUsername });
      this.server.create('post', { author: testAuthor, body: postBody });
      assert.ok(true, this.step);
    })
    .then('I should see the post "$postBody" from "$postAuthorUsername"', function(postBody, postAuthorUsername) {
      assert.equal(
        find('li.posted-message').textContent.trim().split(/\s+/).join(' '),
        `${postAuthorUsername} ${postBody}`,
        this.step
      );
    });
}
