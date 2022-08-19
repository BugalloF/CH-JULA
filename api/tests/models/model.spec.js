const { Users,Friendships,Lessons, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Models', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Users.sync({ force: true }));
    describe('Users', () => {
      it('should throw an error if name is null', (done) => {
        Users.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Users.create({ name: 'Mark' });
      });
    });
    describe('Friendships', () => {
      it('should throw an error if one person is null', (done) => {
        Friendships.create({person1Id:1})
          .then(() => done(new Error('It requires two persons')))
          .catch(() => done());
      });
      it('should work when there are two person being friends', () => {
        Friendships.create({ person1Id: 1,person2Id:2});
      });
    });
    describe('Lessons', () => {
      it('should throw an error if the lesson is null', (done) => {
        Lessons.create({personId:1})
          .then(() => done(new Error('It requires a lesson')))
          .catch(() => done());
      });
      it('should throw an error if the person is null', () => {
        Lessons.create({ name:'Maths'});
      });
      it('should work when person and lesson are specified', () => {
        Lessons.create({ person1Id: 1,name:'Maths'});
      });
    });
  });
});
