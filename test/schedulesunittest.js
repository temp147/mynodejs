/**
 * Created by root on 1/15/15.
 */

var schedules = require('../model/schedules.js');
var expect = require('expect.js');

// TODO:add all unit test function~~
describe('unit test Schedule ',function(){
    //delete all Schedule and add one work.
    before(function(done) {
        schedules.delAllSchedule();
       done();
    });

    //verify if Schedule is added successfully.
    it('add Schedule(should have one work)',function(done){
        schedules.addSchedule('test1','12345678901',function(err){
            if(err){
                console.log(err);
            }
            schedules.countSchedule(function(err,rows){
                expect(err).to.equal(null);
                //console.log(rows);
                expect(rows[0].counts).to.equal(1);
                done();
            });
        });

    });

    it('get Schedule(should get one work)',function(done){
        schedules.getSchedulebyID('1',function(err,rows){
            expect(err).to.equal(null);
           // console.log(rows);
            expect(rows[0]._id).to.equal(1);
            done();
        })
    });

    it('del schedule',function(done){
       schedules.delSchedulesbyID('1',function(err){
           schedules.countSchedule(function(err,rows){
               expect(err).to.equal(null);
               //console.log(rows);
               expect(rows[0].counts).to.equal(0);
               done();
           })
       })
    });
    after(function(done){
        schedules.delAllSchedule();
        done();
    })
});

