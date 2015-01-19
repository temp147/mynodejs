/**
 * Created by root on 1/13/15.
 */

var schedule = require('../model/schedules.js');

exports.showall = function(req,res){
//    console.log(req);
//    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    schedule.getAllSchedule(function(err,rows){
        if(err) throw err;
        res.json(rows);
    });
    //res.json([{_id:"54b472daac119c8110931a65",employeeName:"test1",mobilePhone:"12345678901",__v:0,"Tasks":[]}]);
};

exports.showbyID = function(req,res){
//    console.log(req);
//    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    schedule.getSchedulebyID(req.params.id,function(err,rows){
        if(err) throw err;
        //console.log(rows[0]);
        res.json(rows[0]);
    });
    //res.json({_id:"54b472daac119c8110931a65",employeeName:"test1",mobilePhone:"12345678901",__v:0,"Tasks":[]});
};

exports.add = function(req,res){
//    console.log(req);
//    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    schedule.addSchedule(req.body.employeeName,req.body.mobilePhone,function(err){
        if(err) throw err;
        res.send('');
    });
    //res.send('');
};

exports.deletebyID = function(req,res){
//    console.log(req);
//    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    schedule.delSchedulesbyID(req.params.id,function(err){
        if(err) throw err;
        schedule.getAllSchedule(function(err,rows){
            if(err) throw err;
            res.json(rows);
        });
    });
    //res.send('end');
};

