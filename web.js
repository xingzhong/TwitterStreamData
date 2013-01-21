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

var twit;
var stop = 0;
io.sockets.on("connection", function(socket){
    io.sockets.emit("status", {"status" : "socket ready!"});
    socket.on("test", function(data) {
        io.sockets.emit("res", data);
    });
    socket.on("stop", function(){
        console.log("stop:" + stop);
        if (stop == 1) {stop = 0;}
        else {stop = 1;}
    });
    socket.on("enterUser", function(user) {
        if (user == "ws1") {twit = twit1;}
        if (user == "ws2") {twit = twit2;}
        if (user == "ws3") {twit = twit3;}
        if (user == "ws4") {twit = twit4;}
        io.sockets.emit("userRec", user);
    });
    socket.on("keyword", function(key) {
        console.log(key);
        twit.stream('statuses/filter', {"track":key}, function(stream){
            stream.on("data", function(data) {
                if (stop == 0)
                    io.sockets.emit("res", data);
            })
        })
    });
});


var twit1 = new twitter({
    consumer_key: 'verwURhvFVTuojYVJykZQ',
	consumer_secret: 'RQDgjMrlen8QdZJM90rK9zxvCtSlJXfU7I7YO2STELk',
	access_token_key: '26635865-5GyKYJD8oqteN7VvklzWE7Vtsssovorvo90P8izoc',
	access_token_secret: 'kLZebpapNT9bQpCYXSoaJJojIpebukyNrjb8HSmVwA'
});

var twit2 = new twitter({
    consumer_key: 'o7hQyqC0Ba8csgohX4sPsQ',
    consumer_secret: 'HSyl9wxdaZwHpvolAWEDxdFDMrmKxla2hStLGNbSllM',
	access_token_key: '26635865-ug3bmGiHmLGxEhSBIQkRPOEzJ7ZiEX5oP298qPF6U',
	access_token_secret: '1bPjIMR9EulJB7Uvb8XkNH6tTnEVKGvGYDv4pnt1Ds'
});

var twit3 = new twitter({
    consumer_key: 'JEfKLDMpaMxZEQEynEdNQ',
    consumer_secret: '2iNJRZYb5HYrd9V8TPHtMPIGUQizQlHVaTlsgPjGM',
    access_token_key: '26635865-PWr5miIeOauR7kZecWug01uPRjfbyyC4rMIGqUkvc',
	access_token_secret: 'EkuBb4zUOYh8NIIWEoRjVeYPEFtfogmeFzESHxZc5A'
});

var twit4 = new twitter({
    consumer_key: 'hOUuyC7afAmgqCWxQxb7QA',
    consumer_secret: '1EFDr0dCSjEfTBV7ZcCPLd2dW1stieIEG5UfLjAoU',
    access_token_key: '140094350-OmKS3AvYEo7vJI7iteM0nOOqiRN9JGshS4AsqqNC',
    access_token_secret: 'h8mTSywrReMAFTiY6a54PnUbDXSP45XexOwdb1Pbjs'
});