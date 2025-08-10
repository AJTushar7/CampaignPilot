import { type User, type InsertUser, type Campaign, type ChannelPerformance, type BspProvider, type InactiveCustomer, type Festival } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: any): Promise<Campaign>;
  updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined>;
  getChannelPerformance(): Promise<ChannelPerformance[]>;
  getBspProviders(): Promise<BspProvider[]>;
  getInactiveCustomers(): Promise<InactiveCustomer[]>;
  getFestivals(): Promise<Festival[]>;
  getKPIMetrics(): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private campaigns: Map<string, Campaign>;
  private channelPerformance: ChannelPerformance[];
  private bspProviders: BspProvider[];
  private inactiveCustomers: InactiveCustomer[];
  private festivals: Festival[];

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.channelPerformance = this.initChannelPerformance();
    this.bspProviders = this.initBspProviders();
    this.inactiveCustomers = this.initInactiveCustomers();
    this.festivals = this.initFestivals();
    this.initCampaigns();
  }

  private initChannelPerformance(): ChannelPerformance[] {
    return [
      { id: "1", channel: "SMS", metric: "delivery_rate", value: "85", date: new Date() },
      { id: "2", channel: "WhatsApp", metric: "delivery_rate", value: "78", date: new Date() },
      { id: "3", channel: "Email", metric: "delivery_rate", value: "92", date: new Date() },
      { id: "4", channel: "Push", metric: "delivery_rate", value: "69", date: new Date() },
      { id: "5", channel: "RCS", metric: "delivery_rate", value: "74", date: new Date() },
    ];
  }

  private initBspProviders(): BspProvider[] {
    return [
      {
        id: "1",
        name: "Twilio",
        smsDeliveryRate: "94",
        whatsappDeliveryRate: "89",
        emailDeliveryRate: "76",
        pushDeliveryRate: "91",
        overallScore: "A+"
      },
      {
        id: "2",
        name: "SendGrid",
        smsDeliveryRate: "78",
        whatsappDeliveryRate: null,
        emailDeliveryRate: "96",
        pushDeliveryRate: null,
        overallScore: "B+"
      }
    ];
  }

  private initInactiveCustomers(): InactiveCustomer[] {
    return [
      { id: "1", customerId: "cust_001", lastActivity: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), segment: "high_value", value: "1200" },
      { id: "2", customerId: "cust_002", lastActivity: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), segment: "regular", value: "350" },
    ];
  }

  private initFestivals(): Festival[] {
    return [
      { id: "1", name: "Christmas", date: new Date("2024-12-25"), emoji: "🎄", daysLeft: 12 },
      { id: "2", name: "New Year", date: new Date("2025-01-01"), emoji: "🎊", daysLeft: 19 },
      { id: "3", name: "Valentine's Day", date: new Date("2025-02-14"), emoji: "💝", daysLeft: 63 },
    ];
  }

  private initCampaigns(): void {
    const campaigns = [
      {
        id: "1",
        name: "Summer Sale Campaign",
        type: "Promotional",
        status: "active",
        channels: ["SMS", "Email"],
        targetAudience: 15234,
        sent: 15234,
        delivered: 14892,
        opened: 10234,
        clicked: 3567,
        converted: 1234,
        cost: "1250.00",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        startedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        scheduledAt: null,
        pausedAt: null,
      },
      {
        id: "2", 
        name: "Welcome Series",
        type: "Onboarding",
        status: "scheduled",
        channels: ["WhatsApp"],
        targetAudience: 2457,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
        cost: "189.00",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        scheduledAt: new Date(Date.now() + 18 * 60 * 60 * 1000),
        startedAt: null,
        pausedAt: null,
      },
      {
        id: "3",
        name: "Product Launch",
        type: "Announcement",
        status: "paused",
        channels: ["SMS", "Email", "Push"],
        targetAudience: 8543,
        sent: 8543,
        delivered: 8234,
        opened: 4567,
        clicked: 1234,
        converted: 456,
        cost: "567.00",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        pausedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        scheduledAt: null,
      }
    ];

    campaigns.forEach(campaign => {
      this.campaigns.set(campaign.id, campaign as Campaign);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(campaign: any): Promise<Campaign> {
    const id = randomUUID();
    const newCampaign: Campaign = { ...campaign, id, createdAt: new Date() };
    this.campaigns.set(id, newCampaign);
    return newCampaign;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updatedCampaign = { ...campaign, ...updates };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async getChannelPerformance(): Promise<ChannelPerformance[]> {
    return this.channelPerformance;
  }

  async getBspProviders(): Promise<BspProvider[]> {
    return this.bspProviders;
  }

  async getInactiveCustomers(): Promise<InactiveCustomer[]> {
    return this.inactiveCustomers;
  }

  async getFestivals(): Promise<Festival[]> {
    return this.festivals;
  }

  async getKPIMetrics(): Promise<any> {
    const campaigns = Array.from(this.campaigns.values());
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    
    const totalSent = campaigns.reduce((sum, c) => sum + (c.sent || 0), 0);
    const totalDelivered = campaigns.reduce((sum, c) => sum + (c.delivered || 0), 0);
    const totalOpened = campaigns.reduce((sum, c) => sum + (c.opened || 0), 0);
    const totalClicked = campaigns.reduce((sum, c) => sum + (c.clicked || 0), 0);
    const totalConverted = campaigns.reduce((sum, c) => sum + (c.converted || 0), 0);
    const totalSpend = campaigns.reduce((sum, c) => sum + parseFloat(c.cost || "0"), 0);

    return {
      totalCampaigns,
      openRate: totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0",
      clickRate: totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : "0", 
      conversionRate: totalSent > 0 ? ((totalConverted / totalSent) * 100).toFixed(1) : "0",
      totalSpend: `$${(totalSpend / 1000).toFixed(1)}K`,
      campaignsGrowth: "+12",
      openRateGrowth: "+5.2",
      clickRateGrowth: "-2.1",
      conversionGrowth: "+3.7",
      spendGrowth: "+8.9"
    };
  }
}

export const storage = new MemStorage();
