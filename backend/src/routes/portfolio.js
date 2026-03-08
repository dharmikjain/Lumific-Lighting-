import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { optionalAuth } from "../middleware/auth.middleware.js";

const router = Router();
const prisma = new PrismaClient();

// Public portfolio/projects listing
router.get("/", optionalAuth, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { status: "active" },
      take: 50,
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { pins: { include: { product: true } } },
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
