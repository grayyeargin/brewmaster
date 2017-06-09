import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('breweries/news-card', 'Integration | Component | breweries/news card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{breweries/news-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#breweries/news-card}}
      template block text
    {{/breweries/news-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
