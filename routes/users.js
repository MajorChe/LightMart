/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const productFns = require('../db/uQueries');


module.exports = (db) => {

  router.get('/myfavourites', (req, res) => {
    const session_id = req.session.id;
    if(!session_id) {
      res.redirect("/")
    } else {
    productFns.getUsersFavourites(req.session.id)
      .then((data) => {
        let favourites = data
        const user = req.session.id
        const templateVars = { favourites, user }
        res.render("favourites", templateVars);
      });
    }
  });


  router.get('/mypostings/', (req, res) => {
    let sold = []
    let postings = []
    const user = req.session.id
    productFns.getUsersProducts(req.session.id)
      .then((data) => {
        console.log("is",data)
        if(data.length === 0){
          postings.push(1);
        }

        for(let i of data){
          if (i.is_sold === false) {
            postings.push(i)

          }
        }
         for(let i of data){
           if (i.is_sold === true) {
             sold.push(i)
           }
      }
      const templateVars = { postings, user, sold }
      res.render("mypostings", templateVars)
      })
  })

  router.post('/:id', (req, res) => {
    productFns.markAsSold(req.session.id,req.params.id )
      .then((data) => {
        res.redirect(`/users/mypostings`);
      });
  });

  router.post('/delete/:id', (req, res) => {
    productFns.deleteUsersProduct(req.session.id,req.params.id )
      .then((data) => {
        res.redirect(`/users/mypostings`);
      });
  });

  return router;
};
