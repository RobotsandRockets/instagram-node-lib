(function() {
  /*
  Test Setup
  */  var Init, Instagram, app, assert, completed, should, test, to_do;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  console.log("\nInstagram API Node.js Lib Tests :: Subscriptions");
  Init = require('./initialize');
  Instagram = Init.Instagram;
  app = Init.app;
  assert = require('assert');
  should = require('should');
  test = require('./helpers');
  completed = 0;
  to_do = 0;
  /*
  Tests
  */
  module.exports = {
    'multi#subscriptions': function() {
      var subscriptions;
      subscriptions = [];
      return test.helper("subscriptions subscribe to tag 'red'", Instagram, 'subscriptions', 'subscribe', {
        object: 'tag',
        object_id: 'red'
      }, function(data) {
        data.should.have.property('id');
        test.output("data had the property 'id'");
        data.id.should.be.above(0);
        test.output("data.id was greater than 0", data.id);
        data.should.have.property('type', 'subscription');
        test.output("data had the property 'type' equal to 'subscription'", data);
        subscriptions[subscriptions.length] = data.id;
        return test.helper("subscriptions subscribe to location '1257285'", Instagram, 'subscriptions', 'subscribe', {
          object: 'location',
          object_id: '1257285'
        }, function(data) {
          data.should.have.property('id');
          test.output("data had the property 'id'");
          data.id.should.be.above(0);
          test.output("data.id was greater than 0", data.id);
          data.should.have.property('type', 'subscription');
          test.output("data had the property 'type' equal to 'subscription'", data);
          subscriptions[subscriptions.length] = data.id;
          return test.helper("subscriptions subscribe to media near Eiffel Tower", Instagram, 'subscriptions', 'subscribe', {
            object: 'geography',
            lat: 48.858844300000001,
            lng: 2.2943506,
            radius: 1000
          }, function(data) {
            data.should.have.property('id');
            test.output("data had the property 'id'");
            data.id.should.be.above(0);
            test.output("data.id was greater than 0", data.id);
            data.should.have.property('type', 'subscription');
            test.output("data had the property 'type' equal to 'subscription'", data);
            subscriptions[subscriptions.length] = data.id;
            return test.helper('subscriptions list', Instagram, 'subscriptions', 'list', {}, function(data) {
              var found, i, subscriptions_list, _ref;
              data.length.should.be.above(0);
              test.output("data had length greater than 0", data.length);
              subscriptions_list = [];
              for (i in data) {
                subscriptions_list[subscriptions_list.length] = data[i].id;
              }
              found = true;
              for (i in subscriptions) {
                if (_ref = subscriptions[i], __indexOf.call(subscriptions_list, _ref) < 0) {
                  found = false;
                }
              }
              if (!found) {
                throw "subscription not found";
              }
              test.output("data had the subscriptions " + (subscriptions.join(', ')));
              return test.helper("subscriptions unsubscribe_all", Instagram, 'subscriptions', 'unsubscribe_all', {}, function(data) {
                if (data !== null) {
                  throw "unsubscribe_all failed";
                }
                test.output("data was null; we unsubscribed from the subscriptions " + (subscriptions_list.join(', ')));
                return app.finish_test();
              });
            });
          });
        });
      });
    }
  };
  app.start_tests(module.exports);
}).call(this);
