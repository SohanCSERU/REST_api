const express = require('express');
const router = express.Router();
const Post  = require('../models/Post');

//Get back All the post 
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
    // res.send('We are @t post router');
});

router.get('/blog',(req,res) => {
    res.send('Here is our blog post route');
});


// Submit A post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
        // imdb: req.body.imdb
    });

    const savePost = await post.save();
    try{
        res.json(savePost);
    }catch(err){
        res.json({message: err});
    }

    console.log(req.body);
});


//Get A Specific Post
router.get('/:postID', async(req, res) => {
    try{
        const post =  await Post.findById(req.params.postID);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }

    console.log(req.params.postID);
});


//Delete a Post
router.delete('/:postId', async(req,res) =>{
    const idOfPost = req.params.postId;
    try{
        const removePost = await Post.findByIdAndRemove({_id:idOfPost});
        res.json(removePost);
    }catch(err){
        res.json({message: err});
    }
});


//Update a Post

router.patch('/:postId', async(req,res) =>{
    const idOfPost = req.params.postId;
    try{
        const updatePost = await Post.updateOne({_id: idOfPost},
            {$set:{title: req.body.title} }
        ); 
        res.json(updatePost);
    }catch(err){
        res.json({message: err});
    }

});

module.exports = router;