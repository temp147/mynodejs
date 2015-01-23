/**
 * Created by root on 1/5/15.
**/

var timetrack= require('../model/base.js');


exports.add = function(req,res){
    var hours =req.body.hours;
    var workdate = req.body.workdate;
    var description = req.body.description;
    //console.log(hours,workdate,description);
    timetrack.addWork(hours,workdate,description,function(err){
        if(err) throw  err;
        res.send('{msg:success}');
    })

};

exports.show = function(req,res,next){
    var id = req.params.id;
    //console.log(id);
    timetrack.getWorkbyID(id,function(err,rows){
        if(err) {
            //res.status(501).send('{msg:some error have happened}');
            err.status=501;
            err.message="{msg:some error have happened}";
            next(err);

            //throw err;
        }
        //console.log(rows[0]);
        else{
            res.send(rows[0]);
        }
    })
};


exports.delete = function(db,req,res){
    exports.parseReceiveData(req,function(work){
        db.query(
            "delete from work where id=?",
            [work.id],
            function(err){
                if (err) throw err;
                exports.show(db,res);
            }
        )
    })
};

exports.archive = function(db,req,res){
    exports.parseReceiveData(req,function(work){
        db.query(
            "update work set archived=1 where id=?",
            [work.id],
            function(err){
                if(err)throw err;
                exports.show(db,res);
            }
        )
    })
};



exports.showArchived = function(db,res){
    exports.show(db,res,true);
};

