const app = require('./app')
const connection = require('./database')


/**
 * input(route,callback_function)
 * page index
 * return reponse
 */
app.get('/', (req, res)=>{
    const title = "Formation Node.js"
    console.log("query:", req.query)

    res.render('pages/index',{
        title: title,
        // query: req.query
        query: ""
    })
})

app.get('/blog', (req, res)=>{
    let message = ""

    if (req.session.message) {
        console.log(req.session.message)
        message = req.session.message
    }

    if(req.cookies.username === undefined){
        // 1ere visite
        res.cookie('username','root')
        res.render('pages/blog',
        {bonjour:"Bonjour 1ere visite",
        message: message})

    }       
    else {
        //rebonjour
        res.render('pages/blog',
        {bonjour:"Rebonjour " + req.cookies.username,
        message: message})
    }
})

app.post('/',(req,res)=>{
    const POST = req.body
    const title = "Formation Node.js"
    console.log("req:", req.body)

    if (POST.message === undefined || POST.message === "") {
        res.render('pages/index', {
            error:"vous n'avez pas envoyé de nom"
        })
    } 
    else{
        connection.query("INSERT INTO message SET ?",
        {content: POST.message},(error, results, field)=>{
        // {content: "en dur !"},(error, results, field)=>{
            if(error) throw error
        })
        req.session.message = POST.message
        res.render('pages/index',{
            msg: "message envoyé"
        })
    }
})


/**
 * set port
 */
app.listen(5050)