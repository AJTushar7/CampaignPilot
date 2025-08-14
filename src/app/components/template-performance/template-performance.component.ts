import { Component, OnInit } from '@angular/core';

interface Campaign {
  id: string;
  name: string;
  channel: string;
  status: 'active' | 'completed' | 'paused';
  totalSent: number;
  startDate: Date;
  endDate?: Date;
}

interface TemplateComparison {
  templateId: string;
  templateName: string;
  type: 'A' | 'B' | 'C';
  content: string;
  subject?: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  ctr: number;
  roi: number;
  // Analysis insights
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

interface SegmentPerformance {
  segmentName: string;
  audience: string;
  sent: number;
  conversionRate: number;
  revenue: number;
  bestTemplate: string;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

interface BSPComparison {
  provider: string;
  deliveryRate: number;
  cost: number;
  speed: string;
  reliability: number;
  recommendation: string;
}

interface SchedulingAnalysis {
  timeSlot: string;
  dayOfWeek: string;
  deliveryRate: number;
  engagementRate: number;
  conversionRate: number;
  bestFor: string;
  recommendation: string;
}

@Component({
  selector: 'app-template-performance',
  templateUrl: './template-performance.component.html',
  styleUrls: ['./template-performance.component.scss']
})
export class TemplatePerformanceComponent implements OnInit {
  campaigns: Campaign[] = [];
  selectedCampaign: Campaign | null = null;
  
  // Analysis data for selected campaign
  templateComparisons: TemplateComparison[] = [];
  segmentPerformance: SegmentPerformance[] = [];
  bspComparison: BSPComparison[] = [];
  schedulingAnalysis: SchedulingAnalysis[] = [];
  
  // View controls
  activeTab: 'templates' | 'segments' | 'bsp' | 'scheduling' = 'templates';
  comparisonMode: 'side-by-side' | 'overlay' | 'insights' = 'side-by-side';

  ngOnInit(): void {
    this.loadCampaigns();
    this.selectDefaultCampaign();
  }

  loadCampaigns(): void {
    this.campaigns = [
      {
        id: 'camp_001',
        name: 'Diwali Festival Flash Sale',
        channel: 'WhatsApp',
        status: 'completed',
        totalSent: 125000,
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-08-10')
      },
      {
        id: 'camp_002', 
        name: 'Back to School Campaign',
        channel: 'Email',
        status: 'active',
        totalSent: 89000,
        startDate: new Date('2025-08-05'),
      },
      {
        id: 'camp_003',
        name: 'Weekend Sale Blast',
        channel: 'SMS',
        status: 'completed',
        totalSent: 56000,
        startDate: new Date('2025-07-28'),
        endDate: new Date('2025-07-30')
      },
      {
        id: 'camp_004',
        name: 'App Launch Announcement',
        channel: 'Push',
        status: 'paused',
        totalSent: 203000,
        startDate: new Date('2025-08-08'),
      }
    ];
  }

  selectDefaultCampaign(): void {
    if (this.campaigns.length > 0) {
      this.selectedCampaign = this.campaigns[0];
      this.loadCampaignAnalysis();
    }
  }

  onCampaignChange(): void {
    if (this.selectedCampaign) {
      this.loadCampaignAnalysis();
    }
  }

  loadCampaignAnalysis(): void {
    if (!this.selectedCampaign) return;

    // Load template comparisons based on selected campaign
    this.templateComparisons = this.getTemplateComparisons(this.selectedCampaign.id);
    this.segmentPerformance = this.getSegmentPerformance(this.selectedCampaign.id);
    this.bspComparison = this.getBSPComparison(this.selectedCampaign.id);
    this.schedulingAnalysis = this.getSchedulingAnalysis(this.selectedCampaign.id);
  }

  getTemplateComparisons(campaignId: string): TemplateComparison[] {
    // Mock data - would normally come from API
    if (campaignId === 'camp_001') {
      return [
        {
          templateId: 'tpl_a_001',
          templateName: 'Diwali Template A - Emoji Heavy',
          type: 'A',
          content: '🎉 DIWALI MEGA SALE! 🪔 Get 50% OFF on everything! ✨ Limited time offer! Shop now: [link]',
          sent: 62500,
          delivered: 61200,
          opened: 52900,
          clicked: 12100,
          converted: 5200,
          revenue: 650000,
          openRate: 86.4,
          clickRate: 22.9,
          conversionRate: 8.3,
          ctr: 19.4,
          roi: 5.2,
          strengths: ['High emoji engagement', 'Clear urgency message', 'Strong CTA'],
          weaknesses: ['May appear spammy', 'Emoji overload on some devices'],
          recommendations: ['Reduce emoji count by 30%', 'A/B test without emojis', 'Improve mobile rendering']
        },
        {
          templateId: 'tpl_b_001',
          templateName: 'Diwali Template B - Minimal Text',
          type: 'B',
          content: 'Diwali Special: 50% off everything. Limited time. Shop now: [link]',
          sent: 62500,
          delivered: 61800,
          opened: 48200,
          clicked: 9600,
          converted: 3800,
          revenue: 475000,
          openRate: 78.0,
          clickRate: 19.9,
          conversionRate: 6.1,
          ctr: 15.5,
          roi: 3.8,
          strengths: ['Clean, professional look', 'High delivery rate', 'Clear message'],
          weaknesses: ['Lower engagement', 'Less emotional appeal', 'Weak urgency'],
          recommendations: ['Add time-specific urgency', 'Include personalization', 'Test with festival greeting']
        }
      ];
    }
    return [];
  }

