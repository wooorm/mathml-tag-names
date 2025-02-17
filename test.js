import assert from 'node:assert/strict'
import test from 'node:test'
import {mathmlTagNames} from './index.js'

test('mathmlTagNames', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'mathmlTagNames'
    ])
  })

  await t.test('should be an `array`', async function () {
    assert.ok(Array.isArray(mathmlTagNames))
  })

  await t.test('should be all strings', async function () {
    for (const tagName of mathmlTagNames) {
      assert.equal(typeof tagName, 'string')
    }
  })
})
