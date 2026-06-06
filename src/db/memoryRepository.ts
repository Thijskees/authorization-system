import type { AuthRepository } from './repository';
import type { StoredUser } from '../auth/auth.types';
import type { Permission } from '../models/permission.types';
import type { Role } from '../models/role.types';

export const createMemoryRepository = async (): Promise<AuthRepository> => {
  const usersById = new Map<string, StoredUser>();
  const usersByEmail = new Map<string, StoredUser>();
  const sessionsByToken = new Map<string, string>();
  const rolesById = new Map<string, Role>();
  const permissionsById = new Map<string, Permission>();
  const permissionsByCode = new Map<string, Permission>();

  return {
    async createUser(user: StoredUser) {
      usersById.set(user.id, user);
      usersByEmail.set(user.email, user);
    },
    async findUserByEmail(email: string) {
      return usersByEmail.get(email);
    },
    async findUserById(id: string) {
      return usersById.get(id);
    },
    async listUsers() {
      return Array.from(usersById.values());
    },
    async createSession(token: string, userId: string) {
      sessionsByToken.set(token, userId);
    },
    async findUserIdByToken(token: string) {
      return sessionsByToken.get(token);
    },
    async createRole(role: Role) {
      rolesById.set(role.id, role);
    },
    async findRoleById(id: string) {
      return rolesById.get(id);
    },
    async listRoles() {
      return Array.from(rolesById.values());
    },
    async updateRole(role: Role) {
      rolesById.set(role.id, role);
    },
    async createPermission(permission: Permission) {
      permissionsById.set(permission.id, permission);
      permissionsByCode.set(permission.code, permission);
    },
    async findPermissionById(id: string) {
      return permissionsById.get(id);
    },
    async findPermissionByCode(code: string) {
      return permissionsByCode.get(code);
    },
    async listPermissions() {
      return Array.from(permissionsById.values());
    },
  };
};
