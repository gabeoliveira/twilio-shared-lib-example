exports.handler = async function(context, event, callback) {
  const libPath = Runtime.getAssets()['/my-shared-lib.js'].path;
  const myLib = require(libPath);

  const response = new Twilio.Response();
  response.setBody({
    message: myLib.generateCustomGreeting(event.name || 'Anonymous')
  });

  callback(null, response);
};
