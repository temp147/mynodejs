/**
 * Created by root on 1/13/15.
 */

var mysql = require('mysql');
var async = require('async');
var config = require('../lib/config');

//create mysql connection pool
var mysqlpool =  mysql.createPool({
    host:   config.mysqlhost,
    user:   config.mysqluser,
    password:   config.mysqlpassword,
    database:   config.mysqldbname,
    port:  config.mysqlport
});

function schedules(){
}

schedules.prototype.addSchedule = function(empname,mobile,cb){
    var query1 ="insert into schedule(employeeName,mobilePhone,__V, Tasks)" +
        "values(?,?,0,'[]')";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            //log err
            console.log(err);
            cb(err);
        }
        //start transaction
        conn.query('BEGIN',function(err) {
            if (err) {
                //log err
                console.log(err);
                conn.release();
                cb(err);
            }
            async.series([
                    function (cb) {
                        conn.query(query1
                            , [empname, mobile]
                            , cb)
                    }
                ],
                function (err) {
                    var sql;
                    if (err) {
                        sql = 'ROLLBACK';
                        //log error
                        console.log(err);
                    }
                    else {
                        sql = 'COMMIT';
                    }
                    conn.query(sql, conn.release());
                    cb(err)
                }
            )
        })
    })
};

schedules.prototype.getAllSchedule = function(cb){
    var query1 ="select * from schedule order by _id";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            console.log(err);
            cb(err,null);
        }
        conn.query(query1,function(err,rows){
            if(err){
                console.log(err);
                cb(err,null);
            }
            conn.release();
            cb(null,rows);
        })
    })
};

schedules.prototype.getSchedulebyID = function(id,cb){
    var query1 ="select * from schedule"+
        " where _id=?";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            console.log(err);
            cb(err,null);
        }
        conn.query(query1,[id],function(err,rows){
            if(err){
                console.log(err);
                cb(err,null);
            }
            conn.release();
            cb(null,rows);
        })
    })
};

schedules.prototype.delSchedulesbyID = function(id,cb){
    var query1="delete from schedule"+
        " where _id=?";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            //log err
            console.log(err);
            cb(err);
        }
        //start transaction
        conn.query('BEGIN',function(err) {
            if (err) {
                //log err
                console.log(err);
                conn.release();
                cb(err);
            }
            async.series([
                    function (cb) {
                        conn.query(query1
                            , [id]
                            , cb)
                    }
                ],
                function (err) {
                    var sql;
                    if (err) {
                        sql = 'ROLLBACK';
                        //log error
                        console.log(err);
                    }
                    else {
                        sql = 'COMMIT';
                    }
                    conn.query(sql, conn.release());
                    cb(err)
                }
            )
        })
    })
};




schedules.prototype.delAllSchedule = function(){
    var query1 ="truncate table schedule";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            console.log(err);
//            cb(err,null);
        }
        conn.query(query1,function(err){
            if(err){
                console.log(err);
//                cb(err,null);
            }
            conn.release();
//            cb(null,rows);
        })
    })
};

schedules.prototype.countSchedule = function(cb){
    var query1 ="select count(*) as counts from schedule";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            console.log(err);
            cb(err,null);
        }
        conn.query(query1,function(err,rows){
            if(err){
                console.log(err);
                cb(err,null);
            }
            conn.release();
            cb(null,rows);
        })
    })
};

module.exports = new schedules();
