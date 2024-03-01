import { createUserAccount } from '../repository/user';
import { Role } from '@prisma/client';
import calculateAge from '../utils/calculateAge';
import constructFullName from '../utils/constructFullName';

export default async function createUserAction(userData: any) {
  // Create a new Date object representing the current date and time
  const currentDateAndTime = new Date();

  const age = calculateAge(new Date(userData.birthday));

  const birthday = new Date(userData.birthday);

  const fullName = constructFullName(
    userData.firstName,
    userData.middleName,
    userData.lastName
  );

  const newUser = {
    firstName: userData.firstName,
    age: age,
    birthday: birthday,
    fullName: fullName,
    lastName: userData.lastName,
    middleName: userData.middleName,
  };

  const formattedDateTime = currentDateAndTime.toISOString();

  const newAccount = {
    email: userData.email,
    username: userData.username,
    password: userData.password,
    isActive: true,
    createdAt: formattedDateTime,
    role: Role.BASIC,
  };

  try {
    const data = await createUserAccount(newUser, newAccount);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
