/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Users,Friendships,Lessons, conn } = require('../../src/db.js');

const agent = session(app);
const joe = {
  name: 'Joe',
};
const mark = {
  name: 'mark',
};const jody = {
  name: 'jody',
};const rachel = {
  name: 'rachel',
};
const friendship1={person1Id:1,person2Id:2}
const friendship2={person1Id:3,person2Id:1}
const friendship3={person1Id:4,person2Id:1}

const rachelMaths={name:'Maths',personId:1}
const rachelSpanish={name:'Spanish',personId:1}
describe('Routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Users.sync({ force: true })
    .then(() => Users.create(joe))
    )    
  describe('GET /users', () => {
    it('should get all users', () =>
      agent.get('/users').expect(200)
    );
  });
  beforeEach(() => Users.sync({ force: true })
  .then(() => Friendships.sync({ force: true }))
    .then(() => Users.create(joe))
    .then(() => Users.create(mark))
    .then(() => Users.create(jody))
    .then(() => Users.create(rachel))
    .then(() => Friendships.create(friendship1))
    .then(() => Friendships.create(friendship2))
    .then(() => Friendships.create(friendship3))
    )    
  describe('GET /friendships', () => {
    it('should get all friendships', () =>
      agent.get('/friendships').expect(200)
    );
  });

  
  beforeEach(() => Users.sync({ force: true })
  .then(() => Lessons.sync({ force: true }))
  .then(() => Users.create(rachel))
  .then(() => Lessons.create(rachelMaths))
  .then(() => Lessons.create(rachelMaths))
    .then(() => Lessons.create(rachelMaths))
    .then(() => Lessons.create(rachelSpanish))
    .then(() => Lessons.create(rachelSpanish))
    )    
    describe('GET /users/1/lessons', () => {
      it('should get all rachel lessons', () =>
      agent.get('/users/1/lessons').expect(200)
      );
    });
    
  });
  beforeEach(() => Users.sync({ force: true })
  .then(() => Friendships.sync({ force: true }))
    .then(() => Users.create(joe))
    .then(() => Users.create(mark))
    .then(() => Users.create(jody))
    .then(() => Users.create(rachel))
    .then(() => Friendships.create(friendship1))
    .then(() => Friendships.create(friendship2))
    .then(() => Friendships.create(friendship3))
    )    
  describe('GET /friendships/1', () => {
    it('should get Joes friendships', () =>
      agent.get('/friendships/1').expect(200)
    );
  });
