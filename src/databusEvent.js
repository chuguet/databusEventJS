var controller = (function () {

  var bus = {};

  var getBus = function (key) {return bus[key];}
  var setBus = function (key, value) {bus[key]=value;}
  var deleteBus = function (key) {delete bus[key];}

  return {

    trigger: function(eventName, args) {
      var promise;
      if(getBus(eventName)) {
        promise = getBus(eventName);
      } else {
        promise = $.Deferred();
        setBus(eventName, promise);
      }
      promise.resolve({eventName: eventName, args: args});
    },

    listen: function(eventName, callback) {
      var promise;
      if(getBus(eventName)) {
        promise = getBus(eventName);
        deleteBus(eventName);
      } else {
        promise = $.Deferred();
        setBus(eventName, promise);
      }

      if(callback && typeof(callback) === 'function') {
        promise.done(callback);
      } else {
        return promise;
      }
    },

  }

}());
