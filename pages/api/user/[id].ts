import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await getUserById(req, res);
  } else {
    return res
      .status(405)
      .json({ message: 'Method not allowed', success: false });
  }
}

async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const id = parseInt(query.id as string, 10);

  try {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    });
    if (user) {
      user.password = '--retracted--';
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Wrong User id', success: false });
  }
}
