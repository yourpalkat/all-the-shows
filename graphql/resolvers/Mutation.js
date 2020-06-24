const { generate } = require('shortid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async addShow(
    parent, 
    { input: { performer, openers, venue, dateProvided } },
    { shows }
  ) {
    const newShow = {
      id: generate(),
      performer,
      openers,
      venue,
      date: new Date(dateProvided).toISOString(),
    };
    await shows.insertOne(newShow);
    return newShow;
  },

  async createUser(
    parent,
    {
      input: { username, password }
    },
    { users }
  ) {
    let existingUser = await users.findOne({ username });
    if (!existingUser) {
      let hash = bcrypt.hashSync(password, 10);
      let newUser = {
        id: generate(),
        username,
        password: hash,
      };
      await users.insertOne(newUser);
      return newUser;
    } else {
      throw new Error("An account with this username already exists.");
    }
  },

  async logIn(parent, { username, password }, { customers, currentUser }) {
    let user = await customers.findOne({ username });
    if (!user) {
      throw new Error(`Account with that username: ${username} not found.`);
    }
    if (bcrypt.compareSync(password, user.password)) {
      currentUser = user;
      const token = jwt.sign(
        { username: currentUser.username },
        process.env.SECRET
      );
      currentUser.token = token;
      return {
        user: currentUser,
        token
      };
    } else {
      throw new Error("Incorrect password.");
    }
  },
};