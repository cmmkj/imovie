var express = require('express');
var router = express.Router();
var User = require('../models/user');
module.exports = router;



//signup
router.post('/user/signup',function(req,res){
    var _user = req.body.user;
    User.find({name:_user.name},function(err,user){
        if(err){
            console.log(err);
        }
        if(user){
            return res.redirect('/login');
        }else{
            var user = new User(_user);
            user.save(function(err,user){
            if(err){
                console.log(err);
            }
            es.redirect('/');
    });
        }
    });
});

//logout
router.get('/logout',function(req,res){
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
});


//userlist page
router.get('/admin/userlist',function(req,res){
    User.fetch(function(err,users){
        if(err){
            if(err){
                console.log(err);
            }
        }
        res.render('userlist',{
        title:'imove 用户列表页',
        users:users
        });
    });
});

//login
router.post('/user/login',function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    console.log("+++++++++++");
    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup');
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){
                console.log('登陆成功');
                //保持会话机制
                req.session.user= user;
                return res.redirect('/');
            }else{
                console.log('Password is not matched');
                return res.redirect('/login');
            }
        })
    });
});

router.get('/login',function(req,res){
    res.render('login',{
        title:'登陆页面'
    });
});

router.get('/signup',function(req,res){
    res.render('signup',{
        title:'注册页面'
    });
});