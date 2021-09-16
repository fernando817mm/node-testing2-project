const db = require("../../data/dataConfig");

const getById = (user_id) => {
  return db("users").where({ user_id }).first();
};

const insert = async (user) => {
  const [id] = await db("users").insert(user);
  return getById(id);
};

const remove = async (user_id) => {
  const user = await getById(user_id);
  return db("users")
    .where({ user_id })
    .del()
    .then(() => user);
};

module.exports = {
  getById,
  insert,
  remove,
};
