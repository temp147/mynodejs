/**
 * Created by root on 1/8/15.
 */
var assert = require('assert');
var timetrack = require('../model/base.js');


// not work yet~~
module.exports ={
    setup: timetrack.delAllWork(),
    tearDown: timetrack.delAllWork(),

    'timeTrack add work ': function(test){
        timetrack.addWork(1,'2014-01-01',1,function(err){});
        test.equal(timetrack.countWork(function(err,rows){ return rows[0].counts}),1);
        test.done();
    }
/*
    'timeTrack add work': function(test){
        todo.add('Delete Me');
        test.equal(todo.getCount(),2);
        todo.deleteAll();
        test.equal(todo.getCount(),0);
        test.done();
    }
*/
}