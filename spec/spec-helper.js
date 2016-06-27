import chai from 'chai';
global.expect = chai.expect;

import sinon from 'sinon';
var sinonChai = require("sinon-chai");

chai.use(sinonChai);

beforeEach(function() {
  this.sinon = sinon.sandbox.create();
});

afterEach(function() {
  this.sinon.restore();
});

global.sinon = {
  stub: function() {
    throw new Error('call this.sinon.stub instead');
  },

  spy: function() {
    throw new Error('call this.sinon.stub instead');
  },

  useFakeXMLHttpRequest: sinon.useFakeXMLHttpRequest.bind(sinon),
  fakeServer: sinon.fakeServer
}
