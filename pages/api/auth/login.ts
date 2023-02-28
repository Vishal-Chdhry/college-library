import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';
import * as argon from 'argon2';
import { sign } from 'jsonwebtoken';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await authorize(req, res);
  } else {
    return res
      .status(405)
      .json({ message: 'Method not allowed', success: false });
  }
}

async function authorize(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username
      }
    });

    if (!user) throw new Error('Incorrect Credentials');
    const pwmatched = await argon.verify(user.password, body.password);
    if (!pwmatched) throw new Error('Incorrect Credentials');
    const accessToken = sign(
      { name: user.name, username: user.username },
      process.env.NEXTAUTH_SECRET!,
      {
        expiresIn: '24h'
      }
    );
    const retVal = {
      name: user.name,
      username: user.username,
      role: user.role,
      accessToken: accessToken
    };
    return res.status(200).json(retVal);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Wrong book id', success: false });
  }
}
