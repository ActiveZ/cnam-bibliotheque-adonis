const { result, padStart } = require('lodash')
const { request, response } = require('./app')
const app = require('./app')
const connection = require('./database')
const bcrypt = require('bcrypt');

app.get('/login',(req, res)=>{
    res.render('pages/login')
})

app.post('/logout',(req, res)=>{
    req.session.destroy(function(err) {
        // cannot access session here
    })

    res.redirect("/login")
})

app.get('/my_account',(req, res)=>{
    if(req.session.email){
        res.render('pages/my_account')
    }else{
        res.redirect('/login')
    }
})

app.post('/login',(req, res)=>{
    const post = req.body 
    if(post.email==="" || post.password ===""){

        res.render('pages/login',{error:"mot de passe ou email vide" })        
    }else{
        connection.query("SELECT * FROM user WHERE email = ?",[post.email],(error,results,fields)=>{
            if(error) throw error
            const result = results[0]
            if(result.email === post.email && bcrypt.compareSync(post.password, result.password) ){
                req.session.email = result.email
                res.redirect('/my_account')
            }else{                
                res.render('pages/login',{error:"mot de passe ou l'email errorné"})
            }
        })  
    }
})

app.get('/inscription',(req, res)=>{
    res.render('pages/inscription')
})

app.post('/inscription',(req,res)=>{
    const post= req.body
    const hash = bcrypt.hashSync(post.pwd, 10);
    connection.query("INSERT INTO user set ?",
            {username:post.username,email:post.email,password:hash,phone:post.phone},(error,results,fields)=>{
                if(error) throw error
            })   
    res.redirect('/login')
})

/**
 * ecoute sur port 6060
 */
app.listen(6060)
