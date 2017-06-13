import { test } from 'qunit';
import moduleForAcceptance from 'web-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | breweries');

test('visiting /breweries', function(assert) {
  visit('/breweries');

  andThen(function() {
    assert.equal(currentURL(), '/breweries', 'should use breweries url');
  });
});

test('should list breweries', function(assert) {
  visit('/breweries');

  andThen(function() {
    assert.equal(find('.top-table tbody tr').length, 10, 'should see 10 breweries listed');
  });
});

test('should shows news articles', function(assert) {
  visit('/breweries');

  andThen(function() {
    assert.equal(find('.news-row .card').length, 3, 'should see 3 news articles');
  });
});


