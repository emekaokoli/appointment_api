import knex from '../db';
import { providerInput } from '../schema/provider';

export async function AllProviders() {
  return knex('providers').select('*');
}

export async function FindOne(provider_id: string): Promise<providerInput[]> {
  return knex('providers').select('*').where({ provider_id });
}

export async function create(provider: providerInput): Promise<providerInput> {
  return knex('providers').insert(provider);
}
