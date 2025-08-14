import { Component, OnInit } from '@angular/core';

interface TemplatePerformance {
  id: string;
  name: string;
  channel: string;
  type: 'promotional' | 'transactional' | 'reminder' | 'notification';
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
  testStatus: 'active' | 'completed' | 'draft';
  createdDate: Date;
  lastUsed: Date;
}

@Component({
  selector: 'app-template-performance',
  templateUrl: './template-performance.component.html',
  styleUrls: ['./template-performance.component.scss']
})
export class TemplatePerformanceComponent implements OnInit {
  templates: TemplatePerformance[] = [];
  selectedChannel = 'all';
  selectedType = 'all';
  sortBy = 'conversionRate';
  sortOrder = 'desc';
  
  channelOptions = [
    { label: 'All Channels', value: 'all' },
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'SMS', value: 'SMS' },
    { label: 'Email', value: 'Email' },
    { label: 'Push', value: 'Push' }
  ];

  typeOptions = [
    { label: 'All Types', value: 'all' },
    { label: 'Promotional', value: 'promotional' },
    { label: 'Transactional', value: 'transactional' },
    { label: 'Reminder', value: 'reminder' },
    { label: 'Notification', value: 'notification' }
  ];

  sortOptions = [
    { label: 'Conversion Rate', value: 'conversionRate' },
    { label: 'Click Rate', value: 'clickRate' },
    { label: 'Open Rate', value: 'openRate' },
    { label: 'ROI', value: 'roi' },
    { label: 'Revenue', value: 'revenue' }
  ];

  abTestResults = [
    {
      testName: 'Diwali Sale Subject Lines',
      templates: [
        { name: 'Template A: "🎉 Diwali Sale - 50% OFF Everything!"', conversionRate: 8.4, winner: true },
        { name: 'Template B: "Limited Time: Diwali Deals Inside"', conversionRate: 6.2, winner: false }
      ],
      significance: 94.2,
      improvement: '+35.5%',
      status: 'completed'
    },
    {
      testName: 'WhatsApp CTA Buttons',
      templates: [
        { name: 'Template A: "Shop Now" Button', conversionRate: 12.1, winner: true },
        { name: 'Template B: "View Offers" Button', conversionRate: 9.8, winner: false }
      ],
      significance: 88.7,
      improvement: '+23.5%',
      status: 'completed'
    },
    {
      testName: 'SMS Length Optimization',
      templates: [
        { name: 'Template A: Short (120 chars)', conversionRate: 7.8, winner: false },
        { name: 'Template B: Medium (160 chars)', conversionRate: 9.2, winner: true }
      ],
      significance: 91.3,
      improvement: '+17.9%',
      status: 'active'
    }
  ];

  ngOnInit(): void {
    this.loadTemplateData();
  }

  loadTemplateData(): void {
    this.templates = [
      {
        id: 'tpl_001',
        name: 'Diwali Festival Sale - Premium',
        channel: 'WhatsApp',
        type: 'promotional',
        sent: 15400,
        delivered: 14820,
        opened: 12650,
        clicked: 2890,
        converted: 1245,
        revenue: 187500,
        openRate: 85.4,
        clickRate: 22.8,
        conversionRate: 8.1,
        ctr: 18.8,
        roi: 4.2,
        testStatus: 'active',
        createdDate: new Date('2025-08-01'),
        lastUsed: new Date('2025-08-14')
      },
      {
        id: 'tpl_002',
        name: 'Order Confirmation Standard',
        channel: 'SMS',
        type: 'transactional',
        sent: 28900,
        delivered: 28750,
        opened: 27200,
        clicked: 4580,
        converted: 3240,
        revenue: 324000,
        openRate: 94.6,
        clickRate: 16.8,
        conversionRate: 11.2,
        ctr: 15.9,
        roi: 8.7,
        testStatus: 'completed',
        createdDate: new Date('2025-07-15'),
        lastUsed: new Date('2025-08-14')
      },
      {
        id: 'tpl_003',
        name: 'Weekly Newsletter - Tech Updates',
        channel: 'Email',
        type: 'notification',
        sent: 45600,
        delivered: 43780,
        opened: 19850,
        clicked: 2980,
        converted: 890,
        revenue: 125600,
        openRate: 45.3,
        clickRate: 15.0,
        conversionRate: 2.0,
        ctr: 6.6,
        roi: 2.8,
        testStatus: 'active',
        createdDate: new Date('2025-08-10'),
        lastUsed: new Date('2025-08-14')
      },
      {
        id: 'tpl_004',
        name: 'Cart Abandonment Reminder',
        channel: 'Push',
        type: 'reminder',
        sent: 12800,
        delivered: 11950,
        opened: 8960,
        clicked: 1890,
        converted: 756,
        revenue: 95400,
        openRate: 75.0,
        clickRate: 21.1,
        conversionRate: 5.9,
        ctr: 15.8,
        roi: 3.4,
        testStatus: 'active',
        createdDate: new Date('2025-08-05'),
        lastUsed: new Date('2025-08-13')
      },
      {
        id: 'tpl_005',
        name: 'App Update Notification',
        channel: 'Push',
        type: 'notification',
        sent: 89400,
        delivered: 82300,
        opened: 34560,
        clicked: 4120,
        converted: 2890,
        revenue: 58900,
        openRate: 42.0,
        clickRate: 11.9,
        conversionRate: 3.2,
        ctr: 4.9,
        roi: 1.8,
        testStatus: 'completed',
        createdDate: new Date('2025-07-28'),
        lastUsed: new Date('2025-08-12')
      }
    ];
  }

  getFilteredTemplates(): TemplatePerformance[] {
    let filtered = this.templates.filter(template => {
      const channelMatch = this.selectedChannel === 'all' || template.channel === this.selectedChannel;
      const typeMatch = this.selectedType === 'all' || template.type === this.selectedType;
      return channelMatch && typeMatch;
    });

    // Sort templates
    filtered.sort((a, b) => {
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];
      
      if (this.sortOrder === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });

    return filtered;
  }

  getPerformanceClass(value: number, metric: string): string {
    let threshold = { low: 0, high: 0 };
    
    switch (metric) {
      case 'conversionRate':
        threshold = { low: 3, high: 8 };
        break;
      case 'openRate':
        threshold = { low: 40, high: 80 };
        break;
      case 'clickRate':
        threshold = { low: 10, high: 20 };
        break;
      case 'roi':
        threshold = { low: 2, high: 5 };
        break;
    }
    
    if (value >= threshold.high) return 'performance-high';
    if (value >= threshold.low) return 'performance-medium';
    return 'performance-low';
  }

  getChannelIcon(channel: string): string {
    const icons = {
      WhatsApp: 'pi-whatsapp',
      SMS: 'pi-mobile',
      Email: 'pi-envelope',
      Push: 'pi-bell'
    };
    return icons[channel] || 'pi-circle';
  }

  getTypeIcon(type: string): string {
    const icons = {
      promotional: 'pi-megaphone',
      transactional: 'pi-shopping-cart',
      reminder: 'pi-clock',
      notification: 'pi-bell'
    };
    return icons[type] || 'pi-circle';
  }

  getStatusClass(status: string): string {
    const classes = {
      active: 'status-active',
      completed: 'status-completed',
      draft: 'status-draft'
    };
    return classes[status] || 'status-default';
  }

  onChannelChange(): void {
    // Filter handled by getFilteredTemplates()
  }

  onTypeChange(): void {
    // Filter handled by getFilteredTemplates()
  }

  onSortChange(): void {
    // Sort handled by getFilteredTemplates()
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
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

  getBarWidth(conversionRate: number, templates: any[]): number {
    const maxRate = Math.max(...templates.map(t => t.conversionRate));
    return (conversionRate / maxRate) * 100;
  }
}