import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { optionalAuth } from "../middleware/auth.middleware.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/", optionalAuth, async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q || q.length < 2) {
      return res.json({ products: [], projects: [], assets: [] });
    }

    const [products, projects, assets] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { sku: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { category: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
      prisma.techAsset.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { type: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
    ]);

    res.json({ products, projects, assets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
