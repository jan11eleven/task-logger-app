import prisma from '../db/prisma';
import AccountType from '../types/AccountType';
import { AccountSchema } from '../zodSchema/schema';
import hashPassword from '../lib/hassPassword';

export async function createAccount(
  account: AccountType,
  tx: any,
  newUserId: number | undefined
): Promise<AccountType> {
  const isSuccess = validateAccount(account);

  if (isSuccess) {
    const hashedPassword = await hashPassword(account.password);
    try {
      const newAccount = await tx.account.create({
        data: {
          userId: newUserId,
          email: account.email,
          username: account.username,
          password: hashedPassword,
          isActive: account.isActive,
          createdAt: account.createdAt,
          role: account.role,
        },
      });

      return newAccount;
    } catch (error: any) {
      let errorMessage = '';

      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        errorMessage = 'Email is already taken.';
      }

      if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
        errorMessage = 'Username is already taken.';
      }

      console.error('Error in creating Account: ', errorMessage, '\n', error);

      throw new Error(errorMessage);
    }
  } else {
    throw new Error('Account Validation failed.');
  }
}

function validateAccount(account: AccountType): boolean {
  const data = AccountSchema.safeParse(account);

  return data.success;
}
