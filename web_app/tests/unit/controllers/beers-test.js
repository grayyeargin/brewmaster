import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:beers', 'Unit | Controller | beers', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('should get top 10 beers', function(assert) {
  let controller = this.subject();
  assert.equal(controller.get(topBeers).length, 10, '10 beers returned');
});
