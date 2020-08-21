exports.seed = async function (knex) {
  await knex('ingredients').insert([
    { name: "Chicken" },
    { name: "Carrots" },
    { name: "Onions" }
  ])
}