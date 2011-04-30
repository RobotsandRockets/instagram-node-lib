(function() {
  /*
  Test Setup
  */  var Init, Instagram, app, assert, completed, should, test, to_do;
  console.log("\nInstagram API Node.js Lib Tests :: Geographies");
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
    'geographies#subscriptions': function() {
      return test.helper("geographies#subscriptions subscribe to geography near Eiffel Tower", Instagram, 'geographies', 'subscribe', {
        lat: 48.858844300000001,
        lng: 2.2943506,
        radius: 1000
      }, function(data) {
        var subscription_id;
        data.should.have.property('id');
        test.output("data had the property 'id'");
        data.id.should.be.above(0);
        test.output("data.id was greater than 0", data.id);
        data.should.have.property('type', 'subscription');
        test.output("data had the property 'type' equal to 'subscription'", data);
        subscription_id = data.id;
        return test.helper('geographies#subscriptions list', Instagram, 'subscriptions', 'list', {}, function(data) {
          var found, i;
          data.length.should.be.above(0);
          test.output("data had length greater than 0", data.length);
          found = false;
          for (i in data) {
            if (data[i].id === subscription_id) {
              found = true;
            }
          }
          if (!found) {
            throw "subscription not found";
          }
          test.output("data had the subscription " + subscription_id);
          return test.helper("geographies#subscriptions unsubscribe from media near Eiffel Tower", Instagram, 'geographies', 'unsubscribe', {
            id: subscription_id
          }, function(data) {
            if (data !== null) {
              throw "geography near Eiffel Tower unsubscribe failed";
            }
            test.output("data was null; we unsubscribed from the subscription " + subscription_id);
            return app.finish_test();
          });
        });
      });
    }
  };
  app.start_tests(module.exports);
}).call(this);
