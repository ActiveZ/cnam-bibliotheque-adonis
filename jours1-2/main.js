// DOC: 
// https://devdocs.io/

//  création d'un serveur
// importation du module http
const Http = require('http');
// importation fs (file system)
const FS = require('fs')
// importation url
const URL = require('url')


const server = Http.createServer();

// event request
server.on('request', (request, response) => {

    FS.readFile('home.html', 'utf8', (err, data) => {
        if (err) throw err;
        // header http
        response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
        // body http et close reponse
        let query =  URL.parse(request.url, true).query
        let html = data.replace("{{name}}", query.name)
        // console.log("data:", data)

        response.end(html);    
    })
})

server.listen(5050)