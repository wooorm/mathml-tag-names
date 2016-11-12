'use strict';

/* Dependencies. */
var fs = require('fs');
var jsdom = require('jsdom');
var bail = require('bail');
var list = require('./');

var count = 0;

/* Crawl MathMl 1.0. */
jsdom.env('https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html', function (err, window) {
  var nodes;

  bail(err);

  nodes = [].slice.call(window.document.querySelectorAll('ul ul ul ul a'));

  nodes.forEach(function (node) {
    var data = node.childNodes[0].textContent;

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
jsdom.env('https://www.w3.org/TR/MathML2/appendixl.html', function (err, window) {
  var nodes;

  bail(err);

  nodes = [].slice.call(window.document.querySelectorAll('.div1 .div2:first-child dl dt'));

  nodes.forEach(function (node) {
    var data = node.childNodes[0].textContent;

    if (list.indexOf(data) === -1) {
      list.push(data);
    }
  });

  done();
});

/* Crawl MathMl 3.0. */
jsdom.env('https://www.w3.org/TR/MathML3/appendixi.html', function (err, window) {
  var nodes;

  bail(err);

  nodes = [].slice.call(window.document.querySelectorAll('.div1 .div2:first-child dl dt'));

  nodes.forEach(function (node) {
    var data = node.childNodes[0].textContent;

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
    fs.writeFile('index.json', JSON.stringify(list.sort(), 0, 2) + '\n', bail);
  }
}
