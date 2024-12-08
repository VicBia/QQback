const User = require('../models/User');
const Store = require('../models/Store');

async function getUsers(option, userStoreId, specificStores = []) {
  let users;
  
  if (option === 'user_store') {
    users = await User.findAll({
      where: { id_store: userStoreId },
      include: [Store],
    });
  } else if (option === 'specific_stores') {
    users = await User.findAll({
      where: { id_store: specificStores },
      include: [Store],
    });
  } else if (option === 'all') {
    users = await User.findAll({
      include: [Store],
    });
  }

  return users;
}

module.exports = { getUsers };
