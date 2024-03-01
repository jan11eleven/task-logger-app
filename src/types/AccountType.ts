import Role from '@prisma/client';

export default interface Account {
  id?: number | undefined;
  userId?: number;
  email: string;
  username: string;
  password: string;
  isActive: boolean;
  createdAt: string;
  role: Role.Role;
}
