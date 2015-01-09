/**
 * Created by root on 1/9/15.
 * authetication function
 */
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var config = require('../lib/config.js');
var secret = config.jwtsecret;


exports.auth = function(req,res){
    //verify username and password
    if(!(req.body.username=='john' && req.body.password=='foobar')){
        res.status(401).send('{message:Wrong user or password}');
        return;
    }

    var profile ={
        first_name:'John',
        last_name:'Doe',
        email: 'John@test.com',
        id: 123
    };

    //sign token
    var token = jwt.sign(profile,secret,{expireInMinutes:60*5});
    res.json({token:token});
};