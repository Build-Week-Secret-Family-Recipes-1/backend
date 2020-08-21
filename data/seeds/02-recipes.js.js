exports.seed = async function (knex) {
  await knex('recipes').insert([
    { id: 1, name: "Roasted Chicken" },
    { id: 2, name: "Pineapple Pizza" },
    { id: 3, name: "Spaghetti" },
    { id: 4, name: "Kimbap" }
  ])
}