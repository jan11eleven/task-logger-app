import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

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
    new Error('Error in creating token');
  }
}
