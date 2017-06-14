import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('style-bubble', 'Integration | Component | style bubble', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{style-bubble}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#style-bubble}}
      template block text
    {{/style-bubble}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
