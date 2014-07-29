'use strict';

describe('Service: Postcardservice', function () {

  // load the service's module
  beforeEach(module('projectPostcardApp'));

  // instantiate service
  var Postcardservice;
  beforeEach(inject(function (_Postcardservice_) {
    Postcardservice = _Postcardservice_;
  }));

  it('should do something', function () {
    expect(!!Postcardservice).toBe(true);
  });

});
