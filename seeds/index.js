const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  process.exit(0);
};

seedAll();
