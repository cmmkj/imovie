

var express = require('express');
var Movie = require('../models/movie');
var router = express.Router();
var _ = require('underscore');
module.exports = router;


router.get('/movie/:id',function(req,res){
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
        console.log(movie);
        res.render('detail',{
            title:'imove:' + movie.title,
            movie:movie
        });
    });
});

router.get('/admin/movie',function(req,res){
    res.render('pages/admin',{
        title:'imove 后台录入页',
        movie:{
            title:'',
            doctor:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    });
});







router.get('/admin/update/:id',function(req,res){
    var id = req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'imove 后台更新页',
                movie:movie
            });
        });
    }
})

router.post('/admin/movie/new',function(req,res){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie ;
    if(id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie,movieObj);
            _movie.save(function(err,movie){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    }else{
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        });
        _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
});

router.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            if(err){
                console.log(err);
            }
        }
        res.render('list',{
        title:'imove 列表页',
        movies:movies
        });
    });
});



router.delete('/admin/list',function(req,res){
    var id = req.query.id;  //id是通过？传递过来的，所以用query
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        });
    }
});
