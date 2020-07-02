module.exports = {
  user(parent, input, { user }) {
    return user.find(({ shows }) => {
      return shows.find(({ user }) => parent.id === user.id);
    });
  }
}