/**
 * Created by root on 1/8/15.
 * config file for application
 */

var mysqlhost = '127.0.0.1',
    mysqluser = 'root',
    mysqlpassword = 'zaq1xsw@',
    mysqldbname ='test',
    mysqlport = '3306',
    jwtsecret = 'this is the secret secret secret 12356';

var config ={
    mysqlhost:  mysqlhost,
    mysqluser:  mysqluser,
    mysqlpassword:  mysqlpassword,
    mysqldbname:    mysqldbname,
    mysqlport:  mysqlport,
    jwtsecret:  jwtsecret
};

module.exports =config;



