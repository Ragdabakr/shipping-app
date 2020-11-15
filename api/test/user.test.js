import * as chai from 'chai';
let assert = chai.assert;
let should = chai.should;
let expect = chai.assert;
import request from 'supertest';
import app from '../server';
import moment from "moment";

describe('Get /user/list', function () {
    it('should return all users',  (done) => {
      request(app).get('/api/v1/user/list').expect(200).expect((res)=>{
         console.log("users>>>" , JSON.stringify(res.body));
      }).end(done);
    });
});

describe('Post /user/save', function () {
  const createdOn =  moment(new Date());
  it('should create new user',  (done) => {
    request(app).post('/api/v1/user/save').send({

      username:"ragdabakr11",
      fullName:"ragda bakr ahmed",
      email:"ragdabakr5778@gmail.com",
      password:"ragda123456",
      userTypeCode:"مستخدم",
      createdBy:"admin",
      createdOn:createdOn
    })
    .expect(201).expect((res)=>{
       console.log("users>>>" , JSON.stringify(res.body));
    }).end(done);
  });
});

describe('Post /user/update', function () {
  const createdOn =  moment(new Date());
  it('should update user',  (done) => {
    request(app).post('/api/v1/user/update').send({
      userId:"1",
      username:"ragda11111",
      fullName:"ragda bakr ahmed",
      email:"ragdabakr599@gmail.com",
      userTypeCode:"مستخدم",
      updatedBy:"admin",
      updatedOn:createdOn
    })
    .expect(201).expect((res)=>{
       console.log("user>>>" , JSON.stringify(res.body));
    }).end(done);
  });
});

describe('Post /user/disableEnable', function () {
  const createdOn =  moment(new Date());
  it('should enable & disable  user',  (done) => {
    request(app).post('/api/v1/user/enableDisableUser').send({
      userId:"1",
      active:"0",
      updatedBy:"admin",
      updatedOn:createdOn
    })
    .expect(201).expect((res)=>{
       console.log("user>>>" , JSON.stringify(res.body));
    }).end(done);
  });
});
