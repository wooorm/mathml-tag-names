import assert from 'assert'
import test from 'tape'
import {mathmlTagNames} from './index.js'

test('mathmlTagNames', function (t) {
  t.ok(Array.isArray(mathmlTagNames), 'should be an `array`')

  t.doesNotThrow(function () {
    var index = -1
    while (++index < mathmlTagNames.length) {
      assert.strictEqual(
        typeof mathmlTagNames[index],
        'string',
        mathmlTagNames[index]
      )
    }
  }, 'should be all strings')

  t.end()
})
