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

const dateFormat = require("dateformat")


//////////////////////////// PAGES LOGIN-LOGOUT //////////////////////////////////////

// page login
app.get('/', (req, res) => {
    res.render('pages/login')
})

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
    if (post.login === "" || post.password === "") {
        res.render('pages/login', {
            error: "mot de passe ou pseudo vide"
        })
    } else {
        connection.query("SELECT * FROM adherents WHERE login = ?", [post.login], (error, results, fields) => {
            if (error) throw error
            const result = results[0]

            // vérification identification
            if (results.length > 0 && result.login === post.login && bcrypt.compareSync(post.password, result.password)) {
                // console.log("adhérent identifié par id", result.id)

                // récupération de l'id l'adhérent
                req.session.userId = result.id
                res.redirect('/account')

            } else {
                res.render('pages/login', {
                    error: "mot de passe ou pseudo erroné"
                })
            }
        })
    }
})


/////////////////////////// PAGE ACCOUNT ///////////////////////////////////////

// page account
app.get('/account', (req, res) => {
    // récupération de l'adhérent

    connection.query("SELECT * FROM adherents WHERE id = ?", [req.session.userId], (error, results, fields) => {
        if (error) throw error
        const result = results[0]
        user = {
            id: result.id,
            nom: result.nom,
            prenom: result.prenom,
            login: result.login,
            inscrit: result.inscrit > 0 ? "oui" : "non"
        }
        // console.log("user account", user)

        // récupération des livres empruntés par l'adhérent
        connection.query("SELECT * FROM livres WHERE idAdherent = ?", [user.id], (error, results, fields) => {
            if (error) throw error
            let myBooks = []
            results.forEach(b => {
                book = {
                    id: b.id,
                    titre: b.titre,
                    auteur: b.auteur,
                    isbn: b.isbn,
                    datePret: dateFormat(b.datePret, "shortDate"),
                    dateRetour: dateFormat(b.dateRetour, "shortDate")
                }
                myBooks.push(book)
            });
            // console.log("myBooks", myBooks)

            // récupération des livres disponibles
            connection.query("SELECT * FROM livres WHERE idAdherent = ?", ["0"], (error, results, fields) => {
                if (error) throw error
                let freeBooks = []
                results.forEach(b => {
                    book = {
                        id: b.id,
                        titre: b.titre,
                        auteur: b.auteur,
                        isbn: b.isbn,
                        datePret: dateFormat(b.datePret, "shortDate"),
                        dateRetour: dateFormat(b.dateRetour, "shortDate")
                    }
                    freeBooks.push(book)
                });
                // console.log("freeBooks", freeBooks)

                // envoi pour l'affichage
                res.render('pages/account', {
                    user: user,
                    myBooks: myBooks,
                    freeBooks: freeBooks
                })
            })
        })
    })
})

//////////////////////////// PAGE INSCRIPTION //////////////////////////////////////

app.get('/inscription', (req, res) => {
    res.render('pages/inscription')
})

app.post('/inscription', (req, res) => {
    const post = req.body
    const hash = bcrypt.hashSync(post.password, 10);

    connection.query("INSERT INTO adherents set ?", {
        nom: post.nom,
        prenom: post.prenom,
        inscrit: true,
        login: post.login,
        password: hash
    }, (error, results, fields) => {
        if (error) throw error
        console.log(results)///////////////////////////////////////////////////////////////
        req.session.nom = post.nom
    })
    res.redirect('/account')
})


///////////////// EMPRUNTER LIVRE ////////////////////////////////

app.get('/emprunter', (req, res) => {
    // console.log("params", req.query)
    connection.query("UPDATE livres SET idAdherent= ? WHERE id= ?", [req.query.idUser, req.query.idBook], (error, results, fields) => {
        if (error) throw error
        // console.log("result update", results.message)
        res.redirect('/account')
    })

})


///////////////// RENDRE LIVRE ///////////////////////////////////

app.get('/rendre', (req, res) => {
    // console.log("params", req.query)
    connection.query("UPDATE livres SET idAdherent='0' WHERE id = ?", [req.query.idBook], (error, results, fields) => {
        if (error) throw error
        // console.log("result update", results.message)
        res.redirect('/account')
    })

})

//////////////////////////////////////////////////////////////////

/**
 * ecoute sur port 6060
 */
app.listen(6060)