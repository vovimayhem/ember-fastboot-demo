import steps from './steps';
import ENV from 'ember-fastboot-demo/config/environment';
import { default as mockedWindow } from 'ember-window-mock';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .then('I should be redirected to the "sign-in" page', function() {
      assert.stringStartsWith(
        mockedWindow.location.href,
        `${ENV.APP.demoBackendUrl}/oauth/authorize`,
        this.step
      );
    });
}
