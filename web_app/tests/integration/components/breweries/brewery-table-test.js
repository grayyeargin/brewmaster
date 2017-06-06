import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('breweries/brewery-table', 'Integration | Component | breweries/brewery table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{breweries/brewery-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#breweries/brewery-table}}
      template block text
    {{/breweries/brewery-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
