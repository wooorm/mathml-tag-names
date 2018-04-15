'use strict';

/* Dependencies. */
var assert = require('assert');
var test = require('tape');
var mathMLTagNames = require('.');

/* Tests. */
test('mathMLTagNames', function (t) {
  t.ok(
    Array.isArray(mathMLTagNames),
    'should be an `array`'
  );

  t.doesNotThrow(
    function () {
      mathMLTagNames.forEach(function (tagName) {
        assert.equal(typeof tagName, 'string', tagName);
      });
    },
    'should be all strings'
  );

  t.end();
});
