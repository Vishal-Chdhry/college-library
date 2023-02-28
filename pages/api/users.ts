import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await addUser(req, res);
  } else if (req.method === 'GET') {
    return await getUsers(req, res);
  } else if (req.method === 'PUT') {
    return await updateUser(req, res);
  } else {
    return res
      .status(405)
      .json({ message: 'Method not allowed', success: false });
  }
}

async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const newEntry = await prisma.user.create({
      data: {
        name: body.name,
        rollNo: body.rollNo,
        startYear: body.startYear,
        endYear: body.endYear,
        semester: body.semester,
        branch: body.branch
      }
    });
    return res.status(200).json(newEntry);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error creating user', success: false });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error fetching users', success: false });
  }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const book = await prisma.user.update({
      where: {
        id: body.id
      },
      data: {
        ...body
      }
    });
    return res.status(200).json(book);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error updating users', success: false });
  }
}
