const express = require('express');
const router = express.Router();
const Post  = require('../models/Post');

router.get('/', (req, res) => {
    res.send('We are @t post router');
});

router.get('/blog',(req,res) => {
    res.send('Here is our blog post route');
});

router.post('/', (req, res) => {
    const post =new Post({
        title: req.body.title,
        description: req.body.description
        // imdb: req.body.imdb
    });

    post.save()
    .then(data => res.json(data))
    .catch(err =>{
        res.json({message: err});
    });

    console.log(req.body);
});

module.exports = router;