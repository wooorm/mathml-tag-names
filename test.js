/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module mathml-tag-names
 * @fileoverview Test suite for `mathml-tag-names`.
 */

'use strict';

/* eslint-env node */

/*
 * Module dependencies.
 */

var test = require('tape');
var mathMLTagNames = require('./index.js');

/*
 * Tests.
 */

test('mathMLTagNames', function (t) {
    t.ok(
        Array.isArray(mathMLTagNames),
        'should be an `array`'
    );

    mathMLTagNames.forEach(function (tagName) {
        t.equal(
            typeof tagName,
            'string',
            '`' + tagName + '` should be a string'
        );
    });

    t.end();
});
