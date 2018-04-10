import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
// https://github.com/emberjs/ember-test-helpers/blob/master/API.md
import { visit, currentURL, find } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { assertionInjector, assertionCleanup } from 'demo/tests/assertions';

module('Acceptance | home', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    assertionInjector(this.owner.application);
  });

  hooks.afterEach(function() {
    assertionCleanup(this.owner.application);
  });

  test('visiting /', async function(assert) {
    let testAuthor = this.server.create('user', { username: 'test-user' });
    this.server.create('post', { author: testAuthor, body: 'Test Post Body' });

    await visit('/');

    assert.equal(currentURL(), '/', 'Is in the expected screen');

    assert.equal(
      find('li.posted-message .content').textContent.trim(),
      'Test Post Body',
      'Renders the example post'
    );

    assert.equal(
      find('li.posted-message .author').textContent.trim(),
      'test-user',
      'Renders the author username from the example post'
    );
  });
});
