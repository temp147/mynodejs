/**
 * Created by root on 1/8/15.
 * Include Entity
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

function timetrack(){
};

timetrack.prototype.addWork = function (hours, workdate, description, cb) {
    var query1="insert into work (hours, date, description)" +"values(?,?,?)";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            //log err
            console.log(err);
            cb(err);
        }
        //start transaction
        conn.query('BEGIN',function(err,rows) {
            if (err) {
                //log err
                console.log(err);
                conn.release();
                cb(err);
            }
            async.series([
                    function (cb) {
                        conn.query(query1
                            , [hours, workdate, description]
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

timetrack.prototype.getWorkbyID = function(id,cb){
    var query1 ="select * from work"+
        " where id=?";
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

timetrack.prototype.delWorkbyID = function(id,cb){
    var query1="delete from work"+
        " where id=?";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            //log err
            console.log(err);
            cb(err);
        }
        //start transaction
        conn.query('BEGIN',function(err,rows) {
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

timetrack.prototype.delAllWork = function(){
    var query1 ="truncate table work";
    mysqlpool.getConnection(function(err,conn){
        if(err){
            console.log(err);
//            cb(err,null);
        }
        conn.query(query1,function(err,rows){
            if(err){
                console.log(err);
//                cb(err,null);
            }
            conn.release();
//            cb(null,rows);
        })
    })
};

timetrack.prototype.countWork = function(cb){
    var query1 ="select count(*) as counts from work";
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


module.exports = new timetrack();
