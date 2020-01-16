const express = require('express');

const router = express.Router();
// GET a list of users
router.get('/', (req, res) => {
  // do your magic!
});
// GET users by Id
router.get('/:id', (req, res) => {
  // do your magic!
});
// Delete a User by id
router.delete('/:id', (req, res) => {
  // do your magic!
});
// EDIT a user
router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
