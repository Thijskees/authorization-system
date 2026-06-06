export type PublicUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type StoredUser = PublicUser & {
  passwordHash: string;
  passwordSalt: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  name: string;
};

export type LoginInput = {
  email: string;
  password: string;
};
