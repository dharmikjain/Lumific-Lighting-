import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
import portfolioRoutes from "./routes/portfolio.js";
import configuratorRoutes from "./routes/configurator.js";
import portalRoutes from "./routes/portal.js";
import techlibRoutes from "./routes/techlib.js";
import collaborationRoutes from "./routes/collaboration.js";
import trainingRoutes from "./routes/training.js";
import searchRoutes from "./routes/search.js";
import contentRoutes from "./routes/content.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/configurator", configuratorRoutes);
app.use("/api/portal", portalRoutes);
app.use("/api/techlib", techlibRoutes);
app.use("/api/collaboration", collaborationRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/content", contentRoutes);

app.listen(PORT, () => {
  console.log(`Lumific API running at http://localhost:${PORT}`);
});
