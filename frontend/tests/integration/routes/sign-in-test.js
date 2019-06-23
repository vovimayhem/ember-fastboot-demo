/* eslint-disable no-debugger */
import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import ENV from 'ember-fastboot-demo/config/environment';
import { setupApplicationTest } from 'ember-qunit';

// import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { default as window, setupWindowMock } from 'ember-window-mock';
import { assertionInjector, assertionCleanup } from 'ember-fastboot-demo/tests/assertions';

module('Integration | sign-in route', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupWindowMock(hooks);

  hooks.beforeEach(function() {
    assertionInjector(this.owner.application);
  });

  hooks.afterEach(function() {
    assertionCleanup(this.owner.application);
  });

  test('redirects to external sign-in page when unauthenticated', async function(assert) {
    await visit('/sign-in');

    // Verify we've got redirected to the OAuth2 authorization flow start:
    assert.stringStartsWith(
      window.location.href,
      `${ENV.APP.demoBackendUrl}/oauth/authorize`
    );
  });
});
