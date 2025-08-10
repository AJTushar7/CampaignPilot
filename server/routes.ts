import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // KPI Metrics endpoint
  app.get("/api/kpi-metrics", async (req, res) => {
    try {
      const metrics = await storage.getKPIMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch KPI metrics" });
    }
  });

  // Campaigns endpoints
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaign" });
    }
  });

  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.updateCampaign(req.params.id, req.body);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });

  // Channel Performance endpoint
  app.get("/api/channel-performance", async (req, res) => {
    try {
      const performance = await storage.getChannelPerformance();
      res.json(performance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch channel performance" });
    }
  });

  // BSP Providers endpoint
  app.get("/api/bsp-providers", async (req, res) => {
    try {
      const providers = await storage.getBspProviders();
      res.json(providers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch BSP providers" });
    }
  });

  // Inactive Customers endpoint
  app.get("/api/inactive-customers", async (req, res) => {
    try {
      const customers = await storage.getInactiveCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inactive customers" });
    }
  });

  // Festivals endpoint
  app.get("/api/festivals", async (req, res) => {
    try {
      const festivals = await storage.getFestivals();
      res.json(festivals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch festivals" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
