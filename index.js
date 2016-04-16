var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
  io: new raspi()
});

var request = require('request');

board.on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "BMP180",
    freq: 250
  });

  temperature.on("change", function() {
    console.log("temperature");
    console.log("  celsius      : ", this.celsius);
    request.post('http://raspi-api.herokuapp.com/api/raspis/5711cedc94b909110002f855/sensors/5711cefb94b909110002f85f/sensors_data', { json: { value:this.celsius, sentAt: Date.now() } }, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("Post to server OK");
      }
    });
  });
});
