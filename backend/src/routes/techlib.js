import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { optionalAuth } from "../middleware/auth.middleware.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/", optionalAuth, async (req, res) => {
  try {
    const { productId, type } = req.query;
    const where = {};
    if (productId) where.productId = productId;
    if (type) where.type = type;
    const assets = await prisma.techAsset.findMany({ where });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const asset = await prisma.techAsset.findUnique({
      where: { id: req.params.id },
    });
    if (!asset) return res.status(404).json({ error: "Asset not found" });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
