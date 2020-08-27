exports.up = async function (knex) {
  // await knex.schema.createTable('category', tbl => {
  //   tbl.increments('id')
  //   tbl.text('name').unique().notNullable()
  // })

  // await knex.schema.createTable('recipes', tbl => {
  //   tbl.increments('id')
  //   tbl.text('name').unique().notNullable()
  //   tbl.text('source').notNullable()
  //   tbl
  //     .integer('category_id')
  //     .references('id')
  //     .inTable('category')
  //     .onDelete('CASCADE')
  //     .onUpdate('CASCADE')
  // })

  // await knex.schema.createTable('instructions', tbl => {
  //   tbl.increments('id').primary()
  //   tbl.text('description').notNullable()
  //   tbl
  //     .integer('recipes_id')
  //     .references('id')
  //     .inTable('recipes')
  //     .onDelete('CASCADE')
  //     .onUpdate('CASCADE')
  //   tbl
  //     .integer('step')
  // })

  // await knex.schema.createTable('ingredients', tbl => {
  //   tbl.increments('id').primary()
  //   tbl.text('name').unique().notNullable()
  //   tbl
  //     .integer('recipes_id')
  //     .references('id')
  //     .inTable('recipes')
  //     .onDelete('CASCADE')
  //     .onUpdate('CASCADE')
  // })

  // await knex.schema.createTable('quantity', tbl => {
  //   tbl.increments('id')
  //   tbl.text('qty')
  //   tbl
  //     .integer('recipes_id')
  //     .references('id')
  //     .inTable('recipes')
  //     .onDelete('CASCADE')
  //     .onUpdate('CASCADE')
  // })

  // await knex.schema.createTable('recipes_ingredients', tbl => {
  //   tbl
  //     .integer('recipe_id')
  //     .references('id')
  //     .inTable('recipes')
  //     .onDelete('CASCADE')
  //     .onUpdate('CASCADE')
  //   tbl
  //     .integer('ingredient_id')
  //     .references('id')
  //     .inTable('ingredients')
  //     .onDelete('CASCADE')
  //     .onUpdate('CASCADE')
    // tbl
    //   .integer('quantity_id')
    //   .references('id')
    //   .inTable('quantity')
    //   .onDelete('CASCADE')
    //   .onUpdate('CASCADE')
    // tbl
    //   .integer('unit_id')
    //   .references('id')
    //   .inTable('unit')
    //   .onDelete('CASCADE')
    //   .onUpdate('CASCADE')

  //   tbl.primary(['ingredient_id', 'recipe_id'])
  // })

  await knex.schema.createTable('recipes', tbl => {
    tbl.increments('r_id')
    tbl.string('title', 255).notNullable()
    tbl.string('source', 255)
    tbl.string('ingredients', 255).notNullable()
    tbl.string('instructions', 255).notNullable()
    tbl.string('category', 255).notNullable()
    tbl.string('image', 255)
    //? FOREIGN KEY ALWAYS GOES ON THE BOTTOM ?//
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = async function (knex) {
  // await knex.schema.dropTableIfExists('recipes_ingredients')
  // await knex.schema.dropTableIfExists('unit')
  // await knex.schema.dropTableIfExists('quantity')
  await knex.schema.dropTableIfExists('ingredients')
  await knex.schema.dropTableIfExists('instructions')
  await knex.schema.dropTableIfExists('recipes')
  await knex.schema.dropTableIfExists('category')
}