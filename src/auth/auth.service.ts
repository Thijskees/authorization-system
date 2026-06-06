import { createHash, randomBytes, randomUUID } from 'crypto';
import { env } from 'process';

import type { LoginInput, PublicUser, RegisterInput, StoredUser } from './auth.types';
import { createMemoryRepository } from '../db/memoryRepository';
import { createMongoRepository, initMongo } from '../db/mongoRepository';

import type { AuthRepository } from '../db/repository';

type AuthResult = {
  token: string;
  user: PublicUser;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const hashPassword = (password: string, salt: string) => {
  return createHash('sha256').update(`${salt}:${password}`).digest('hex');
};

const toPublicUser = (user: StoredUser): PublicUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt,
});

let repositoryPromise: Promise<AuthRepository> | undefined;

const getRepository = async (): Promise<AuthRepository> => {
  if (repositoryPromise) return repositoryPromise;

  const driver = (env.DB_DRIVER || 'memory').toLowerCase();

  if (driver === 'mongo') {
    const uri = env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is required for mongo driver');
    await initMongo(uri);
    repositoryPromise = createMongoRepository();
  } else {
    repositoryPromise = createMemoryRepository();
  }

  return repositoryPromise;
};

export const registerUser = async ({ email, password, name }: RegisterInput): Promise<AuthResult> => {
  const repo = await getRepository();
  const normalizedEmail = normalizeEmail(email);

  const existing = await repo.findUserByEmail(normalizedEmail);
  if (existing) throw new Error('A user with that email already exists');

  const salt = randomBytes(16).toString('hex');
  const user: StoredUser = {
    id: randomUUID(),
    email: normalizedEmail,
    name: name.trim(),
    createdAt: new Date().toISOString(),
    passwordSalt: salt,
    passwordHash: hashPassword(password, salt),
  };

  const token = randomUUID();

  await repo.createUser(user);
  await repo.createSession(token, user.id);

  return {
    token,
    user: toPublicUser(user),
  };
};

export const loginUser = async ({ email, password }: LoginInput): Promise<AuthResult> => {
  const repo = await getRepository();
  const normalizedEmail = normalizeEmail(email);
  const user = await repo.findUserByEmail(normalizedEmail);

  if (!user) throw new Error('Invalid email or password');

  const passwordHash = hashPassword(password, user.passwordSalt);

  if (passwordHash !== user.passwordHash) throw new Error('Invalid email or password');

  const token = randomUUID();
  await repo.createSession(token, user.id);

  return {
    token,
    user: toPublicUser(user),
  };
};

export const getUserFromToken = async (token: string) => {
  const repo = await getRepository();
  const userId = await repo.findUserIdByToken(token);
  if (!userId) return undefined;
  const user = await repo.findUserById(userId);
  return user ? toPublicUser(user) : undefined;
};
