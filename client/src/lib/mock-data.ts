// This file contains mock data used throughout the application
// In a real application, this would be replaced with actual API calls

export const mockKPIMetrics = {
  totalCampaigns: 24,
  openRate: "68.5",
  clickRate: "24.8", 
  conversionRate: "8.4",
  totalSpend: "$12.4K",
  campaignsGrowth: "+12",
  openRateGrowth: "+5.2",
  clickRateGrowth: "-2.1",
  conversionGrowth: "+3.7",
  spendGrowth: "+8.9"
};

export const mockChannelPerformance = [
  { id: "1", channel: "SMS", metric: "delivery_rate", value: "85", date: new Date() },
  { id: "2", channel: "WhatsApp", metric: "delivery_rate", value: "78", date: new Date() },
  { id: "3", channel: "Email", metric: "delivery_rate", value: "92", date: new Date() },
  { id: "4", channel: "Push", metric: "delivery_rate", value: "69", date: new Date() },
  { id: "5", channel: "RCS", metric: "delivery_rate", value: "74", date: new Date() },
];

export const mockBspProviders = [
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

export const mockCampaigns = [
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

export const mockFestivals = [
  { id: "1", name: "Christmas", date: new Date("2024-12-25"), emoji: "🎄", daysLeft: 12 },
  { id: "2", name: "New Year", date: new Date("2025-01-01"), emoji: "🎊", daysLeft: 19 },
  { id: "3", name: "Valentine's Day", date: new Date("2025-02-14"), emoji: "💝", daysLeft: 63 },
];
