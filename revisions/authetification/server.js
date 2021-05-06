const {
    result,
    padStart
} = require('lodash')

const {
    request,
    response
} = require('./app')

const app = require('./app')

const connection = require('./database')

const bcrypt = require('bcrypt');


//////////////////////////// PAGES LOGIN-LOGOUT //////////////////////////////////////

// page login
app.get('/login', (req, res) => {
    res.render('pages/login')
})


// page logout
app.post('/logout', (req, res) => {
    req.session.destroy(function (err) {
        // cannot access session here
    })

    res.redirect("/login")
})

// page login auth
app.post('/login', (req, res) => {
    const post = req.body
    post.email = "mail@mail.com"
    post.password = "123"
    if (post.email === "" || post.password === "") {
        res.render('pages/login', {
            error: "mot de passe ou email vide"
        })
    } else {
        if (true) {
            req.session.email = post.email
            res.redirect('/my_account')
        }
        // connection.query("SELECT * FROM users WHERE email = ?", [post.email], (error, results, fields) => {
        //     if (error) throw error
        //     const result = results[0]
        //     if (result.email === post.email && bcrypt.compareSync(post.password, result.password)) {
        //         req.session.email = result.email
        //         res.redirect('/my_account')
        //     } else {
        //         res.render('pages/login', {
        //             error: "mot de passe ou l'email errorné"
        //         })
        //     }
        // })
    }
})


/////////////////////////// PAGE MY_ACCOUNT ///////////////////////////////////////

// page my_account
app.get('/my_account', (req, res) => {
    if (req.session.email) {
        res.render('pages/my_account')
    } else {
        res.redirect('/login')
    }
})


//////////////////////////// PAGE INSCRIPTION //////////////////////////////////////

app.get('/inscription', (req, res) => {
    res.render('pages/inscription')
})

app.post('/inscription', (req, res) => {
    const post = req.body
    const hash = bcrypt.hashSync(post.pwd, 10);
    connection.query("INSERT INTO users set ?", {
        username: post.username,
        email: post.email,
        password: hash,
        phone: post.phone
    }, (error, results, fields) => {
        if (error) throw error
    })
    res.redirect('/login')
})


//////////////////////////////////////////////////////////////////

/**
 * ecoute sur port 6060
 */
app.listen(6060)