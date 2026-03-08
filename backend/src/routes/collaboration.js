import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get("/projects", async (req, res) => {
  try {
    const members = await prisma.projectMember.findMany({
      where: { userId: req.user.sub },
      include: { project: true },
    });
    res.json(members.map((m) => m.project));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.create({
      data: {
        name: name || "Untitled Project",
        description,
        members: {
          create: { userId: req.user.sub, role: "OWNER" },
        },
      },
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: req.params.id,
        members: { some: { userId: req.user.sub } },
      },
      include: {
        members: { include: { user: { select: { id: true, email: true, name: true } } } },
        pins: { include: { product: true } },
        comments: { include: { user: { select: { id: true, name: true } } } },
        approvals: true,
      },
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/projects/:id/pins", async (req, res) => {
  try {
    const { productId, notes } = req.body;
    const pin = await prisma.projectPin.create({
      data: { projectId: req.params.id, productId, notes },
      include: { product: true },
    });
    res.status(201).json(pin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/projects/:id/comments", async (req, res) => {
  try {
    const { body } = req.body;
    const comment = await prisma.projectComment.create({
      data: { projectId: req.params.id, userId: req.user.sub, body },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/projects/:id/approvals", async (req, res) => {
  try {
    const { status, note } = req.body;
    const approval = await prisma.projectApproval.create({
      data: { projectId: req.params.id, userId: req.user.sub, status, note },
    });
    res.status(201).json(approval);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
