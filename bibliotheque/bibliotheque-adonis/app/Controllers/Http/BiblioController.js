'use strict'

const Bibliothecaire = use("App/Models/Bibliothecaire")
const Database = use('Database') // pour methode avec QueryBuilder
class BiblioController {
  //////////////////////////// PAGE NOUVEAU BIBLIOTHECAIRE //////////////////////////////////////

  index = ({
    request,
    response,
    view
  }) => {
    return view.render('inscription')
  }

  async inscription({
    request,
    response,
    session,
    view
  }) {
    const post = request.body

    // enregistrement du nouveau bibliothécaire dans la db
    const biblio = new Bibliothecaire()
    try {
      biblio.nom = post.nom
      biblio.prenom = post.prenom
      biblio.login = post.login
      biblio.password = post.password
      // await biblio.save() // ne permet pas de récupérer l'id de l'enregistrement
      // méthode avec QueryBuilder pour récupérer l'id de l'enregistrement
      const newId = await Database
      .table('bibliothecaires')
      .insert({
        nom:biblio.nom,
        prenom:biblio.prenom,
        login:biblio.login,
        password:biblio.password,
        })
      session.put('idBiblio', newId)
    } catch (error) {
      console.log("error record biblio", error)
    }
    // affichage de la page account
    return response.redirect('/account')
  }
}

module.exports = BiblioController
