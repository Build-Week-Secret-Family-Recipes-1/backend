
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, fname: 'admin', lname: 'admin', email: 'admin@admin.com', username: 'admin', password: 'admin'},
      ]);
    });
};
