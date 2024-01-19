/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('providers').del()
  await knex('providers').insert([
    { name: 'Dr. Jane Smith', bio: 'what a wonderful world', title: 'Dentist' },
    {
      name: 'Dr. Emily Johnson',
      bio: 'what a wonderful world',
      title: 'Dentist',
    },
    {
      name: 'Dr. John Doe',
      bio: 'what a wonderful world',
      title: 'Family Physician',
    },
    {
      name: 'Dr. John Smith',
      bio: 'what a wonderful world',
      title: 'Family Physician',
    },
  ]);
};
