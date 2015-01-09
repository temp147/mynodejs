/**
 * Created by root on 1/6/15.
 */


var timetrack = require('./routes/timetrack');
var authenticate = require('./routes/authenticate');


module.exports = function(app){

//timetrak restful api,
    app.post('/api/timetrack',timetrack.add);
    app.get('/api/timetrack/:id',timetrack.show);

// authenticate restful api,
    app.post('/authenticate/',authenticate.auth);
};