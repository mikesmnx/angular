// скриптик, который отдает случайные слова из файла

var http = require('http');
var fs = require('fs');

var app = http.createServer(function (req,res) {
	var tasks = fs.readFileSync('./db.txt', 'utf-8').split('\n');
	var rnd = Math.floor(Math.random() * (tasks.length - 1)) + 1;

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.setHeader('Access-Control-Allow-Origin', '*');
	
	res.end(tasks[rnd]);
});

app.listen(8888);