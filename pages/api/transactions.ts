import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await addTransactions(req, res);
  } else if (req.method === 'GET') {
    return await getTransactions(req, res);
  } else if (req.method === 'PUT') {
    return await updateTransaction(req, res);
  } else {
    return res
      .status(405)
      .json({ message: 'Method not allowed', success: false });
  }
}

async function addTransactions(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const newEntry = await prisma.transactions.create({
      data: {
        userId: body.userId,
        bookId: body.bookId,
        confirmed: body.confirmed,
        time: new Date()
      }
    });
    return res.status(200).json(newEntry);
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'Error creating transaction', success: false });
  }
}

async function getTransactions(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const books = await prisma.transactions.findMany();
    return res.status(200).json(books);
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'Error fetching transaction', success: false });
  }
}
async function updateTransaction(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const book = await prisma.transactions.update({
      where: {
        id: body.id
      },
      data: {
        confirmed: true
      }
    });
    return res.status(200).json(book);
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'Error updating transaction', success: false });
  }
}
