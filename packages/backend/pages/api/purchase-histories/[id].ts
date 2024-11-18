// pages/api/purchase-histories/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const historyId = parseInt(id as string);

  switch (req.method) {
    case 'GET':
      const history = await prisma.purchaseHistory.findUnique({
        where: { id: historyId },
        include: {
          product: true,
          supplier: true,
        },
      });
      if (history) {
        res.status(200).json(history);
      } else {
        res.status(404).json({ message: 'History not found' });
      }
      break;
    case 'PUT':
      const { purchaseDate, quantity, productId, supplierId } = req.body;
      const updated = await prisma.purchaseHistory.update({
        where: { id: historyId },
        data: {
          purchaseDate: new Date(purchaseDate),
          quantity,
          productId,
          supplierId,
        },
      });
      res.status(200).json(updated);
      break;
    case 'DELETE':
      await prisma.purchaseHistory.delete({
        where: { id: historyId },
      });
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