  getSegmentPerformance(campaignId: string): SegmentPerformance[] {
    if (campaignId === 'camp_001') {
      return [
        {
          segmentName: 'Premium Customers',
          audience: 'High-value buyers (₹10k+ orders)',
          sent: 25000,
          conversionRate: 12.4,
          revenue: 387500,
          bestTemplate: 'Template B - Minimal Text',
          performance: 'excellent'
        },
        {
          segmentName: 'Young Shoppers (18-25)',
          audience: 'Mobile-first generation',
          sent: 45000,
          conversionRate: 9.8,
          revenue: 441000,
          bestTemplate: 'Template A - Emoji Heavy',
          performance: 'good'
        },
        {
          segmentName: 'Family Buyers (26-40)',
          audience: 'Parents and professionals',
          sent: 35000,
          conversionRate: 7.2,
          revenue: 252000,
          bestTemplate: 'Template B - Minimal Text',
          performance: 'average'
        },
        {
          segmentName: 'Senior Customers (40+)',
          audience: 'Traditional buyers',
          sent: 20000,
          conversionRate: 4.5,
          revenue: 90000,
          bestTemplate: 'Template B - Minimal Text',
          performance: 'poor'
        }
      ];
    }
    return [];
  }

  getBSPComparison(campaignId: string): BSPComparison[] {
    return [
      {
        provider: 'Twilio',
        deliveryRate: 96.8,
        cost: 0.045,
        speed: '< 2 seconds',
        reliability: 99.2,
        recommendation: 'Best for premium segments'
      },
      {
        provider: 'Gupshup',
        deliveryRate: 94.2,
        cost: 0.038,
        speed: '< 5 seconds',
        reliability: 97.8,
        recommendation: 'Good balance cost/performance'
      },
      {
        provider: 'ValueFirst',
        deliveryRate: 91.5,
        cost: 0.032,
        speed: '< 8 seconds',
        reliability: 95.1,
        recommendation: 'Cost-effective for bulk campaigns'
      }
    ];
  }

  getSchedulingAnalysis(campaignId: string): SchedulingAnalysis[] {
    return [
      {
        timeSlot: '9:00 AM - 11:00 AM',
        dayOfWeek: 'Tuesday',
        deliveryRate: 97.2,
        engagementRate: 23.4,
        conversionRate: 8.9,
        bestFor: 'Professional segments',
        recommendation: 'Ideal for B2B and working professionals'
      },
      {
        timeSlot: '7:00 PM - 9:00 PM',
        dayOfWeek: 'Friday',
        deliveryRate: 95.8,
        engagementRate: 31.2,
        conversionRate: 12.1,
        bestFor: 'Young shoppers',
        recommendation: 'Peak engagement for leisure shopping'
      },
      {
        timeSlot: '11:00 AM - 1:00 PM',
        dayOfWeek: 'Sunday',
        deliveryRate: 94.1,
        engagementRate: 18.7,
        conversionRate: 6.2,
        bestFor: 'Family segments',
        recommendation: 'Good for family-oriented campaigns'
      }
    ];
  }

  setActiveTab(tab: 'templates' | 'segments' | 'bsp' | 'scheduling'): void {
    this.activeTab = tab;
  }

  setComparisonMode(mode: 'side-by-side' | 'overlay' | 'insights'): void {
    this.comparisonMode = mode;
  }

  getWinnerTemplate(): TemplateComparison | null {
    if (this.templateComparisons.length === 0) return null;
    return this.templateComparisons.reduce((prev, current) => 
      prev.conversionRate > current.conversionRate ? prev : current
    );
  }

  getPerformanceClass(value: number, metric: string): string {
    let threshold = { low: 0, high: 0 };
    
    switch (metric) {
      case 'conversionRate':
        threshold = { low: 5, high: 10 };
        break;
      case 'openRate':
        threshold = { low: 70, high: 85 };
        break;
      case 'clickRate':
        threshold = { low: 15, high: 25 };
        break;
      case 'roi':
        threshold = { low: 3, high: 5 };
        break;
    }
    
    if (value >= threshold.high) return 'performance-excellent';
    if (value >= threshold.low) return 'performance-good';
    return 'performance-poor';
  }

  getSegmentPerformanceClass(performance: string): string {
    const classes = {
      excellent: 'segment-excellent',
      good: 'segment-good', 
      average: 'segment-average',
      poor: 'segment-poor'
    };
    return classes[performance] || 'segment-average';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('en-IN').format(value);
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }
}