import { createHash, randomBytes, randomUUID } from 'crypto';

import type { LoginInput, PublicUser, RegisterInput, StoredUser } from './auth.types';

type AuthResult = {
  token: string;
  user: PublicUser;
};

const usersById = new Map<string, StoredUser>();
const usersByEmail = new Map<string, StoredUser>();
const sessionsByToken = new Map<string, string>();

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

export const registerUser = ({ email, password, name }: RegisterInput): AuthResult => {
  const normalizedEmail = normalizeEmail(email);

  if (usersByEmail.has(normalizedEmail)) {
    throw new Error('A user with that email already exists');
  }

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

  usersById.set(user.id, user);
  usersByEmail.set(user.email, user);
  sessionsByToken.set(token, user.id);

  return {
    token,
    user: toPublicUser(user),
  };
};

export const loginUser = ({ email, password }: LoginInput): AuthResult => {
  const normalizedEmail = normalizeEmail(email);
  const user = usersByEmail.get(normalizedEmail);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordHash = hashPassword(password, user.passwordSalt);

  if (passwordHash !== user.passwordHash) {
    throw new Error('Invalid email or password');
  }

  const token = randomUUID();
  sessionsByToken.set(token, user.id);

  return {
    token,
    user: toPublicUser(user),
  };
};

export const getUserFromToken = (token: string) => {
  const userId = sessionsByToken.get(token);

  if (!userId) {
    return undefined;
  }

  const user = usersById.get(userId);

  return user ? toPublicUser(user) : undefined;
};
