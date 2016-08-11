var mognoose = require('mongoose');
describe('test mongo', function(){
  var DB = process.env.DB  || 'mongodb://mongo:27017/local';

  it.skip('connect', function(done){
    var mongoose = require('mongoose');

    mongoose.connect(DB);
        // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + DB);
      done();
    });

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
      done(err);
    });

  });



});
