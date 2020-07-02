module.exports = {
  allShows(parent, args, { shows }, info) {
    const allShowsArray = shows.find().toArray();
    // Eventually we'll filter allShowsArray by whether each show's id is in current user's shows array
    return allShowsArray;
  },
  
  showById(parent, { id }, { shows }, info) {
    return shows.findOne({ id });
  },

  userById(parent, { id }, { users }, info) {
    return users.findOne({ id });
  }
}