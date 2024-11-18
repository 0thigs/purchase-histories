// pages/api/suppliers/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const suppliers = await prisma.supplier.findMany();
        res.status(200).json(suppliers);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch suppliers' });
      }
      break;
    case 'POST':
      try {
        const { name, contact } = req.body;
        if (!name || !contact) {
          return res.status(400).json({ error: 'Name and contact are required' });
        }
        const newSupplier = await prisma.supplier.create({
          data: {
            name,
            contact,
          },
        });
        res.status(201).json(newSupplier);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create supplier' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
