var express = require("express");
var app = express.createServer(express.logger());
var io = require('socket.io').listen(app);
var twitter = require("ntwitter");

io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 20);
    //io.set("log level", 1);
});

app.configure(function (){
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(request, response) {
    response.setHeader('Access-Control-Allow-Origin','*');
    response.sendfile(__dirname + '/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

io.sockets.on("connection", function(socket){
    io.sockets.emit("status", {"status" : "socket ready!"});
    socket.on("test", function(data) {
        io.sockets.emit("res", data);
    });
    socket.on("keyword", function(key) {
        console.log(key);
        twit.stream('statuses/filter', {"track":key}, function(stream){
            stream.on("data", function(data) {
                io.sockets.emit("res", data);
            })
        })
    });
});

/*
var twit = new twitter({
    consumer_key: 'verwURhvFVTuojYVJykZQ',
	consumer_secret: 'RQDgjMrlen8QdZJM90rK9zxvCtSlJXfU7I7YO2STELk',
	access_token_key: '26635865-5GyKYJD8oqteN7VvklzWE7Vtsssovorvo90P8izoc',
	access_token_secret: 'kLZebpapNT9bQpCYXSoaJJojIpebukyNrjb8HSmVwA'
});*/

var twit = new twitter({
    consumer_key: 'o7hQyqC0Ba8csgohX4sPsQ',
    consumer_secret: 'HSyl9wxdaZwHpvolAWEDxdFDMrmKxla2hStLGNbSllM',
	access_token_key: '26635865-ug3bmGiHmLGxEhSBIQkRPOEzJ7ZiEX5oP298qPF6U',
	access_token_secret: '1bPjIMR9EulJB7Uvb8XkNH6tTnEVKGvGYDv4pnt1Ds'
});