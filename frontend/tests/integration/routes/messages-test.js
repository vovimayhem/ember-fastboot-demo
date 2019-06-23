/* eslint-disable no-debugger */
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';

import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { assertionInjector, assertionCleanup } from 'ember-fastboot-demo/tests/assertions';

module('Integration | messages screen', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    assertionInjector(this.owner.application);
  });

  hooks.afterEach(function() {
    assertionCleanup(this.owner.application);
  });

  test('renders the messages screen when authenticated', async function(assert) {
    const user = this.server.create('user', { email: 'test@example.com' });
    const post = this.server.create('post', { body: 'Sample post', author: user });

    await authenticateSession({
      access_token: 'test-roken',
      authenticator: 'authenticator:demo',
      token_type: 'Bearer'
    });

    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('.message-list.messages').hasText(`${user.username} ${post.body}`);
  });
});
