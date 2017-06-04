import { test } from 'qunit';
import moduleForAcceptance from 'web-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | breweries');

test('visiting /breweries', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
