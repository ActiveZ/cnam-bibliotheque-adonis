'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')

Route.get('/','LoginController.index')
Route.post('/login', 'LoginController.login')
Route.post('/logout', 'LoginController.logout')


// Route.get('/biblio', 'BiblioController.index')
// ajout d'un bibliothécaire
Route.get('/inscription', 'BiblioController.index')
Route.post('/inscription', 'BiblioController.inscription')


// modifie le statut de l'adhérent inscrit <-> désinscrit
Route.get('/inscrit/:id', 'AdherentController.inscrit')

Route.get('/account', 'LoginController.account')

// supprime un livre
Route.get('/deleteBook/:idBook', 'BookController.delete')
// ajoute un livre
Route.post('/addBook', 'BookController.add')