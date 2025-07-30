import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlayerConfigSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate player configuration
  app.post("/api/player-config", async (req, res) => {
    try {
      const validatedData = insertPlayerConfigSchema.parse(req.body);
      const config = await storage.createPlayerConfig(validatedData);
      res.json(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get player configuration by ID
  app.get("/api/player-config/:id", async (req, res) => {
    try {
      const config = await storage.getPlayerConfig(req.params.id);
      if (!config) {
        res.status(404).json({ message: "Player configuration not found" });
        return;
      }
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Serve player page
  app.get("/player/:id", async (req, res) => {
    try {
      const config = await storage.getPlayerConfig(req.params.id);
      if (!config) {
        res.status(404).send("Player not found");
        return;
      }
      
      // Extract HTML from iframe code
      const base64Content = config.iframeCode.match(/data:text\/html;base64,([^"]+)/)?.[1];
      if (base64Content) {
        const html = Buffer.from(base64Content, 'base64').toString('utf-8');
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
      } else {
        res.status(500).send("Invalid player configuration");
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
