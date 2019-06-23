import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | message-editor', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<MessageEditor />`);

    assert.equal(
      this.element.textContent.trim(),
      'Sign In to begin posting messages.'
    );

    // Template block usage:
    await render(hbs`
      <MessageEditor>
        template block text
      </MessageEditor>
    `);

    assert.equal(
      this.element.textContent.trim().split(/\s+/).join(' '),
      'Sign In to begin posting messages. template block text'
    );
  });
});
