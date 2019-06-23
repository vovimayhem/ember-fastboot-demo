import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | message-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<MessageList />`);

    assert.equal(
      this.element.textContent.trim(),
      'No messages on this demo yet.'
    );

    // Template block usage:
    await render(hbs`
      <MessageList>
        template block text
      </MessageList>
    `);

    assert.equal(
      this.element.textContent.trim().split(/\s+/).join(' '),
      'No messages on this demo yet.'
    );
  });
});
