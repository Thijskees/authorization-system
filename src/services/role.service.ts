import { randomUUID } from 'crypto';
import type { Role, CreateRoleInput } from '../models/role.types';

const roles = new Map<string, Role>();

export const createRole = async (input: CreateRoleInput): Promise<Role> => {
  const role: Role = {
    id: randomUUID(),
    name: input.name.trim(),
    permissions: input.permissions ?? [],
    createdAt: new Date().toISOString(),
  };
  roles.set(role.id, role);
  return role;
};

export const listRoles = async (): Promise<Role[]> => {
  return Array.from(roles.values());
};

export const getRoleById = async (id: string): Promise<Role | undefined> => {
  return roles.get(id);
};

export const addPermissionToRole = async (id: string, permission: string): Promise<Role | undefined> => {
  const role = roles.get(id);
  if (!role) return undefined;
  if (!role.permissions.includes(permission)) role.permissions.push(permission);
  return role;
};

export const removePermissionFromRole = async (id: string, permission: string): Promise<Role | undefined> => {
  const role = roles.get(id);
  if (!role) return undefined;
  role.permissions = role.permissions.filter(p => p !== permission);
  return role;
};
