/**
 * Created by root on 1/6/15.
 */


var timetrack = require('./routes/timetrack');
var authenticate = require('./routes/authenticate');
var schedule = require('../routes/schedule');

//handle the http options method
function option (req,res){
    res.send('');
}


module.exports = function(app){

//timetrak restful api,
    app.post('/api/timetrack',timetrack.add);
    app.get('/api/timetrack/:id',timetrack.show);

// authenticate restful api,
//TODO: make option function more reusable.
    app.post('/login/',authenticate.auth);
    app.options('/login/',option);

//schedule restful api,
    app.options('/schedules',option);
    app.get('/schedules',schedule.showall);

    app.get('/schedules/:id',schedule.showbyID)



//jwt test api

    app.get('/app/restricted',function (req,res){
        console.log('user' + req.user.email+'is calling /api/restricted');
        res.json({
            name:'foo'
        })
    });

    app.post('/app/timetrack',timetrack.add);
    app.get('/app/timetrack/:id',timetrack.show);

//TODO: test multi JSON string
//TODO: add,del,option api function
//TODO: add PassPort function in the route.
//TODO: add an restful api using SOAP backend.

};