'use strict'

const Bibliothecaire = use("App/Models/Bibliothecaire")

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
      await biblio.save() // pas moyen de récupérer le résultat de l'enrengistrement ? (pour l'id)
      const newBiblio = await Bibliothecaire.findBy('login', biblio.login)
      console.log("new biblio", newBiblio.toJSON())
      session.put('idBiblio', newBiblio.id)

    } catch (error) {
      console.log("error record biblio", error)
    }
    // affichage de la page account
    return response.redirect('/account')
  }
}

module.exports = BiblioController
