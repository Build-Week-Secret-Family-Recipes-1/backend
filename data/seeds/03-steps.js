exports.seed = async function (knex) {
  await knex('steps').insert([
    { recipes_id: 1, description: "Step 1 for Recipe 1", step: "1" },
    { recipes_id: 1, description: "Step 2 for Recipe 1", step: "2" },
    { recipes_id: 1, description: "Step 3 for Recipe 1", step: "3" },
    { recipes_id: 2, description: "Step 1 for Recipe 2", step: "1" },
    { recipes_id: 2, description: "Step 2 for Recipe 2", step: "2" },
  ])
}