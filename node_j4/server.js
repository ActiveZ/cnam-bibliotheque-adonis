const app = require('./app')
const connection = require('./database')


app.get('/',(req,res)=>{
    res.render('pages/inscription',{
    })
})

app.post('/', (req, res)=>{
    POST = req.body
    console.log(POST)
    if (POST.name != undefined && POST.name != "") {
        res.render('pages/login')
    }
    else {
        res.render('pages/inscription',{        
        })
    }   
})

// app.get('/inscription', (req, res)=>{
//     res.render('pages/inscription')
// })

// app.post('/inscription', (req, res)=>{
//     res.render('pages/inscription')
// })

app.get('/login',(req,res)=>{
    res.render('pages/login')
})

app.post('/login',(req,res)=>{
    res.render('pages/myAccount')
})

app.get('/myAccount',(req,res)=>{
    res.render('pages/myAccount')
})


/**
 * set port
 */
app.listen(5050)