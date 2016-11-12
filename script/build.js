'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var https = require('https');
var cheerio = require('cheerio');
var bail = require('bail');
var list = require('..');

/* Input / output locations. */
var mathml1 = 'https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html';
var mathml2 = 'https://www.w3.org/TR/MathML2/appendixl.html';
var mathml3 = 'https://www.w3.org/TR/MathML3/appendixi.html';
var output = path.join(__dirname, '..', 'index.json');

var count = 0;

/* Crawl MathMl 1.0. */
load(mathml1, function (err, doc) {
  bail(err);

  cheerio.load(doc)('ul ul ul ul a').each(function () {
    var data = this.children[0].data;

    data = data.slice(data.indexOf('<') + 1, data.indexOf('>'));

    if (data.charAt(data.length - 1) === '/') {
      data = data.slice(0, -1);
    }

    if (list.indexOf(data) === -1) {
      list.push(data);
    }
  });

  done();
});

/* Crawl MathMl 2.0. */
load(mathml2, function (err, doc) {
  bail(err);

  cheerio.load(doc)('.div1 .div2:first-child dl dt').each(function () {
    var data = this.children[0].data;

    if (list.indexOf(data) === -1) {
      list.push(data);
    }
  });

  done();
});

/* Crawl MathMl 3.0. */
load(mathml3, function (err, doc) {
  bail(err);

  cheerio.load(doc)('.div1 .div2:first-child dl dt').each(function () {
    var data = this.children[0].data;

    if (list.indexOf(data) === -1) {
      list.push(data);
    }
  });

  done();
});

/* Write. */
function done() {
  count++;

  if (count === 3) {
    fs.writeFile(output, JSON.stringify(list.sort(), 0, 2) + '\n', bail);
  }
}

/* Load. */
function load(url, next) {
  https.get(url, function (res, err) {
    var value = '';

    if (err) {
      return next(err);
    }

    res
      .setEncoding('utf8')
      .on('data', function (buf) {
        value += buf;
      })
      .on('end', function () {
        next(null, value);
      });
  });
}
