
var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
module.exports = router;

router.get('/',function(req,res){
    //index page
    console.log("user:")
    console.log(req.session.user);
    
    Movie.fetch(function(err,movies){
        if(err){
            if(err){
                console.log(err);
            }
        }
        res.render('index',{
        title:'imove 首页',
        movies:movies
        });
    });
});
