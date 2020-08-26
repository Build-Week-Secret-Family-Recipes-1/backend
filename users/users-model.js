const db = require("../data/dbconfig.js");

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove
};

function findAll() {
  return db("users");
}

function findById(id) {
  return db("users")
    .returning('id')
    .where({id})
    .first();
}

function add(user) {
  return db("users")
    .returning('id')
    .insert(user, "id")
    .then(ids => findById(ids[0]));
}

function update(changes, id) {
  return db("users")
    .where({ id: id })
    .update(changes)
    .then(() => findById(id));
}

function remove(id) {
  return db("users")
    .where({id: id})
    .delete();
}