// http://localhost:5050/?name=user1&age=2

const HttpServer = require('http')
const EventEmitter = require('events')
const FS = require('fs')
const URL = require('url')

const App = {
    start : function(port, page) {
        const emitter = new EventEmitter();

        HttpServer.createServer((request, response) => {
            FS.readFile(page,"utf8", (err,data) => {
                if(err) throw err;
                response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
                let query =  URL.parse(request.url, true).query
                emitter.emit('server', response, data, query)
                response.end();
            })
        }).listen(port)
        return emitter
    }
}

const app = App.start(5050, "home.html")
app.on('server', (response, data, query) => {
    let html = data.replace("{{name}}",query.name)
    html = html.replace("{{age}}",query.age)
    response.write(html)
})




// const monEcouteur = new EventEmitter();

// monEcouteur.on("marche", (x,y) => {
//     console.log("je marche ", x, y)
// })

// monEcouteur.emit("marche", 50, 10);
// monEcouteur.emit("marche", 40, 20);
// monEcouteur.emit("marche", 30, 30);
// monEcouteur.emit("marche", 20, 40);
// monEcouteur.emit("marche", 10, 50);