/**
 * Created by root on 1/13/15.
 */

exports.showall = function(req,res){
//    console.log(req);
//    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json([{_id:"54b472daac119c8110931a65",employeeName:"test1",mobilePhone:"12345678901",__v:0,"Tasks":[]}]);
};

exports.showbyID = function(req,res){
//    console.log(req);
//    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json({_id:"54b472daac119c8110931a65",employeeName:"test1",mobilePhone:"12345678901",__v:0,"Tasks":[]});
};

exports.add = function(req,res){
//    console.log(req);
//    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send('');
};

exports.deletebyID = function(req,res){
//    console.log(req);
//    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(204);
    res.send('end');
};

