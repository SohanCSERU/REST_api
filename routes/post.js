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

router.get('/:postID', async(req, res) => {
    try{
        const post =  await Post.findById(req.params.postID);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
    
    console.log(req.params.postID);
});


module.exports = router;