import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/modules", async (req, res) => {
  try {
    const modules = await prisma.trainingModule.findMany({
      orderBy: { order: "asc" },
    });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/progress", authMiddleware, requireRole("sales", "partner"), async (req, res) => {
  try {
    const progress = await prisma.trainingProgress.findMany({
      where: { userId: req.user.sub },
      include: { module: true },
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/progress", authMiddleware, requireRole("sales", "partner"), async (req, res) => {
  try {
    const { moduleId, completed, score } = req.body;
    const progress = await prisma.trainingProgress.upsert({
      where: {
        userId_moduleId: { userId: req.user.sub, moduleId },
      },
      create: { userId: req.user.sub, moduleId, completed: !!completed, score },
      update: { completed: !!completed, score },
      include: { module: true },
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
