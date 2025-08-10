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
  revenue: string;
  roi: number;
  createdAt: Date;
  startedAt?: Date;
  scheduledAt?: Date;
  pausedAt?: Date;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
}

export interface BSPProvider {
  name: string;
  channel: string;
  cost: number;
  delivery: number;
  engagement: number;
  rating: number;
  status: 'recommended' | 'cost_efficient' | 'budget_option' | 'alternative';
  isActive: boolean;
}

export interface FestivalEvent {
  name: string;
  date: Date;
  revenue: number;
  conversion: number;
  roi: number;
  icon: string;
  color: string;
}

export interface InactiveCustomer {
  segment: string;
  count: number;
  potential: number;
  inactivityRate: number;
  inactivityLevel: number;
  status: 'active' | 'pending' | 'excluded';
  channel: string;
  icon: string;
}

export interface AIRecommendation {
  type: 'budget' | 'timing' | 'channel' | 'audience';
  title: string;
  description: string;
  impact: string;
  action: string;
  savings?: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

export interface CampaignNotification {
  id: string;
  type: 'starting' | 'active' | 'completed' | 'paused' | 'optimized';
  title: string;
  message: string;
  timestamp: Date;
  campaignName: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
  color: string;
}

export interface HeatMapData {
  day: string;
  timeSlots: { time: string; engagement: number; conversions: number }[];
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
      name: 'Diwali Car Sale 2024',
      type: 'Festival Promotion',
      status: 'completed',
      channels: ['WhatsApp'],
      targetAudience: 125000,
      sent: 125000,
      delivered: 122750,
      opened: 35187,
      clicked: 10056,
      converted: 3518,
      cost: '8745.00',
      revenue: '874500',
      roi: 12.4,
      deliveryRate: 98.2,
      openRate: 28.7,
      clickRate: 8.0,
      conversionRate: 2.8,
      createdAt: new Date('2024-10-15'),
      startedAt: new Date('2024-10-20')
    },
    {
      id: '2',
      name: 'Service Reminder Oct',
      type: 'Maintenance Alert',
      status: 'completed',
      channels: ['SMS'],
      targetAudience: 85000,
      sent: 85000,
      delivered: 82450,
      opened: 14841,
      clicked: 5936,
      converted: 1484,
      cost: '4123.00',
      revenue: '412300',
      roi: 8.2,
      deliveryRate: 97.0,
      openRate: 18.0,
      clickRate: 7.2,
      conversionRate: 1.8,
      createdAt: new Date('2024-09-28'),
      startedAt: new Date('2024-10-01')
    },
    {
      id: '3',
      name: 'New Model Launch',
      type: 'Product Announcement',
      status: 'completed',
      channels: ['Email'],
      targetAudience: 200000,
      sent: 200000,
      delivered: 192000,
      opened: 15360,
      clicked: 9216,
      converted: 1536,
      cost: '2874.00',
      revenue: '287400',
      roi: 5.8,
      deliveryRate: 96.0,
      openRate: 8.0,
      clickRate: 4.8,
      conversionRate: 0.8,
      createdAt: new Date('2024-10-10'),
      startedAt: new Date('2024-10-12')
    },
    {
      id: '4',
      name: 'Year End Offers',
      type: 'Discount Campaign',
      status: 'active',
      channels: ['Push'],
      targetAudience: 150000,
      sent: 150000,
      delivered: 138750,
      opened: 4162,
      clicked: 2081,
      converted: 416,
      cost: '1249.00',
      revenue: '124860',
      roi: 4.2,
      deliveryRate: 92.5,
      openRate: 3.0,
      clickRate: 1.5,
      conversionRate: 0.3,
      createdAt: new Date('2024-11-01'),
      startedAt: new Date('2024-11-15')
    },
    {
      id: '5',
      name: 'New Year Bonanza',
      type: 'Holiday Special',
      status: 'scheduled',
      channels: ['WhatsApp'],
      targetAudience: 75000,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      cost: '0',
      revenue: '0',
      roi: 0,
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
      createdAt: new Date('2024-12-15'),
      scheduledAt: new Date('2025-01-01')
    }
  ];

  private mockKpiMetrics: KpiMetric[] = [
    {
      label: 'Total Revenue',
      value: '₹50.5L',
      growth: '+18.5%',
      icon: 'pi-chart-line',
      color: 'blue'
    },
    {
      label: 'Campaign ROI',
      value: '6.0x',
      growth: '+2.1%',
      icon: 'pi-trending-up',
      color: 'green'
    },
    {
      label: 'Messages Sent',
      value: '4.8M',
      growth: '+15.2%',
      icon: 'pi-send',
      color: 'purple'
    },
    {
      label: 'Avg Conversion Rate',
      value: '10.7%',
      growth: '+3.2%',
      icon: 'pi-percentage',
      color: 'orange'
    },
    {
      label: 'Active Campaigns',
      value: '12',
      growth: '+25%',
      icon: 'pi-play-circle',
      color: 'emerald'
    }
  ];

  private mockChannelData: ChannelData[] = [
    { channel: 'SMS', value: 54.2, icon: 'pi-mobile', color: 'blue' },
    { channel: 'WhatsApp', value: 68.5, icon: 'pi-whatsapp', color: 'green' },
    { channel: 'Email', value: 32.1, icon: 'pi-envelope', color: 'red' },
    { channel: 'Push', value: 28.7, icon: 'pi-bell', color: 'purple' },
    { channel: 'RCS', value: 45.3, icon: 'pi-comments', color: 'orange' }
  ];

  private mockBSPProviders: BSPProvider[] = [
    {
      name: 'Cloud API',
      channel: 'WhatsApp',
      cost: 0.08,
      delivery: 97.8,
      engagement: 82.1,
      rating: 4.7,
      status: 'recommended',
      isActive: true
    },
    {
      name: 'MM Lite (Plivo)',
      channel: 'WhatsApp',
      cost: 0.25,
      delivery: 99.2,
      engagement: 85.3,
      rating: 4.8,
      status: 'cost_efficient',
      isActive: true
    },
    {
      name: 'Karix',
      channel: 'RCS',
      cost: 0.15,
      delivery: 92.1,
      engagement: 75.4,
      rating: 4.1,
      status: 'recommended',
      isActive: true
    },
    {
      name: 'TCL',
      channel: 'RCS',
      cost: 0.12,
      delivery: 89.3,
      engagement: 71.8,
      rating: 3.8,
      status: 'budget_option',
      isActive: false
    }
  ];

  private mockFestivalEvents: FestivalEvent[] = [
    {
      name: 'Diwali 2024',
      date: new Date('2024-10-31'),
      revenue: 8.7,
      conversion: 24.8,
      roi: 12.4,
      icon: 'pi-star',
      color: 'orange'
    },
    {
      name: 'Navratri',
      date: new Date('2024-10-15'),
      revenue: 5.2,
      conversion: 18.5,
      roi: 8.7,
      icon: 'pi-heart',
      color: 'purple'
    },
    {
      name: 'Holi',
      date: new Date('2024-03-25'),
      revenue: 4.1,
      conversion: 17.8,
      roi: 6.8,
      icon: 'pi-palette',
      color: 'blue'
    },
    {
      name: 'Independence Day',
      date: new Date('2024-08-15'),
      revenue: 3.8,
      conversion: 16.2,
      roi: 5.4,
      icon: 'pi-flag',
      color: 'green'
    }
  ];

  private mockInactiveCustomers: InactiveCustomer[] = [
    {
      segment: 'WhatsApp 90+ Days Inactive',
      count: 25000,
      potential: 27600,
      inactivityRate: 34.0,
      inactivityLevel: 34,
      status: 'active',
      channel: 'WhatsApp',
      icon: 'pi-whatsapp'
    },
    {
      segment: 'SMS Non-Responders 60+ Days',
      count: 18000,
      potential: 8100,
      inactivityRate: 30.0,
      inactivityLevel: 30,
      status: 'pending',
      channel: 'SMS',
      icon: 'pi-mobile'
    },
    {
      segment: 'Email Never Opened 45+ Days',
      count: 32000,
      potential: 6700,
      inactivityRate: 35.0,
      inactivityLevel: 35,
      status: 'excluded',
      channel: 'Email',
      icon: 'pi-envelope'
    }
  ];

  private mockAIRecommendations: AIRecommendation[] = [
    {
      type: 'budget',
      title: 'Budget Reallocation',
      description: 'Shift 30% SMS budget to WhatsApp to save ₹1.8L monthly while maintaining reach.',
      impact: 'Save ₹1.8L',
      action: 'Apply →',
      savings: '₹1.8L',
      priority: 'high',
      icon: 'pi-wallet'
    },
    {
      type: 'timing',
      title: 'Timing Optimization',
      description: '10-11 AM & 7-8 PM show 35% higher conversion rates. Schedule accordingly.',
      impact: 'Save ₹62.0K',
      action: 'Apply →',
      savings: '₹62.0K',
      priority: 'high',
      icon: 'pi-clock'
    },
    {
      type: 'channel',
      title: 'Channel Switch Recommendation',
      description: 'Switch to Cloud API for WhatsApp could save ₹28,000/month (₹0.07 per message).',
      impact: 'Analyze Impact →',
      action: 'Analyze',
      savings: '₹28K/month',
      priority: 'medium',
      icon: 'pi-sync'
    }
  ];

  private mockCampaignNotifications: CampaignNotification[] = [
    {
      id: '1',
      type: 'active',
      title: 'Campaign Execution Started',
      message: 'Year End Offers campaign has just started execution',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      campaignName: 'Year End Offers',
      priority: 'high',
      icon: 'pi-play-circle',
      color: 'green'
    },
    {
      id: '2',
      type: 'starting',
      title: 'Campaign Starting Soon',
      message: 'New Year Bonanza campaign is now going to start at 3:25 PM',
      timestamp: new Date(Date.now() + 4 * 60 * 60 * 1000),
      campaignName: 'New Year Bonanza',
      priority: 'medium',
      icon: 'pi-calendar',
      color: 'blue'
    },
    {
      id: '3',
      type: 'optimized',
      title: 'Budget Optimization Available',
      message: 'AI suggests reallocating budget for 25% better ROI',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      campaignName: 'Current Campaigns',
      priority: 'medium',
      icon: 'pi-lightbulb',
      color: 'purple'
    }
  ];

  private mockHeatMapData: HeatMapData[] = [
    {
      day: 'Sun', 
      timeSlots: [
        { time: '12 AM', engagement: 15, conversions: 5 },
        { time: '6 AM', engagement: 25, conversions: 8 },
        { time: '12 PM', engagement: 45, conversions: 15 },
        { time: '6 PM', engagement: 38, conversions: 12 }
      ]
    },
    {
      day: 'Mon',
      timeSlots: [
        { time: '12 AM', engagement: 12, conversions: 4 },
        { time: '6 AM', engagement: 35, conversions: 12 },
        { time: '12 PM', engagement: 55, conversions: 18 },
        { time: '6 PM', engagement: 42, conversions: 14 }
      ]
    },
    {
      day: 'Tue',
      timeSlots: [
        { time: '12 AM', engagement: 18, conversions: 6 },
        { time: '6 AM', engagement: 40, conversions: 14 },
        { time: '12 PM', engagement: 68, conversions: 25 },
        { time: '6 PM', engagement: 52, conversions: 18 }
      ]
    },
    {
      day: 'Wed',
      timeSlots: [
        { time: '12 AM', engagement: 14, conversions: 5 },
        { time: '6 AM', engagement: 38, conversions: 13 },
        { time: '12 PM', engagement: 62, conversions: 22 },
        { time: '6 PM', engagement: 48, conversions: 16 }
      ]
    },
    {
      day: 'Thu',
      timeSlots: [
        { time: '12 AM', engagement: 16, conversions: 5 },
        { time: '6 AM', engagement: 42, conversions: 15 },
        { time: '12 PM', engagement: 58, conversions: 20 },
        { time: '6 PM', engagement: 45, conversions: 15 }
      ]
    },
    {
      day: 'Fri',
      timeSlots: [
        { time: '12 AM', engagement: 20, conversions: 7 },
        { time: '6 AM', engagement: 35, conversions: 12 },
        { time: '12 PM', engagement: 50, conversions: 17 },
        { time: '6 PM', engagement: 60, conversions: 22 }
      ]
    },
    {
      day: 'Sat',
      timeSlots: [
        { time: '12 AM', engagement: 22, conversions: 8 },
        { time: '6 AM', engagement: 30, conversions: 10 },
        { time: '12 PM', engagement: 48, conversions: 16 },
        { time: '6 PM', engagement: 55, conversions: 20 }
      ]
    }
  ];

  constructor() { }

  getCampaigns(): Observable<Campaign[]> {
    return of(this.mockCampaigns).pipe(delay(500));
  }

  getKpiMetrics(): Observable<KpiMetric[]> {
    return of(this.mockKpiMetrics).pipe(delay(300));
  }

  getChannelPerformance(): Observable<ChannelData[]> {
    return of(this.mockChannelData).pipe(delay(400));
  }

  getBSPProviders(): Observable<BSPProvider[]> {
    return of(this.mockBSPProviders).pipe(delay(400));
  }

  getFestivalEvents(): Observable<FestivalEvent[]> {
    return of(this.mockFestivalEvents).pipe(delay(300));
  }

  getInactiveCustomers(): Observable<InactiveCustomer[]> {
    return of(this.mockInactiveCustomers).pipe(delay(400));
  }

  getAIRecommendations(): Observable<AIRecommendation[]> {
    return of(this.mockAIRecommendations).pipe(delay(350));
  }

  getCampaignNotifications(): Observable<CampaignNotification[]> {
    return of(this.mockCampaignNotifications).pipe(delay(200));
  }

  getHeatMapData(): Observable<HeatMapData[]> {
    return of(this.mockHeatMapData).pipe(delay(450));
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

  // Simulate data age detection for progressive section loading
  getDataAge(): number {
    return 45; // Simulate 45 days of data available
  }

  // Get sections based on data availability
  getAvailableSections(): string[] {
    const dataAge = this.getDataAge();
    const baseSections = ['kpi', 'campaigns', 'channels', 'monitoring', 'bsp', 'ai'];
    
    if (dataAge >= 30) {
      baseSections.push('inactive-customers');
    }
    if (dataAge >= 45) {
      baseSections.push('festival-calendar');
    }
    if (dataAge >= 60) {
      baseSections.push('advanced-analytics');
    }
    
    return baseSections;
  }
}