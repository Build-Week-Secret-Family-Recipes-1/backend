exports.up = async function (knex) {
  await knex.schema.createTable('recipes', table => {
    table.increments('id')
    table.text('name').unique().notNullable()
  })

  await knex.schema.createTable('steps', table => {
    table.increments('id').primary()
    table.text('description').notNullable()
    table
      .integer('recipes_id')
      .references('id')
      .inTable('recipes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table
      .integer('step')
  })

  await knex.schema.createTable('ingredients', table => {
    table.increments('id').primary()
    table.text('name').unique().notNullable()
  })

  await knex.schema.createTable('quantity', table => {
    table.increments('id')
    table.text('qty')
  })

  await knex.schema.createTable('unit', table => {
    table.increments('id')
    table.text('description')
  })

  await knex.schema.createTable('recipes_ingredients', table => {
    table
      .integer('recipe_id')
      .references('id')
      .inTable('recipes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table
      .integer('ingredient_id')
      .references('id')
      .inTable('ingredients')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    // table
    //   .integer('quantity_id')
    //   .references('id')
    //   .inTable('quantity')
    //   .onDelete('CASCADE')
    //   .onUpdate('CASCADE')
    // table
    //   .integer('unit_id')
    //   .references('id')
    //   .inTable('unit')
    //   .onDelete('CASCADE')
    //   .onUpdate('CASCADE')

    table.primary(['ingredient_id', 'recipe_id'])
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('recipes_ingredients')
  await knex.schema.dropTableIfExists('unit')
  await knex.schema.dropTableIfExists('quantity')
  await knex.schema.dropTableIfExists('ingredients')
  await knex.schema.dropTableIfExists('steps')
  await knex.schema.dropTableIfExists('recipes')
}