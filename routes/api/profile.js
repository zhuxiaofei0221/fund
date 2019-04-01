const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');

/** 
 * $route POST api/profile/add
 * desc 添加信息
 * access private
*/
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res) => {
    const profileField = {};
    profileField.type = req.body.type ? req.body.type : '';
    profileField.describe = req.body.describe ? req.body.describe : '';
    profileField.income = req.body.income ? req.body.income : '';
    profileField.expend = req.body.expend ? req.body.expend : '';
    profileField.cash = req.body.cash ? req.body.cash : '';
    profileField.remark = req.body.remark ? req.body.remark : '';
    new Profile(profileField).save().then(profile => {return res.status(200).json({code:1,data:profile,errMsg:''})});
});

/** 
 * $route GET api/profile
 * desc 查询所有信息
 * access private
*/
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.find()
        .then(profiles => {
            if(!profiles)return res.status(200).json({code:2,data:[],errMsg:'未查询到任何信息'})
            return res.status(200).json({code:1,data:profiles,errMsg:''});
        })
        .catch(err => res.status(400).json(err));
});

/** 
 * $route GET api/profile/:id
 * desc 查询单条信息
 * access private
*/
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findOne({_id:req.params.id})
            .then(profile => {
                if(!profile) return res.status(200).json({code:2,data:[],errMsg:'未查询到任何信息'});
                return res.status(200).json({code:1,data:[profile],errMsg:''});
            })
            .catch(err => res.status(400).json(err));
});

/**
 * $route POST api/profile/edit/:id
 * desc 修改数据
 * access private
 */
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    const profileField = {};
    profileField.type = req.body.type ? req.body.type : '';
    profileField.describe = req.body.describe ? req.body.describe : '';
    profileField.income = req.body.income ? req.body.income : '';
    profileField.expend = req.body.expend ? req.body.expend : '';
    profileField.cash = req.body.cash ? req.body.cash : '';
    profileField.remark = req.body.remark ? req.body.remark : '';
    Profile.findOneAndUpdate({_id:req.params.id},{$set:profileField},{new:true})
            .then(profile => {
                return res.status(200).json({code:1,data:profile,errMsg:''})
            })
            .catch(err => res.status(400).json(err));
});

/** 
 * $route delete api/profile/:id
 * desc 删除数据
 * access private
*/
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findOneAndRemove({_id:req.params.id}).then(profile => {
        profile.save().then(profile => {return res.status(200).json({code:1,data:profile,errMsg:''})})
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;