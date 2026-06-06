import { randomUUID } from 'crypto';
import type { Role, CreateRoleInput } from '../models/role.types';
import { getRepository } from '../auth/auth.service';

export const createRole = async (input: CreateRoleInput): Promise<Role> => {
  const repo = await getRepository();
  const role: Role = {
    id: randomUUID(),
    name: input.name.trim(),
    permissions: input.permissions ?? [],
    createdAt: new Date().toISOString(),
  };
  await repo.createRole(role);
  return role;
};

export const listRoles = async (): Promise<Role[]> => {
  const repo = await getRepository();
  return repo.listRoles();
};

export const getRoleById = async (id: string): Promise<Role | undefined> => {
  const repo = await getRepository();
  return repo.findRoleById(id);
};

export const addPermissionToRole = async (id: string, permission: string): Promise<Role | undefined> => {
  const repo = await getRepository();
  const permissionRecord = await repo.findPermissionByCode(permission);
  if (!permissionRecord) return undefined;
  const role = await repo.findRoleById(id);
  if (!role) return undefined;
  if (!role.permissions.includes(permission)) role.permissions.push(permission);
  await repo.updateRole(role);
  return role;
};

export const removePermissionFromRole = async (id: string, permission: string): Promise<Role | undefined> => {
  const repo = await getRepository();
  const role = await repo.findRoleById(id);
  if (!role) return undefined;
  role.permissions = role.permissions.filter(p => p !== permission);
  await repo.updateRole(role);
  return role;
};
