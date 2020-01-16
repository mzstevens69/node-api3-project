const express = require('express');

const router = express.Router();

const Posts = require("../posts/postDb")
const Usrs = require("./userDb");
router.post('/', validateUser, (req, res) => {
  // do your magic!
  Usrs.insert(req.body)
    .then(addUser => {
      res.status(201).json(addUser)
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database."
      });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Posts.insert
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const usrId = req.params.id
  Usrs.getById(usrId)
    .then(valuser => {
      if (valuser) {
      req.user = valuser;
      next();
               
  } else {
      res.status(400).json(
        { message: "invalid user id" }
      )
  }
})
    .catch(error => {
      res.status(500).json({
        error: "There was an error with the database."
      })
    })
      
    

function validateUser(req, res, next) {
  // do your magic!
  const User = req.body;
  const { name } = User;
    if(User) {
      if(name) {
        next();
      } else {
        res.status(400).json({
          message: "missing required text field"
        });
      }
    } else {
      res.status(400).json({
        message: "missing user data"
      })
      }
    }
}

function validatePost(req, res, next) {
  // do your magic!
  const Post = req.body;
  const { text } = Post
  if (Post) {
    if (text) {
      next();
    } else {
      res.status(400).json({
        message: "missing required text field"});
      }
  } else {
      res.status(400).json({
        message: "missing post data"});
  } 
}

module.exports = router;
