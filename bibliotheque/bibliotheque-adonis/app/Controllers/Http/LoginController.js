'use strict'

const Livre = use("App/Models/Livre")
const Adherent = use("App/Models/Adherent")
const Bibliothecaire = use("App/Models/Bibliothecaire")

class LoginController {

  index = async ({request, response, view}) => {
    console.log("login controller")
    return view.render('login')
  }


  login = async ({request, response, session, view}) => {
    const post = request.body
    if (post.login === "" || post.password === "") { // TODO check password
      response.render('login', {
        error: "mot de passe ou pseudo vide"
      })
    } else {
    const biblio = await Bibliothecaire.findBy('login', post.login)
    if (biblio) {
      session.put('idBiblio', biblio.id)
      return response.redirect('/account')
    }
    else return view.render('login', {error: "mot de passe ou pseudo erroné"})
    }
  }


  // page account
  account = async ({request, response, session, view}) => {
    console.log("id biblio", session.get("idBiblio"))
    const biblio = await Bibliothecaire.find(session.get("idBiblio",1))
    const books = await Livre.all()
    const adherents = await Adherent.all()
    return view.render('account', {biblio: biblio.toJSON(), books: books.toJSON(), adherents: adherents.toJSON()})
  }

  // page logout
  logout = ({request, response, session, view}) => {
    session.clear()
    return response.redirect('/')
  }
}

module.exports = LoginController
