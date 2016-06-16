$(document).ready(function(){

  $("#trigger").click(function(){
    var key = $("#event-arg-key").val(),
        value = $("#event-arg-value").val(),
        args = {};
    args[key] = value;
    controller.trigger($("#trigger-event-name-text").val(), args);
  });

  $("#listen").click(function(){
    controller.listen($("#listen-event-name-text").val()).done(function(data) {
      $("#callback-text").text("Event name: " + data.eventName + " / Args: {" + Object.keys(data.args)[0] + ":" + data.args[Object.keys(data.args)[0]] + "}");
    })
  });

});
