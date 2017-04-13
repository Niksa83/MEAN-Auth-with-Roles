//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../app/models/user');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();         
        });     
    });

        // POST - create task test - missing 1 required field
  describe('/POST register', () => {
      it('it should NOT POST a user without email field', (done) => {
        let user = {
            password:'somepassword'
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('You must enter an email address');
              done();
            });
      }); 
        it('it should NOT POST a user with existing email', (done) => {
        let userOne = new User( { email : 'first@gmail.com', password : 'secret'});
        let userTwo= new User( { email : 'first@gmail.com', password : 'secrettwo'});
        userOne.save((err, user) => {});
        chai.request(server)
            .post('/api/auth/register')
            .send(userTwo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('That email address is already in use');
              done();
            });
        });
      it('it should POST a user ', (done) => {
        let user = {
            email : 'user@gmail.com',
            password : 'secret'
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                res.body.should.have.property('user');
                res.body.user.should.have.property('email').eql('user@gmail.com');
                res.body.user.should.have.property('role').eql('editor');
              done();
            });
      });
  });
   // end describe 

    describe('/POST/ login', () => { // GET TASK by ID
        it('it should NOT log in a non existing user', (done) => {
        let userOne = new User( { email : 'first@gmail.com', password : 'secret'});
        let userTwo= new User( { email : 'second@gmail.com', password : 'secret'});
        userOne.save((err, user) => {});
        chai.request(server)
            .post('/api/auth/login')
            .send(userTwo)
            .end((err, res) => {
                res.should.have.status(401);
              done();
            });

        });

        it('it should LOG IN a user by given credentials', (done) => {
        let user = new User( { email : 'user@gmail.com', password : 'secret'});
            user.save((err, user) => {
                    chai.request(server)
                    .post('/api/auth/login')
                    .send({ email : 'user@gmail.com', password : 'secret'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('token');
                        res.body.should.have.property('user');
                        res.body.user.should.have.property('email').eql('user@gmail.com');
              done();
                    });
            });
        });
    }); 

});