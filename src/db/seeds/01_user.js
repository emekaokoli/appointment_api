/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      user_id: 1,
      email: 'user1@example.com',
      date_of_birth: '1990-01-01',
      password: 'password1',
    },
    {
      user_id: 2,
      email: 'user2@example.com',
      date_of_birth: '1995-05-20',
      password: 'password2',
    },
    {
      user_id: 3,
      email: 'user3@example.com',
      date_of_birth: '2000-10-15',
      password: 'password3',
    },
  ]);
};
