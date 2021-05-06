'use strict'

const Livre = use("App/Models/Livre")
const Adherent = use("App/Models/Adherent")
const Bibliothecaire = use("App/Models/Bibliothecaire")

class BookController {

  // supprime un livre de la bibliotheque
  delete = async ({
    params,
    request,
    response,
    view
  }) => {
    const book = await Livre.find(params.idBook);
    await book.delete();
    return response.redirect('/account')
  }


  // ajout d'un livre
  add = async ({params, request, response, view}) => {
    const post = request.body
    console.log("add params", post.titre)

    const livre = new Livre()
    livre.titre = post.titre
    livre.auteur = post.auteur
    livre.isbn = post.isbn
    await livre.save()
    return response.redirect('/account')
  }
}

module.exports = BookController
