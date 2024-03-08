import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import prisma from '../db/prisma';

export async function createActivateToken(userId: number | undefined, tx: any) {
  try {
    const newToken = await tx.activateToken.create({
      data: {
        userId: userId,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      },
    });

    return newToken;
  } catch (error) {
    throw new Error('Error in creating token');
  }
}

export async function getOneToken(tokenId: string) {
  try {
    const foundToken = await prisma.activateToken.findFirst({
      where: { token: tokenId },
    });

    return foundToken;
  } catch (error: any) {
    throw new Error(error);
  }
}
