const HttpServer = require('http')
const EventEmitter = require('events')
const FS = require('fs')
const URL = require('url')

exports.App = {
    start : function(port, page) {
        const emitter = new EventEmitter();

        HttpServer.createServer((request, response) => {
            FS.readFile(page,"utf8", (err,data) => {
                if(err) throw err;
                // header http
                response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
                // body http et close response
                let query =  URL.parse(request.url, true).query
                emitter.emit('server', response, data, query)
                response.end();
            })
        }).listen(port)
        return emitter
    }
}
