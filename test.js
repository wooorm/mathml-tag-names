import assert from 'node:assert/strict'
import test from 'node:test'
import {mathmlTagNames} from './index.js'

test('mathmlTagNames', function () {
  assert.ok(Array.isArray(mathmlTagNames), 'should be an `array`')

  let index = -1
  while (++index < mathmlTagNames.length) {
    assert.strictEqual(
      typeof mathmlTagNames[index],
      'string',
      mathmlTagNames[index]
    )
  }
})
