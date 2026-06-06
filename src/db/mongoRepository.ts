import { MongoClient, Db } from 'mongodb';
import type { AuthRepository } from './repository';
import type { StoredUser } from '../auth/auth.types';

let db: Db | undefined;

export const initMongo = async (uri: string, dbName = 'authorization') => {
  if (db) return;
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('sessions').createIndex({ token: 1 }, { unique: true });
};

const requireDb = (): Db => {
  if (!db) throw new Error('MongoDB not initialized — call initMongo(uri) first');
  return db as Db;
};

export const createMongoRepository = async (): Promise<AuthRepository> => {
  return {
    async createUser(user: StoredUser) {
      const collection = requireDb().collection('users');
      await collection.insertOne(user as any);
    },
    async findUserByEmail(email: string) {
      const collection = requireDb().collection<StoredUser>('users');
      const doc = await collection.findOne({ email });
      return doc ?? undefined;
    },
    async findUserById(id: string) {
      const collection = requireDb().collection<StoredUser>('users');
      const doc = await collection.findOne({ id });
      return doc ?? undefined;
    },
    async createSession(token: string, userId: string) {
      const collection = requireDb().collection('sessions');
      await collection.insertOne({ token, userId });
    },
    async findUserIdByToken(token: string) {
      const collection = requireDb().collection<{ token: string; userId: string }>('sessions');
      const doc = await collection.findOne({ token });
      return doc?.userId;
    },
  };
};
