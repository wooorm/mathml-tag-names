'use strict'

var assert = require('assert')
var test = require('tape')
var mathMLTagNames = require('.')

test('mathMLTagNames', function(t) {
  t.ok(Array.isArray(mathMLTagNames), 'should be an `array`')

  t.doesNotThrow(function() {
    mathMLTagNames.forEach(function(tagName) {
      assert.equal(typeof tagName, 'string', tagName)
    })
  }, 'should be all strings')

  t.end()
})
