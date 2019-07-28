const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    const url = '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      creator: req.userData.userId
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: 'Post added successufully',
        // postId: createdPost._id
        post: {
          ...createdPost, // already available object extending some features to it
          id: createdPost._id
        }
      }); //everything is OK resource was created, thereby preventing timeout! 
    })
    .catch( error => {
      res.status(500).json({
        message: 'Creating a post failed!'
      });
    } );
  }

exports.updatePost = (res, req, next) => {
    let imagePath = res.body.imagePath;
    if (res.file) {
        const url = res.protocol + '://' + res.get('host');
        imagePath = url + '/images/' + res.file.filename;
    }

  const post = new Post({
    _id: res.body.id,
    title: res.body.title,
    content: res.body.content,
    imagePath: imagePath,
    creator: res.userData.userId
  });
  Post.updateOne({
    _id: res.params.id, creator: res.userData.userId
  }, post).then(result => {
    console.log(result);
    if (result.n > 0) {
      req.status(200).send({
        message: 'Update Successful!'
      });
    }
    else {
      req.status(401).send({
        message: 'Update Unsuccessful: Not Authorized!'
      });
    }
  })
  .catch( error => {
    req.status(500).json({
      message: 'Couldn\'t update post' 
    });
  });
}

exports.getPosts = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery =  Post.find();
    if (pageSize && currentPage) {
      postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
        Post.countDocuments({}, function(err, count){
          documentCount = + count;
        });
    }
    postQuery.then(documents => {
        res.status(200).json({
          pageLength: documentCount,
          message: 'Post fetched Successfully!',
          posts: documents
        });
      })
      .catch( error => {
        res.status(500).json({
          message: 'Fetching Posts Failed!'
        });
      });
  }

  exports.getPost = (res, req, next) => {
    Post.findById(res.params.id).then(post => {
      if (post) {
        req.status(200).json(post);
      } else {
        req.status(404).json({
          message: 'Post not found'
        });
      }
    })
    .catch( error => {
      res.status(500).json({
        message: 'Fetching Posts Failed!'
      });
    });
  }

  exports.deletePost = (req, res, next) => {
    Post.deleteOne({
      _id: req.params.id,
      creator: req.userData.userId
    }).then(result => {
      if (result.n > 0) {
        res.status(200).send({
          message: 'Post Deleted!'
        });
      }
      else {
        res.status(401).send({
          message: 'Delete Unsuccessful: Not Authorized!'
        });
      }
    })
    .catch( error => {
      res.status(500).json({
        message: 'Deleting Posts Failed!'
      });
    });
  }
