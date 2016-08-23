var mongoose = require('mongoose');
var crypto = require('crypto');


var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:{
        unique:true,
        type:String
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre('save',function(next){
    var user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else{
        this.meta.updateAt = Date.now();
    }
    var hash = crypto.createHash('sha256');
    var password = hash.update(user.password).digest('hex');
    user.password = password;
    next();
});
//实例方法
UserSchema.methods = {
    comparePassword:function(_password,cb){
        var user = this;
        var password = crypto.createHash('sha256').update(_password).digest('hex');
        if(user.password != password){
            return cb({error:'密码错误'});
        }
        cb(null,true);
    }
};




//模型方法
UserSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

module.exports = UserSchema;