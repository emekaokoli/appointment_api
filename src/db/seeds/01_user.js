const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // User data with plain text passwords
  const users = [
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
  ];
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );
  await knex('users').insert(hashedUsers);
};