import knex from '../db/knex';
import { providerType } from '../schema/provider';

export async function AllProviders() {
  return knex('providers').select('*');
}

export async function FindOne(provider_id: string): Promise<providerType[]> {
  return knex('providers').select('*').where({ provider_id });
}

export async function create(provider: providerType): Promise<providerType> {
  return knex('providers').insert(provider);
}
