let express = require('express');
let router = express.Router();
let postController = require('../controllers/post');

/** Gets all the posts by an author */
router.get('/author/:author', postController.getPostsByAuthor);

/** Gets all posts */
router.get('/', postController.getAllPosts);

/** Creates a new post */
router.post('/', postController.addPostValidator(), postController.addPost);

/** Updates a post by id */
router.put('/:id', postController.updatePostValidator(), postController.updatePost);

/** Delets a post by id */
router.delete('/:id', postController.deletePost);

module.exports = router; 