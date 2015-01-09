/**
 * Created by root on 1/6/15.
 */


var timetrack = require('./routes/timetrack');


module.exports = function(app){

//timetrak restful api,
    app.post('/timetrack',timetrack.add);
    app.get('/timetrack/:id',timetrack.show);
};