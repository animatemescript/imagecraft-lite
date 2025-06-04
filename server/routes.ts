import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnnouncementSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Announcement routes
  app.get("/api/announcements/active", async (req, res) => {
    try {
      const announcement = await storage.getActiveAnnouncement();
      res.json(announcement || null);
    } catch (error) {
      console.error("Error fetching active announcement:", error);
      res.status(500).json({ error: "Failed to fetch announcement" });
    }
  });

  app.post("/api/announcements", async (req, res) => {
    try {
      const result = insertAnnouncementSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid announcement data", details: result.error });
      }

      const announcement = await storage.updateAnnouncement(result.data);
      res.json(announcement);
    } catch (error) {
      console.error("Error updating announcement:", error);
      res.status(500).json({ error: "Failed to update announcement" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
