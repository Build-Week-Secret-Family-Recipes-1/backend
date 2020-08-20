
exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', tbl => {
      tbl.increments();
      tbl.string('name', 128)
        .notNullable();
      tbl.string('description', 255)
        .notNullable();
      tbl.string('source', 128)
        .notNullable();
    })
    
};

exports.down = function(knex) {
  
};
