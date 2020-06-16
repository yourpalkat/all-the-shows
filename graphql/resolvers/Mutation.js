const { generate } = require('shortid');

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

};