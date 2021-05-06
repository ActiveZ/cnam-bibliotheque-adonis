'use strict'

const Livre = use("App/Models/Livre")
const Adherent = use("App/Models/Adherent")
const Bibliothecaire = use("App/Models/Bibliothecaire")

class AdherentController {
    inscrit = async ({
        params,
        request,
        response,
        session,
        view
      }) => {
        const adherent = await Adherent.find(params.id)
        adherent.inscrit = adherent.inscrit == 0 ? 1 : 0
        console.log("adherent update", adherent.toJSON())
        await adherent.save()
        return response.redirect('/account')
      }
}

module.exports = AdherentController
