'use strict'

class UserController {
  index = ({request,view}) => {
    const ALL = request.all()
    console.log("user controller", ALL)
    return view.render("user")
  }
}

module.exports = UserController
