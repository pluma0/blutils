/*global describe, it */
var expect = require('expect.js'),
  append = require('../').append;

describe('blutils.append(fns...)', function() {
  it('is a function', function() {
    expect(append()).to.be.a('function');
  });
  it('returns a promise that resolves to an array', function(done) {
    append(function() {})()
    .done(function(result) {
      expect(result).to.be.an('array');
      done();
    });
  });
  it('appends the result to the input array', function(done) {
    append(function(x) {return x * 2;})([1])
    .done(function(result) {
      expect(result).to.eql([1, 2]);
      done();
    });
  });
  it('applies each function in sequence', function(done) {
    append(
      function(x) {return -x;},
      function(x) {return x * 2;}
    )([1])
    .done(function(result) {
      expect(result).to.eql([1, -2]);
      done();
    });
  });
  it('wraps the non-array input in an array', function(done) {
    append(function(x) {return x * 2;})(1)
    .done(function(result) {
      expect(result).to.eql([1, 2]);
      done();
    });
  });
});