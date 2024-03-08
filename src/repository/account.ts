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

export async function activateUserAccount(userId: number, tokenId: string) {
  try {
    const data = prisma.$transaction(async (tx) => {
      const updatedAccount = await tx.account.update({
        where: { userId: userId },
        data: { isActive: true },
      });

      const token = await tx.activateToken.update({
        where: { token: tokenId },
        data: { activatedAt: new Date() },
      });

      return { updatedAccount, token };
    });

    return data;
  } catch (error: any) {
    throw new Error('Error in activating account.');
  }
}

export async function getOneAccount(userId: number) {
  try {
    const accountDetails = prisma.account.findFirst({
      where: { userId: userId },
    });

    return accountDetails;
  } catch (error: any) {
    throw new Error('Error in getting account details(one): ', error);
  }
}
