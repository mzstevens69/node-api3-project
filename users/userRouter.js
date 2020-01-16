const express = require('express');

const router = express.Router();

const Posts = require("../posts/postDb")
const Usrs = require("./userDb");
//POST add new Users
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
// POST add new Posts
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const pstId = req.body;
  Posts.insert(pstId)
    .then(addPost => {
      res.status(201).json(addPost)
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the comment to the databse."
      })
    })
});
// GET array of users
router.get('/', (req, res) => {
  // do your magic!
  Usrs.get(req.query)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        error: "Could not retrieve the users"
      })
    })

});
//GET user by id
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
const id = req.params.id
Usrs.findById(id)
  .then(useId => {
    if(useId) {
      res.status(201).json(useId);
    } else {
      res.status(404).json({
        message: "The ID of the user cannot be found."
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "error retrieving the ID of the User"
    })
  })

});
//GET posts by user id
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Usrs.getUserPosts(id)
    .then(userPost => {
      res.status(201).json(userPost)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There has been an error getting the posts for the User."
      })
    })
});
//Remove a user by id
router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  Usrs.remove(id)
    .then(vaporize => {
      if(vaporize) 
        res.status(200).json(vaporize)
      else 
      res.status(404).json({ message: 'The User could not be found' });

    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Error removing the User"
      })
    })
});
//Edit a user by id
router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  const user = req.body
  Usrs.update(id, user)
    .then(urId => {
      if(urId)
        res.status(200).json(urId);
      else
        res.status(404).json({
          message: "The User could not be found"
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Error updating the hub"
      })
    })
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
