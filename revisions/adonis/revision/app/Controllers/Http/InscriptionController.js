'use strict'

class InscriptionController {
    index = ({ request, view }) => {
        const ALL = request.all()
        console.log("inscription controller", ALL)
        
        return view.render("inscription")
      }
}

module.exports = InscriptionController
