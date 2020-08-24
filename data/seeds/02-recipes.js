exports.seed = async function (knex) {
  await knex('recipes').insert([
    // { id: 1, name: "Haggis", source: 'Grandma', category_id: 1 },
    // { id: 2, name: "Scottish Porridge", source: 'Uncle John', category_id: 1 },
    // { id: 3, name: "Kimbap", source: 'Aunt Kim', category_id: 2 },
    // { id: 4, name: "Bulgogi", source: 'Aunt Kim', category_id: 2}
    { id: 1,
      title: 'Kimbap', 
      source: 'Aunt Kim', 
      ingredients: 'rice, crab, carrot, sea weed', 
      instructions: "instruction section",
      category: 'Korean', 
      image: '',
      user_id: 1}
  ])
}