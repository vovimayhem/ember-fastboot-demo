import { module, test } from 'qunit';
import ENV from 'demo/config/environment';
// https://github.com/emberjs/ember-test-helpers/blob/master/API.md
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { assertionInjector, assertionCleanup } from 'demo/tests/assertions';
import { default as window, reset as windowReset } from 'ember-window-mock';

module('Acceptance | sign in', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    windowReset();
    assertionInjector(this.owner.application);
  });

  hooks.afterEach(function() {
    assertionCleanup(this.owner.application);
  });

  test('from the messages view', async function(assert) {
    // Visit the home page (messages view):
    await visit('/');

    // Click the "sign-in" link/button:
    await click('.sign-in');

    // Verify we've got redirected to the OAuth2 authorization flow start:
    assert.stringStartsWith(
      window.location.href,
      `${ENV.APP.demoOAuthUrl}/authorize`
    );
  });
});
