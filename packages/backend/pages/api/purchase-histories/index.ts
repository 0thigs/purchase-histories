import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const histories = await prisma.purchaseHistory.findMany({
        include: {
          product: true,
          supplier: true,
        },
      });
      res.status(200).json(histories);
      break;
    case 'POST':
      const { purchaseDate, quantity, productId, supplierId } = req.body;
      const newHistory = await prisma.purchaseHistory.create({
        data: {
          purchaseDate: new Date(purchaseDate),
          quantity,
          productId,
          supplierId,
        },
      });
      res.status(201).json(newHistory);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
