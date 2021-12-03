/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const productFns = require("../db/uQueries");
const userfn = require("../db/01_indexquery");
const timeago = require('timeago.js')

module.exports = (db) => {
  router.get("/myfavourites", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else {
      productFns.getUsersFavourites(req.session.id).then((data) => {
        let favourites = data;
        const user = req.session.id;
        const templateVars = { favourites, user, session_id};
        res.render("favourites", templateVars);
      });
    }
  });

  router.get("/mypostings/", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else {
      let sold = [];
      let postings = [];
      const user = req.session.id;
      productFns.getUsersProducts(req.session.id).then((data) => {
        //console.log("is", data);
        if (data.length === 0) {
          postings.push(1);
        }

        for (let i of data) {
          if (i.is_sold === false) {
            postings.push(i);
          }
        }
        for (let i of data) {
          if (i.is_sold === true) {
            sold.push(i);
          }
        }
        const templateVars = { postings, user, sold, session_id };
        res.render("mypostings", templateVars);
      });
    }
  });

  router.get("/new", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else {
      userfn.getUserbyid(req.session.id).then((user) => {
        const templateVars = { user, session_id };
        res.render("new", templateVars);
      });
    }
  });

  router.post("/new", (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    productFns.newProduct(title, price, description, image).then((res) => {
      console.log(res);
    });
    res.redirect("/users/mypostings");
  });


  router.post("/product/:id", (req, res) => {
    if (!req.session.id) {
      res.redirect("/");
    } else {
      productFns.markAsSold(req.session.id, req.params.id).then((data) => {
        res.redirect(`/users/mypostings`);
      });
    }
  });

  router.post("/delete/:id", (req, res) => {
    productFns
      .deleteUsersProduct(req.session.id, req.params.id)
      .then((data) => {
        res.redirect(`/users/mypostings`);
      });
  });

  router.get("/inbox", (req, res) => {
    console.log('id:', req.session.id)
    if (!req.session.id) {
      res.redirect("/");
    } else {
      productFns.getAllConversations(req.session.id)
      .then((data) => {
        const session_id = req.session.id;
        const messages = data.reverse();
        const templateVars = { messages, session_id };
        res.render('inbox', templateVars );
      });
    }
  });



  router.get("/message/:id", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else  {
       productFns.getUserMessages(req.params.id)
      .then((data) => {
          console.log(data.length)
          if(data.length === 0){
            const conversation_id = req.params.id
            console.log(conversation_id)
            const templateVars = {  session_id, conversation_id}

            res.render('blankMessage', templateVars )
          } else {
          const session_id = req.session.id;
          const messages = data;
          const templateVars = { messages, session_id};
          res.render('message', templateVars );
        }
      });
    }
  });



  router.post("/reply/:id", (req, res) => {
    const sender_id = req.session.id
    const conversation_id = req.params.id
    const message = req.body.message
    userfn.getUserbyid(req.session.id).then(result => {
      const sender_name = result.name;
      let chatID = req.params.id;
        productFns.addMessage(conversation_id, sender_id, sender_name, message)
        .then((data) => {
          console.log('params:',req.params, 'req.body:', req.body, 'session:', req.session.id)
          res.redirect(`/users/message/${chatID}`);
        });
    })

  });

  router.post("/contact/:id", (req, res) => {
    const buyer_id = req.session.id
    const product_id = req.params.id
    console.log("buyerid",buyer_id,"productid",product_id)
      productFns.newConversation(buyer_id, product_id)
      .then((data) => {
        console.log(data)
        let chatID = data[0].id
        res.redirect(`/users/message/${chatID}`);
      });

  });



  router.post("/add/:id", (req, res) => {
    productFns.addFavourite(req.session.id, req.params.id).then((data) => {
      res.redirect(`/users/myfavourites`);
    });
  });

  router.get("/:id", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else {
      productFns.getProductById(req.params.id).then((product) => {
        const templateVars = { product, session_id };
        res.render("product", templateVars);
      });
    }
  });
  return router;
};
