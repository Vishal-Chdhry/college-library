import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await addBook(req, res);
  } else if (req.method === 'GET') {
    return await getBooks(req, res);
  } else if (req.method === 'PUT') {
    return await updateBook(req, res);
  } else {
    return res
      .status(405)
      .json({ message: 'Method not allowed', success: false });
  }
}

async function addBook(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const newEntry = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        branch: body.branch,
        semester: body.semester,
        imageUrl: body.imageUrl,
        userId: !!body.userId || body.userId === -1 ? null : body.userId,
        addedDate: new Date()
      }
    });
    return res.status(200).json(newEntry);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error creating books', success: false });
  }
}

async function getBooks(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const books = await prisma.book.findMany();
    return res.status(200).json(books);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error fetching books', success: false });
  }
}

async function updateBook(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const book = await prisma.book.update({
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
