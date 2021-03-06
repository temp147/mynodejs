/**
 * Created by root on 1/6/15.
 */


var timetrack = require('./routes/timetrack');
var authenticate = require('./routes/authenticate');
var schedule = require('./routes/schedule');

var mustBe = require("mustbe").routeHelpers();

//handle the http options method,response 204
function option (req,res){
    res.status(204);
    res.send('end');
}

module.exports = function(app){

//timetrak restful api,
    app.post('/api/timetrack',timetrack.add);
    //app.get('/api/timetrack/:id', mustBe.authorized("users.view", timetrack.show));
    app.get('/api/timetrack/:id',  timetrack.show);


// authenticate restful api,
    app.options('/login/',option);
    app.post('/login/',authenticate.auth);


//schedule restful api,
    app.options('/schedules',option);
    app.get('/schedules',schedule.showall);
    app.post('/schedules',schedule.add);

//schedule API by ID
    app.options('/schedules/:id',option);
    app.get('/schedules/:id',schedule.showbyID);
    app.delete('/schedules/:id',schedule.deletebyID);

//jwt test api

    app.get('/app/restricted',function (req,res){
        console.log('user' + req.user.email+'is calling /api/restricted');
        res.json({
            name:'foo'
        })
    });

    app.post('/app/timetrack',timetrack.add);
    app.get('/app/timetrack/:id',mustBe.authorized("users.view", timetrack.show));

//TODO: test multi JSON string
//TODO: put option api function
//TODO: add PassPort function in the route.
//TODO: add an restful api using SOAP backend.l
};