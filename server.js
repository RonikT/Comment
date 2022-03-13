const http = require('http');
const fs = require('fs');
const con = require("./DBConnection");

const hostname = '127.0.0.1'
const port = '3000'

const server = http.createServer((req, res) => {
    if(req.method == 'GET' && req.url == '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html' );
        fs.createReadStream('./index.html').pipe(res);

    }
    else if(req.method == 'GET' && req.url == '/style.css')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css' );
        fs.createReadStream('./style.css').pipe(res); 
    }

    else if(req.method == 'GET' && req.url == '/charities.html')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html' );
        fs.createReadStream('./charities.html').pipe(res); 
    }

    else if(req.method == 'GET' && req.url == '/topicpage.html')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html' );
        fs.createReadStream('./topicpage.html').pipe(res); 
    }

    else if(req.method == 'GET' && req.url == '/hottopics.html')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html' );
        fs.createReadStream('./hottopics.html').pipe(res); 
    }

    else if(req.method == 'GET' && req.url == '/materials.html')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html' );
        fs.createReadStream('./materials.html').pipe(res); 
    }

    else if(req.method == 'GET' && req.url == '/index.html')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html' );
        fs.createReadStream('./index.html').pipe(res); 
    }


    else if(req.method =="POST" && req.url =="/insert"){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var content = '';
    req.on('data', function(data){
        content += data;

        var obj = JSON.parse(content);
        console.log("The Username is: " + obj.name);
        console.log("The comment is: " + obj.message);
        var conn = con.getConnection();
        conn.query('INSERT INTO comments.comments (comments.userName, comments.comment) VALUES (?,?)', [obj.name, obj.message], function(error, results, fields){
            if(error) throw error;
            console.log("Success!");
        });

        conn.end();
        res.end("Success!");
    })

    }








    else if (req.method == "GET" && req.url == '/functions.js'){
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fs.createReadStream("./functions.js").pipe(res);
    }
    else if(req.method == "GET" && req.url == '/home' )

    {
        res.statuscode = 200;
        res.setHeader('Contnet-Type', 'application/json');

        var conn = con.getConnection();
        conn.query('SELECT * FROM comments.comments', function(error, results, fields){
            if(error) throw error;

            var comments = JSON.stringify(results);
            res.end(comments);
        });

        conn.end();
        

    }

});

server.listen(port, hostname, () =>{
 console.log('Server running at http://${hostname}:${port}/')
});
