const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const PostController = require('../controllers/posts');

let documentCount = 1;

// router.post('/api/posts', checkAuth, (req, res, next) => {
//     const post = new Post({
//       title: req.body.title,
//       content: req.body.content
//     });
//     post.save().then(createdPost => {
//       res.status(201).json({
//         message: 'Post added successufully',
//         postId: createdPost._id
//       }); //everything is OK resource was created, thereby preventing timeout! 
//     });
//   });

router.post('/api/posts/', checkAuth, extractFile, PostController.createPost);

router.put('/api/posts/:id', checkAuth, extractFile, PostController.updatePost);

router.get('/api/posts', PostController.getPosts);

router.get('/api/edit/:id', checkAuth, PostController.getPost);

router.delete('/api/posts/:id', checkAuth, PostController.deletePost);

module.exports = router;


