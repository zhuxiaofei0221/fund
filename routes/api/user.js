const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const passport = require('passport');
const User = require('../../models/User');
const tokenName = require('../../config/config').tokenName;
/** 
 * $route POST api/user/register
 * desc 注册接口
 * access public
*/
router.post('/register',(req,res) => {
    User.findOne({email:req.body.email})
        .then(user => {
            if(user){
                return res.status(200).json({code:2,data:[],errMsg:'邮箱已经存在'});
            }else{
                const avatar = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    password2: req.body.password2,
                    identity: req.body.identity,
                    avatar
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                                .then(user => {return res.status(200).json({code:1,data:user,errMsg:''})})
                                .catch(err => console.log(err))
                    });
                });
            };
        });
});

/**
 * $route POST api/user/login
 * desc 登录接口，返回token
 * access public
 */
router.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password
    User.findOne({email})
        .then(user => {
            if(!user){return res.status(200).json({code:2,data:[],errMsg:'用户名不存在'})};
            //匹配密码
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) console.log(err);
                //返回token
                if(result){
                    const rule = {id:user.id,email:user.email,identity:user.identity,name:user.name,avatar:user.avatar};
                    jwt.sign(rule,tokenName,{expiresIn:'1d'},(err,token) => {
                        if(err) throw err;
                        return res.status(200).json({
                            code: 1,
                            errMsg: '',
                            data:{access_token: 'Bearer ' + token}
                        });
                    });
                }else{
                    return res.status(200).json({code:2,data:[],errMsg:'密码错误'});
                };
            });
        })
});

/**
 * $route GET api/user/test
 * desc  获取信息
 * access private
 */
router.get('/test',passport.authenticate('jwt',{session:false}),(req,res) => {
    return res.status(200).json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity,
        avatar:req.user.avatar
    })
});


module.exports = router;