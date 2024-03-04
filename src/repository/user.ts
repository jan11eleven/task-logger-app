import prisma from '../db/prisma';
import { createAccount } from './account';
import UserType from '../types/UserType';
import AccountType from '../types/AccountType';
import { UserSchema } from '../zodSchema/schema';
import ActivateTokenType from '../types/ActivateTokenType';
import { createActivateToken } from './activateToken';
import sendActivationEmailToUser from '../utils/sendActivationEmailToUser';

export async function createUser(user: UserType, tx: any): Promise<UserType> {
  const isSuccess = validateUserData(user);

  if (isSuccess) {
    try {
      const newUser = await tx.user.create({
        data: {
          firstName: user.firstName,
          age: user.age,
          birthday: user.birthday,
          fullName: user.fullName,
          lastName: user.lastName,
          middleName: user.middleName,
        },
      });

      return newUser;
    } catch (error) {
      console.error('Error in creating User', error);

      throw new Error('User Account creation failed.');
    }
  } else {
    throw new Error('User Validation failed.');
  }
}

function validateUserData(user: UserType): boolean {
  const data = UserSchema.safeParse(user);

  return data.success;
}

export async function createUserAccount(user: UserType, account: AccountType) {
  let errorMessage: string = '';
  try {
    const data = await prisma.$transaction(async (tx) => {
      let newUser: UserType;
      let newUserId: number | undefined;
      let newAccount: AccountType;
      let newToken: ActivateTokenType;

      try {
        newUser = await createUser(user, tx);
        newUserId = newUser.id;
      } catch (userError: any) {
        errorMessage += userError.message;
        throw userError; // Re-throw the error to propagate it to the outer catch block
      }

      try {
        newAccount = await createAccount(account, tx, newUserId);
      } catch (accountError: any) {
        errorMessage += accountError.message;
        throw accountError; // Re-throw the error to propagate it to the outer catch block
      }

      try {
        newToken = await createActivateToken(newUserId, tx);
      } catch (tokenError: any) {
        errorMessage += tokenError.message;
        throw tokenError; // Re-throw the error to propagate it to the outer catch block
      }

      try {
        await sendActivationEmailToUser(newAccount.email, newToken.token);
      } catch (sendEmailActivationError: any) {
        errorMessage += sendEmailActivationError.message;
        throw sendEmailActivationError; // Re-throw the error to propagate it to the outer catch block
      }

      return { newUser, newAccount, newToken };
    });

    return data;
  } catch (error: any) {
    console.error('Error in creating User Account', error);

    throw new Error(errorMessage);
  }
}
