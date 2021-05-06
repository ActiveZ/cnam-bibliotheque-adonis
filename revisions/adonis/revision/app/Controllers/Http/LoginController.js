'use strict'

class LoginController {
    index = ({ request, view }) => {
        const ALL = request.all()
        console.log("login controller", ALL)
        
        return view.render("login")
      }
}

module.exports = LoginController
