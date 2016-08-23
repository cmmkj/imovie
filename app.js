var express = require('express');
var logger = require('morgan');

//会话机制
var cookieParser = require('cookie-parser');
var session = require('express-session')
var mongoStore = require('connect-mongo')(session);
//



var path = require('path');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;    //process为全局变量
var app = express();
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:/imovie');


app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(logger('dev'));
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//会话机制
app.use(cookieParser());
app.use(session({
    secret:'imooc',
    resave: false,
    saveUninitialized: false,
    store:new mongoStore({
    //  mongooseConnection:mongoose.connection  //两个都可以
        url:'mongodb://localhost:/imovie'
    }),
    cookie:{maxAge:180*60*1000} //store保存时间
}));
//


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    mongoose.set('debug',true);
}


require('./routes/index')(app);

//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('imove started on 3000');







