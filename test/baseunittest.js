/**
 * Created by root on 1/8/15.
 */
var timetrack = require('../model/base.js');
var expect = require('expect.js');

// TODO:add all unit test function~~
describe('unit test work',function(){
    //delete all work and add one work.
    before(function(done) {
        timetrack.delAllWork();
        timetrack.addWork(1,'2014-01-01',1,function(err){
            done();
        });
    });

    //verify if work is added successfully.
    it('add work(should have one work)',function(done){
        timetrack.countWork(function(err,rows){
            expect(err).to.equal(null);
            //console.log(rows);
            expect(rows[0].counts).to.equal(1);
            done();
        });
    });

    after(function(done){
        timetrack.delAllWork();
        done();
    })
});

