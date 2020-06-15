module.exports = {
  performer(parent, input, { performer }) {
    return performer.find(({ shows }) => {
      return shows.find(({ show }) => parent.id === show.id);
    });
  }
}