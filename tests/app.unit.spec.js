var app = require('../app');
var debug = require('debug')('app test');
var request = require('request');



describe('app unit test', function(){
  var server;
  beforeEach(function(){
    var http = require('http');
    var port = 3000;
    server = http.createServer(app);

    server.listen(port);


  });
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  it('ping server', function(done){
    server.on('error', function(err){done(err);});
    server.on('listening', onListening);
    request('http://127.0.0.1:3000/ping', function (error, response, body) {
      console.log('recieved response');
      if (error)
      return done(error);
      console.log(JSON.stringify(arguments));
      if (!error && response.statusCode == 200) {
          console.log(JSON.stringify(response));
          done(error);
      }
   });
 });

   it('negative test', function(done){
     server.on('error', function(err){done();});
     server.on('listening', onListening);
     request('http://127.0.0.1:3000/nothing', function (error, response, body) {
       console.log('recieved response' + error);
       console.log(JSON.stringify(arguments));
       if (response.statusCode == 200){
         return done(response);
    }
  });
});
});
