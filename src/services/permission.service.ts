import { randomUUID } from 'crypto';

import { getRepository } from '../auth/auth.service';
import type { CreatePermissionInput, Permission } from '../models/permission.types';

export const createPermission = async (input: CreatePermissionInput): Promise<Permission> => {
  const repo = await getRepository();
  const normalizedCode = input.code.trim();

  const existing = await repo.findPermissionByCode(normalizedCode);
  if (existing) {
    throw new Error('A permission with that code already exists');
  }

  const permission: Permission = input.description
    ? {
        id: randomUUID(),
        code: normalizedCode,
        description: input.description.trim(),
        createdAt: new Date().toISOString(),
      }
    : {
        id: randomUUID(),
        code: normalizedCode,
        createdAt: new Date().toISOString(),
      };

  await repo.createPermission(permission);
  return permission;
};

export const listPermissions = async (): Promise<Permission[]> => {
  const repo = await getRepository();
  return repo.listPermissions();
};

export const getPermissionById = async (id: string): Promise<Permission | undefined> => {
  const repo = await getRepository();
  return repo.findPermissionById(id);
};
