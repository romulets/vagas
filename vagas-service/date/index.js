module.exports = {

  now() {
    return new Date(Date.now())
  },

  subtractDays(date, days) {
    const dateOffset = (24 * 60 * 60 * 1000) * days;
    const pastDate = new Date();
    pastDate.setTime(date.getTime() - dateOffset);
    return pastDate
  }

}