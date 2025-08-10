import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Campaign {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'scheduled' | 'completed';
  channels: string[];
  targetAudience: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  cost: string;
  createdAt: Date;
  startedAt?: Date;
  scheduledAt?: Date;
  pausedAt?: Date;
}

export interface KpiMetric {
  label: string;
  value: string;
  growth: string;
  icon: string;
  color: string;
}

export interface ChannelData {
  channel: string;
  value: number;
  icon: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignDataService {

  private mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summer Sale Campaign',
      type: 'Promotional',
      status: 'active',
      channels: ['SMS', 'Email'],
      targetAudience: 15234,
      sent: 15234,
      delivered: 14892,
      opened: 10234,
      clicked: 3567,
      converted: 1234,
      cost: '1250.00',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      startedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Welcome Series',
      type: 'Onboarding',
      status: 'scheduled',
      channels: ['WhatsApp'],
      targetAudience: 2457,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      cost: '189.00',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      scheduledAt: new Date(Date.now() + 18 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Product Launch',
      type: 'Announcement',
      status: 'paused',
      channels: ['SMS', 'Email', 'Push'],
      targetAudience: 8543,
      sent: 8543,
      delivered: 8234,
      opened: 4567,
      clicked: 1234,
      converted: 456,
      cost: '567.00',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      pausedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];

  private mockKpiMetrics: KpiMetric[] = [
    {
      label: 'Total Campaigns',
      value: '24',
      growth: '+12%',
      icon: 'pi-megaphone',
      color: 'blue'
    },
    {
      label: 'Open Rate',
      value: '68.5%',
      growth: '+5.2%',
      icon: 'pi-envelope-open',
      color: 'green'
    },
    {
      label: 'Click Rate',
      value: '24.8%',
      growth: '-2.1%',
      icon: 'pi-cursor',
      color: 'orange'
    },
    {
      label: 'Conversion Rate',
      value: '8.4%',
      growth: '+3.7%',
      icon: 'pi-chart-line',
      color: 'purple'
    },
    {
      label: 'Total Spend',
      value: '$12.4K',
      growth: '+8.9%',
      icon: 'pi-dollar',
      color: 'emerald'
    }
  ];

  private mockChannelData: ChannelData[] = [
    { channel: 'SMS', value: 85, icon: 'pi-mobile', color: 'blue' },
    { channel: 'WhatsApp', value: 78, icon: 'pi-whatsapp', color: 'green' },
    { channel: 'Email', value: 92, icon: 'pi-envelope', color: 'red' },
    { channel: 'Push', value: 69, icon: 'pi-bell', color: 'purple' },
    { channel: 'RCS', value: 74, icon: 'pi-comments', color: 'orange' }
  ];

  constructor() { }

  getCampaigns(): Observable<Campaign[]> {
    return of(this.mockCampaigns).pipe(delay(500)); // Simulate API delay
  }

  getKpiMetrics(): Observable<KpiMetric[]> {
    return of(this.mockKpiMetrics).pipe(delay(300));
  }

  getChannelPerformance(): Observable<ChannelData[]> {
    return of(this.mockChannelData).pipe(delay(400));
  }

  getCampaignById(id: string): Observable<Campaign | undefined> {
    const campaign = this.mockCampaigns.find(c => c.id === id);
    return of(campaign).pipe(delay(200));
  }

  updateCampaignStatus(id: string, status: Campaign['status']): Observable<Campaign | null> {
    const campaign = this.mockCampaigns.find(c => c.id === id);
    if (campaign) {
      campaign.status = status;
      if (status === 'active') {
        campaign.startedAt = new Date();
      } else if (status === 'paused') {
        campaign.pausedAt = new Date();
      }
      return of(campaign).pipe(delay(300));
    }
    return of(null);
  }
}