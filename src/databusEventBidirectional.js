var controllerBidirectional = (function () {

  var waiting = [],
      resolved = [],

      getWaiting = function () {return waiting;},
      setWaiting = function (element) {waiting.push(element);},
      getResolved = function () {return resolved;},
      setResolved = function (element) {resolved.push(element);},
      parseArgs = function(args) {
        var result;
        try {
          result = JSON.parse(args);
        } catch(e) {
          result = {};
        }
        return result;
      }

  return {

    trigger: function(eventName, args) {
      var promise;
      if(_.isEmpty(getWaiting())) {
        promise = $.Deferred();
        setResolved(promise);
      } else {
        promise = getWaiting().shift();
      }
      promise.resolve({eventName: eventName, args: args});
    },

    listen: function(eventName) {
      var promise;
      if(_.isEmpty(getResolved())) {
        promise = $.Deferred();
        setWaiting(promise);
      } else {
        promise = getResolved().shift();
      }
      return promise;
    },

  }

}());
