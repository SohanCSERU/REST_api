const express = require('express');
const router = express.Router();
const Post  = require('../models/Post');

//Get back All the post 
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find();

        var arr=[];
        for(let i = 0; i < posts.length; i++){
            arr.push({
                id: posts[i]._id,
                title: posts[i].title,
                description: posts[i].description
            });
        }
        res.json(arr);
        // console.log(posts.length);
    }catch(err){
        console.log(err);
        res.json({message: err});
    }
    // res.send('We are @t post router');
});

router.get('/blog',(req,res) => {
    res.send('Here is our blog post route');
});


// Submit A post
router.post('/', async (req, res) => {
 
    // console.log({savePost});
    try{
        const post = new Post({
            title: req.body.title,
            description: req.body.description
        });
        const savePost = await post.save();

        res.json({id: savePost._id});
    }catch(err){
        res.json({message: err.message});
    }

    // console.log(req.body);
});


//Get A Specific Post
router.get('/:postId', async(req, res) => {
    try{
        const post =  await Post.findById(req.params.postId);
        // const id = post._id;
        res.json({
            id: post._id,
            title: post.title
        });
    }catch(err){
        // console.log("hello");
        let regex = /^[0-9a-fA-F]{24}$/;
        if(regex.test(req.params.postId)) {
            res.json({message: err.message});
        }else{
            res.json({message: "Invalid ID"});
        }
    }

    // console.log(req.params.postId);
});


//Delete a Post
router.delete('/:postId', async(req,res) =>{
    const idOfPost = req.params.postId;
    try{
        const removePost = await Post.findByIdAndRemove({_id:idOfPost});
        // console.log({removePost});
        res.json({
            id: removePost._id,
            title: removePost.title
        });
    }catch(err){
        res.json({message: err});
    }
});


//Update a Post

router.patch('/:postId', async(req,res) =>{
    const idOfPost = req.params.postId;
    try{
        const updatePost = await Post.updateOne(
            {_id: idOfPost},
            {
                $set:{title: req.body.title}
            }
        ); 
        res.json({id: updatePost._id, title: updatePost.title});
    }catch(err){
        res.json({message: err});
    }

});

module.exports = router;