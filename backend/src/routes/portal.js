import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();
const prisma = new PrismaClient();

// Partner & sales portal - pricing, quotes, orders
router.use(authMiddleware);
router.use(requireRole("sales", "partner", "architect", "interior"));

router.get("/quotes", async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      where: { userId: req.user.sub },
      include: { items: { include: { product: true } } },
    });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.sub },
      include: { items: { include: { product: true } } },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
