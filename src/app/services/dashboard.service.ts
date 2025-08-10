import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { type Campaign, type AlertItem, type ChannelData, type BSPProvider } from '../models/campaign.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Campaign data methods
  getCampaigns(): Observable<Campaign[]> {
    // For now, return mock data - in real app would call this.http.get<Campaign[]>(`${this.apiUrl}/campaigns`)
    return of([
      {
        id: '1',
        name: 'Diwali Festival Sale',
        segment: 'Premium Customers (2.1k)',
        status: 'active',
        channel: 'WhatsApp',
        startAt: 'Oct 15, 3:25 PM',
        progress: 67,
        errors: 0,
        retryCost: 0
      },
      {
        id: '2',
        name: 'Service Reminder',
        segment: 'Service Due (5.2k)',
        status: 'scheduled',
        channel: 'SMS',
        startAt: 'Oct 16, 9:00 AM',
        progress: 0,
        errors: 0,
        retryCost: 0
      }
    ]);
  }

  getAlerts(): Observable<AlertItem[]> {
    return of([
      { id: "1", text: "Service Reminder campaign is starting at 3:25 PM", type: "info", time: "in 10m" },
      { id: "2", text: "Diwali Festival Sale just started execution", type: "success", time: "now" },
      { id: "3", text: "RCS pilot paused due to high bounce rate. Review BSP.", type: "warning" }
    ]);
  }

  getChannelData(): Observable<ChannelData[]> {
    return of([
      { name: "WhatsApp", delivery: 97.8, engagement: 82.1, cpm: 0.08, color: "#25D366", recommended: true },
      { name: "SMS", delivery: 94.2, engagement: 58.4, cpm: 0.12, color: "#FF6B6B" },
      { name: "Email", delivery: 96.0, engagement: 41.2, cpm: 0.03, color: "#4ECDC4" },
      { name: "Push", delivery: 92.5, engagement: 38.6, cpm: 0.02, color: "#45B7D1" },
      { name: "RCS", delivery: 89.3, engagement: 71.8, cpm: 0.15, color: "#96CEB4" }
    ]);
  }

  getBSPProviders(): Observable<BSPProvider[]> {
    return of([
      {
        name: "Gupshup",
        cost: 0.06,
        delivery: 98.2,
        engagement: 84.1,
        support: 4,
        tag: "best value",
        recommended: true
      },
      {
        name: "Twilio",
        cost: 0.08,
        delivery: 97.8,
        engagement: 82.3,
        support: 5,
        tag: "premium",
        recommended: false
      }
    ]);
  }

  // KPI methods
  getKPIData(): Observable<any> {
    return of({
      totalRevenue: "₹50.5L",
      campaignROI: "6.0x",
      messagesSent: "4.8M",
      conversionRate: "10.7%"
    });
  }

  // Real-time data simulation
  getRealTimeMetrics(): Observable<any> {
    return of({
      activeCampaigns: 6,
      messagesPerMinute: 1200,
      deliveryRate: 97.8,
      errorRate: 0.2
    });
  }
}