module.exports = {
  async up(db) {
    await db.createCollection("users");
  },

  async down(db) {
    await db.collection("users").drop();
  },
};
