/**
 * Created by root on 1/8/15.
 *
 *Initial the database for application
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


//create table script

var createTableWork = "Create table if not exists work("
    +"id INT(10) not NULL AUTO_INCREMENT,"
    +"hours DECIMAL(5,2) DEFAULT 0,"
    +"date DATE,"
    +"archived int(1) DEFAULT 0,"
    +"description LONGTEXT,"
    +"PRIMARY KEY(id))";

var createTableUser = "Create table if not exists user("
    +"id INT(10) not NULL AUTO_INCREMENT,"
    +"firstname varchar(16),"
    +"lastname varchar(16),"
    +"password varchar(256),"
    +"email varchar(64),"
    +"PRIMARY KEY(id))";

var insertuser ="insert into user " +
    "(firstname,lastname,password,email)" +
    "values('john','Deo','foobar','John@test.com');";

//execute the create table script
mysqlpool.getConnection(function(err,conn){
    // connect error
    if(err){
        //log error
        console.log("mysqlpool==>"+err);
        return;
    }
    //begin transaction
    conn.query('BEGIN',function(err,rows){
        if(err){
            //log error
            console.log(err);
            conn.release();
            return;
        }
        async.series([
                function(cb){
                    conn.query(createTableWork,cb)
                },
                function(cb){
                    conn.query(createTableUser,cb)
                },
                function(cb){
                    conn.query(insertuser,cb)
                }
            ],
            function (err) {
                var sql;
                if(err){
                    sql ='ROLLBACK';
                    //log error
                    console.log(err);
                }
                else{
                    sql ='COMMIT';
                }
                conn.query(sql,conn.release());
            }
        );
    });
});
