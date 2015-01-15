/**
 * Created by root on 1/6/15.
 */


var superagent = require('superagent');
var expect = require('expect.js');

describe('authenticate api test',function(){
    var token;

    it('login&createToken', function(done){
        superagent.post('http://localhost:3000/login/')
            .send({
                username:'john',
                password:'foobar'
            })
            .end(function(err,res){
                expect(err).to.eql(null);
                expect(typeof res.body).to.eql('object');
                //console.log(res.body.token.toString().length,res.body);
                expect(res.body.token.toString().length).to.eql(200);
                token=res.body.token;
                done();
            })
    });

    it('test jwt token',function(done){
        superagent.get('http://localhost:3000/app/restricted/')
            .set({'authorization': 'Bearer '+token})
            .end(function(err,res){
//                console.log(res);
                expect(err).to.equal(null);
                expect(res.status).to.eql('200');
                done();
            })
    });


    it('add a work with jwt', function(done){
        superagent.post('http://localhost:3000/app/timetrack/')
            .send({ hours: '1'
                , workdate: '2014-01-01'
                , description: '1'
            })
            .set({'authorization': 'Bearer '+token})
            .end(function(err, res){
//                console.log(res.text,res.text.length);
                expect(err).to.eql(null);
                expect(res.text.length).to.eql(13);
                done();
            })
    });

    it('retrieves an work with jwt', function(done){
        superagent.get('http://localhost:3000/app/timetrack/1')
            .set({'authorization': 'Bearer '+token})
            .end(function(err, res){
                // console.log(res.body)
                expect(err).to.eql(null);
                expect(typeof res.body).to.eql('object');
                //console.log(res.text);
                expect(res.text.length).to.eql(83);
                expect(res.text).to.eql('{"id":1,"hours":1,"date":"2013-12-31T16:00:00.000Z","archived":0,"description":"1"}');
                done();
            })
    });

    it('get 401 with wrong jwt', function(done){
        superagent.get('http://localhost:3000/app/timetrack/1')
            .set({'authorization': 'Bearer '+'wrongtoken'})
            .end(function(err, res){
                // console.log(res.body)
                expect(err).to.eql(null);
                expect(typeof res.body).to.eql('object');
                //console.log(res.text);
                expect(res.statusCode).to.eql('401');
                done();
            })
    });

});


describe('timetrack api test ', function(){

    it('add a work', function(done){
        superagent.post('http://localhost:3000/api/timetrack/')
            .send({ hours: '1'
                , workdate: '2014-01-01'
                , description: '1'
            })
            .end(function(err, res){
//                console.log(res.text,res.text.length);
                expect(err).to.eql(null);
                expect(res.text.length).to.eql(13);
                done();
            })
    });

    it('retrieves an work', function(done){
        superagent.get('http://localhost:3000/api/timetrack/1')
            .end(function(err, res){
                // console.log(res.body)
                expect(err).to.eql(null);
                expect(typeof res.body).to.eql('object');
                //console.log(res.text);
                expect(res.text.length).to.eql(83);
                expect(res.text).to.eql('{"id":1,"hours":1,"date":"2013-12-31T16:00:00.000Z","archived":0,"description":"1"}');
                done();
            })
    });

});
//TODO: add schedule test function
/*
    it('retrieves an object', function(done){
        superagent.get('http://localhost:3000/collections/test/'+id)
            .end(function(e, res){
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id.length).to.eql(24);
                expect(res.body._id).to.eql(id);
                done();
            })
    });

    it('retrieves a collection', function(done){
        superagent.get('http://localhost:3000/collections/test')
            .end(function(e, res){
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(res.body.length).to.be.above(0);
                expect(res.body.map(function (item){return item._id})).to.contain(id);
                done();
            })
    });

    it('updates an object', function(done){
        superagent.put('http://localhost:3000/collections/test/'+id)
            .send({name: 'Peter'
                , email: 'peter@yahoo.com'})
            .end(function(e, res){
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body.msg).to.eql('success');
                done();
            })
    });

    it('checks an updated object', function(done){
        superagent.get('http://localhost:3000/collections/test/'+id)
            .end(function(e, res){
                // console.log(res.body)
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body._id.length).to.eql(24)
                expect(res.body._id).to.eql(id)
                expect(res.body.name).to.eql('Peter')
                done()
            })
    })
    it('removes an object', function(done){
        superagent.del('http://localhost:3000/collections/test/'+id)
            .end(function(e, res){
                // console.log(res.body)
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
    })
*/



