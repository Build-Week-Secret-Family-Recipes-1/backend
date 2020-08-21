exports.seed = async function (knex) {
  await knex('recipes').insert([
    { id: 1, name: "Roasted Chicken", source: 'Grandma' },
    { id: 2, name: "Pineapple Pizza", source: 'Uncle John' },
    { id: 3, name: "Kimbap", source: 'Aunt Kim' }
  ])
}