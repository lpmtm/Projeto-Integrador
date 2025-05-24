const User = require("./User");
const Boletim = require("../boletins/Boletim");

// Associações
User.hasMany(Boletim, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
});
Boletim.belongsTo(User, {
  foreignKey: "UserId"
});

module.exports = {
  User,
  Boletim
};
