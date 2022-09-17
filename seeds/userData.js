const  User  = require('./../models/User.js');

const userData = [
  {
    userName: 'Dog',
    password: 'dogdog',
  },
  {
    userName: 'Cat',
    password: 'catcat',
  },
  {
    userName: 'Hamster',
    password: 'hamham',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
