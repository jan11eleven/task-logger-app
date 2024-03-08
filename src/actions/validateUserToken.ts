import { getOneToken } from '../repository/activateToken';
import { activateUserAccount, getOneAccount } from '../repository/account';
import errorMessages from '@/src/utils/errorMessages.json';

export default async function validateUserToken(tokenId: string) {
  const tokenResult = await getOneToken(tokenId);

  if (tokenResult === null) {
    return {
      message: errorMessages['token.invalid_token'],
    };
  }

  const accountDetails = await getOneAccount(tokenResult.userId);

  if (!accountDetails) {
    return { message: errorMessages['user.user_not_found'] };
  }

  if (accountDetails.isActive) {
    return {
      message: errorMessages['user.user_is_already_activated'],
    };
  }

  if (tokenResult) {
    try {
      const updatedTokenAndAccountDetails = await activateUserAccount(
        tokenResult.userId,
        tokenId
      );
      return updatedTokenAndAccountDetails;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return { message: errorMessages['token.invalid_token'] };
}
