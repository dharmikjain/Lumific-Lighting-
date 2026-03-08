import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware, optionalAuth } from "../middleware/auth.middleware.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/", optionalAuth, async (req, res) => {
  try {
    const { productId, config } = req.body;
    if (!productId || !config) {
      return res.status(400).json({ error: "productId and config required" });
    }

    const session = await prisma.configuratorSession.create({
      data: {
        productId,
        config,
        userId: req.user?.sub ?? null,
      },
      include: { product: true },
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const sessions = await prisma.configuratorSession.findMany({
      where: { userId: req.user.sub },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
