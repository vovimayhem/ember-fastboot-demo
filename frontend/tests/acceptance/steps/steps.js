import yadda from 'demo/tests/helpers/yadda';
import { visit, click } from '@ember/test-helpers';

export default function(assert) {
  return yadda.localisation.default.library()
    .given('I visit the "$page" page', async function(page) {
      let testPage = `/${page}`;
      if (testPage == '/home') { testPage = '/'; }
      await visit(testPage);
      assert.ok(true, this.step);
    })
    .when('I visit the "$page" page', async function(page) {
      let testPage = `/${page}`;
      if (testPage == '/home') { testPage = '/'; }
      await visit(testPage);
      assert.ok(true, this.step);
    })
    .when('I click on the "$linkName" link', async function(linkName) {
      let selector = `.${linkName}`;
      await click(selector);
      assert.ok(true, this.step);
    });
}
