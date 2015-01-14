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

