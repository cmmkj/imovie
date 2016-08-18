var express = require('express');
var Movie = require('./models/movie');
var _ = require('underscore');
var path = require('path');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;    //process为全局变量
var app = express();
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:/imove');


app.set('views','./views');
app.set('view engine','jade');
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('imove started on 3000');

//index page
app.get('/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            if(err){
                console.log(err);
            }
        }
        res.render('pages/index',{
        title:'imove 首页',
        movies:movies
        });
    });
});

app.get('/movie/:id',function(req,res){
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
        console.log(movie);
        res.render('pages/detail',{
            title:'imove:' + movie.title,
            movie:movie
        });
    });
});

app.get('/admin/movie',function(req,res){
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

app.get('/admin/update/:id',function(req,res){
    var id = req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('pages/admin',{
                title:'imove 后台更新页',
                movie:movie
            });
        });
    }
})

app.post('/admin/movie/new',function(req,res){
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

app.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            if(err){
                console.log(err);
            }
        }
        res.render('pages/list',{
        title:'imove 列表页',
        movies:movies
        });
    });
});