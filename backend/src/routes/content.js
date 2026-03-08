import { Router } from "express";

const router = Router();

// Content routes - news, inspiration, brand story, etc.
// Extend with CMS or static content as needed

router.get("/news", (req, res) => {
  res.json({ items: [], message: "News content - integrate CMS" });
});

router.get("/inspiration", (req, res) => {
  res.json({ items: [], message: "Inspiration lookbook - integrate CMS" });
});

router.get("/brand", (req, res) => {
  res.json({ message: "Brand story - integrate CMS" });
});

export default router;
