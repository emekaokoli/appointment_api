/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('appointments').del();
  await knex('appointments').insert([
    {
      provider_id: 1,
      user_id: 1,
      start_time: '2024-01-26 10:00:00',
      end_time: '2024-01-26 10:30:00',
      reason_for_visit: 'Annual checkup',
      remark: 'None',
    },
    {
      provider_id: 1,
      user_id: 1,
      start_time: '2024-01-29 14:30:00',
      end_time: '2024-01-29 15:00:00',
      reason_for_visit: 'Follow-up on recent blood test results',
      remark: 'Needs interpreter during appointment (Spanish)',
    },
    {
      provider_id: 2,
      user_id: 2,
      start_time: '2024-01-29 14:30:00',
      end_time: '2024-01-29 15:00:00',
      reason_for_visit: 'Follow-up on recent blood test results',
      remark: 'Needs interpreter during appointment (Spanish)',
    },
  ]);
};
