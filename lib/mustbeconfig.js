/**
 * Created by root on 1/17/15.
 */

module.exports = function(config) {

    config.routeHelpers(function (rh) {
        rh.getUser(function(req, cb){
            //console.log(req.user);
            cb(null, req.user);
        });

        rh.notAuthorized(function (req, res, next) {
            res.status(403).send("not authorized");
        });

        rh.notAuthenticated(function (req, res, next) {
            res.status(401).send("not authenticated")
        });
    });

    config.userIdentity(function(id){

        // determine if this user is authenticated or not
        id.isAuthenticated(function(user, cb){
            // note that the "user" in this case, is the user
            // that was supplied by the routeHelpers.getUser function
            var isAuthenticated = false;
            if (user) {
                isAuthenticated = user; //user.isLogin()
            }
            cb(null, isAuthenticated);
        });

    });



    config.activities(function(activities){
        activities.can("users.view", function(identity, params, cb){
            // normally, you would make calls to your database and
            // check if the logged in person is allowed to see the
            // user list, or something like that. but for this
            // hard coded demo app, anyone can view the user list,
            // if they are logged in
            identity.isAuthenticated(function(err, isAuth){
                return cb(err, isAuth);
            });
        });
    })


};

//TODO: complete the authorization frame work(mustdo)