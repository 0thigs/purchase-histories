// pages/api/suppliers/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const supplierId = parseInt(id as string);

  if (isNaN(supplierId)) {
    return res.status(400).json({ error: 'Invalid supplier ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const supplier = await prisma.supplier.findUnique({
          where: { id: supplierId },
        });
        if (supplier) {
          res.status(200).json(supplier);
        } else {
          res.status(404).json({ error: 'Supplier not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch supplier' });
      }
      break;
    case 'PUT':
      try {
        const { name, contact } = req.body;
        if (!name || !contact) {
          return res.status(400).json({ error: 'Name and contact are required' });
        }
        const updatedSupplier = await prisma.supplier.update({
          where: { id: supplierId },
          data: {
            name,
            contact,
          },
        });
        res.status(200).json(updatedSupplier);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          res.status(404).json({ error: 'Supplier not found' });
        } else {
          res.status(500).json({ error: 'Failed to update supplier' });
        }
      }
      break;
    case 'DELETE':
      try {
        await prisma.supplier.delete({
          where: { id: supplierId },
        });
        res.status(204).end();
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          res.status(404).json({ error: 'Supplier not found' });
        } else {
          res.status(500).json({ error: 'Failed to delete supplier' });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
