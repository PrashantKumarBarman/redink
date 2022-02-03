const { body, validationResult } = require('express-validator');
let postModel = require('../models/post');
let authorModel = require('../models/author');
let mailer = require('../lib/mail');

module.exports = {
    /**
     * Adds a new post
     * @param {Object} req 
     * @param {Object} res 
     */
    addPost: async function(req, res) {
        try {
            let errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.status(400).json(errors);
                return;
            }
            // Adding new post
            let postId = await postModel.add(req.body);
            if(postId) {
                res.status(200).json({ id: postId });

                let authors = await authorModel.getAll();
                // Sending mail notification to all other authors
                let mailContent = `
                <h3>New post created<h3>
                <h3>From - ${req.body.author}</h3>
                <h2>${req.body.title}</h2>
                <p>${req.body.description}</p>
                <p>`;
                authors.forEach((author) => {
                    mailer.sendMail(mailContent, author.email, 'html');
                });
                
                // Inserting the author of new post if not exists already
                await authorModel.add({ email: req.body.author });
            }
            else {
                res.sendStatus(400);
            }
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    /**
     * Updates a post
     * @param {Object} req 
     * @param {Object} res 
     */
    updatePost: async function(req, res) {
        try {
            let errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.status(400).json(errors);
                return;
            }
            let updateObject = {};
            let columns = ['title', 'description', 'author'];
            for(let field in req.body) {
                if(columns.includes(field)) {
                    updateObject[field] = req.body[field];
                }
            }
            await postModel.updateById(updateObject, req.params.id);
            res.sendStatus(200);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    /**
     * Fetch all posts
     * @param {Object} req 
     * @param {Object} res 
     */
    getAllPosts: async function(req, res) {
        try {
            let posts = await postModel.getAll();
            res.status(200).json(posts);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    /**
     * Fetch all posts for an author
     * @param {Object} req 
     * @param {Object} res 
     */
    getPostsByAuthor: async function(req, res) {
        try {
            let posts = await postModel.getByAuthor(req.params.author);
            console.log(posts);
            res.status(200).json(posts);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    /**
     * Deletes a post
     * @param {Object} req 
     * @param {Object} res 
     */
    deletePost: async function(req, res) {
        try {
            await postModel.deleteById(req.params.id);
            res.sendStatus(200);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    /**
     * Validates a post when adding a new post
     * @returns {Array<Object>} Returns an array of middlewares for the post fields
     */
    addPostValidator: function() {
        return [
            body('title', 'title is required, can be of maximum 1000 characters').isLength({ min: 1, max: 1000 }),
            body('description', 'description is required, can be of maximum 10000 characters').isLength({ min: 1, max: 10000 }),
            body('author', 'author is required and have to be a valid email and can be of maximum 100 characters').isEmail().isLength({ min: 1, max: 100 })
        ];
    },
    /**
     * Validates a post when updating
     * @returns {Array<Object>} Returns an array of middlewares for the post fields
     */
    updatePostValidator: function() {
        return [
            body('title', 'title is required, can be of maximum 1000 characters').optional().isLength({ min: 1, max: 1000 }),
            body('description', 'description is required, can be of maximum 10000 characters').optional().isLength({ min: 1, max: 10000 }),
            body('author', 'author is required and have to be a valid email and can be of maximum 100 characters').optional().isEmail().isLength({ min: 1, max: 100 })
        ];
    }
};