exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl.string("fname", 128)
        .notNullable();
      tbl.string("lname", 128)
        .notNullable();
      tbl.string("email", 128)
        .notNullable()
        .unique();
      tbl.string("username", 128)
        .notNullable()
        .unique();
      tbl.text("password", 128)
        .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users");
};