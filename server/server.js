const server = require("./app")
const app = server.App.start(5050,"home.html")

app.on('server',(response,data,query)=>{
    let html = data.replace("{{name}}",query.name)
    html = html.replace("{{age}}",query.age)
    response.write(html)
})