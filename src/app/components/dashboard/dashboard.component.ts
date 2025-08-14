import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CampaignDataService } from '../../services/campaign-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Date range and filter options
  dateRangeOptions = [
    { label: '7 Days', value: '7d' },
    { label: '15 Days', value: '15d' },
    { label: '30 Days', value: '30d' },
    { label: '45 Days', value: '45d' },
    { label: '60 Days', value: '60d' },
    { label: '90 Days', value: '90d' }
  ];

  channelOptions = [
    { label: 'All Channels', value: 'all' },
    { label: 'SMS', value: 'sms' },
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'Email', value: 'email' },
    { label: 'Push', value: 'push' },
    { label: 'RCS', value: 'rcs' }
  ];
  
  selectedDateRange = '45d';
  selectedChannel = 'all';
  
  // Dashboard state
  isLiveUpdatesActive = true;
  dataAge = 45;
  isDarkMode = false;
  isRefreshing = false;
  
  // Live notifications
  showLiveNotification = true;
  liveNotification = 'Campaign "Flash Sale" completed with 12.4% conversion rate • 2m ago';
  
  // Campaign monitoring
  viewMode: 'cards' | 'table' = 'cards';
  selectedTimeFilter = 'today';
  selectedStatusFilter = 'all';
  currentCardPage = 0;
  totalCardPages = 2;
  
  timeFilterOptions = [
    { label: 'Last Hour', value: 'hour' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: '7d' }
  ];
  
  statusFilterOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Paused', value: 'paused' },
    { label: 'Completed', value: 'completed' },
    { label: 'Failed', value: 'failed' }
  ];
  
  // Campaign summary data
  totalCampaigns = 18;
  activeCampaigns = 12;
  totalReach = 2450000;
  totalSpend = 185000;

  // Weekly Campaign Overview Data
  weeklyOverviewExpanded = false;
  totalActiveCampaigns = 14;
  totalScheduledCampaigns = 19;
  totalWeeklyCampaigns = 52;

  weekDays = [
    { name: 'Thu', number: 14, campaignCount: 6, live: 3, scheduled: 2, paused: 1, status: 'Moderate' },
    { name: 'Fri', number: 15, campaignCount: 6, live: 2, scheduled: 3, paused: 1, status: 'Moderate' },
    { name: 'Sat', number: 16, campaignCount: 5, live: 2, scheduled: 1, paused: 2, status: 'Light' },
    { name: 'Sun', number: 17, campaignCount: 8, live: 1, scheduled: 5, paused: 2, status: 'Heavy' },
    { name: 'Mon', number: 18, campaignCount: 7, live: 1, scheduled: 5, paused: 1, status: 'Moderate' },
    { name: 'Tue', number: 19, campaignCount: 10, live: 5, scheduled: 4, paused: 1, status: 'Heavy' },
    { name: 'Wed', number: 20, campaignCount: 8, live: 1, scheduled: 5, paused: 2, status: 'Heavy' }
  ];
  
  // Channel Performance Data
  channelMetrics = [
    {
      name: 'WhatsApp',
      icon: 'pi pi-whatsapp',
      color: '#25D366',
      deliveryRate: 96.8,
      openRate: 89.2,
      ctr: 12.4,
      costPerMessage: 0.45
    },
    {
      name: 'SMS',
      icon: 'pi pi-mobile',
      color: '#007bff',
      deliveryRate: 98.5,
      openRate: 95.1,
      ctr: 8.7,
      costPerMessage: 0.25
    },
    {
      name: 'Email',
      icon: 'pi pi-envelope',
      color: '#dc3545',
      deliveryRate: 94.2,
      openRate: 28.3,
      ctr: 3.8,
      costPerMessage: 0.08
    },
    {
      name: 'Push',
      icon: 'pi pi-bell',
      color: '#fd7e14',
      deliveryRate: 97.1,
      openRate: 42.6,
      ctr: 6.9,
      costPerMessage: 0.02
    },
    {
      name: 'RCS',
      icon: 'pi pi-comments',
      color: '#6f42c1',
      deliveryRate: 95.3,
      openRate: 78.4,
      ctr: 15.2,
      costPerMessage: 0.65
    }
  ];

  // Heatmap data
  heatmapViews = [
    { label: 'Engagement Rate', value: 'engagement' },
    { label: 'Click Rate', value: 'clicks' },
    { label: 'Conversion Rate', value: 'conversions' }
  ];
  
  selectedHeatmapView = 'engagement';
  hours = Array.from({length: 24}, (_, i) => i);
  
  // Campaign monitoring data
  isCardView = true;

  // Channel data for the new design
  channelData = [
    { name: 'WhatsApp', percentage: 85, value: 20500, color: '#25D366', trend: 8, avgCost: '0.08' },
    { name: 'Email', percentage: 65, value: 15200, color: '#dc3545', trend: -2, avgCost: '0.01' },
    { name: 'SMS', percentage: 45, value: 8900, color: '#007bff', trend: 5, avgCost: '0.02' },
    { name: 'Push', percentage: 25, value: 3400, color: '#fd7e14', trend: 12, avgCost: '0.05' },
    { name: 'RCS', percentage: 20, value: 2100, color: '#6f42c1', trend: 28, avgCost: '0.15' }
  ];

  // Heatmap data for the grid
  heatmapData = [
    { name: 'Sun', slots: [
      { value: 6, intensity: 'low' },
      { value: 12, intensity: 'low' },
      { value: 38, intensity: 'medium' },
      { value: 24, intensity: 'low' }
    ]},
    { name: 'Mon', slots: [
      { value: 12, intensity: 'low' },
      { value: 24, intensity: 'medium' },
      { value: 36, intensity: 'medium' },
      { value: 48, intensity: 'high' }
    ]},
    { name: 'Tue', slots: [
      { value: 18, intensity: 'medium' },
      { value: 36, intensity: 'medium' },
      { value: 54, intensity: 'high' },
      { value: 72, intensity: 'high' }
    ]},
    { name: 'Wed', slots: [
      { value: 24, intensity: 'medium' },
      { value: 48, intensity: 'high' },
      { value: 72, intensity: 'high' },
      { value: 58, intensity: 'high' }
    ]},
    { name: 'Thu', slots: [
      { value: 30, intensity: 'medium' },
      { value: 60, intensity: 'high' },
      { value: 50, intensity: 'high' },
      { value: 36, intensity: 'medium' }
    ]},
    { name: 'Fri', slots: [
      { value: 36, intensity: 'medium' },
      { value: 72, intensity: 'high' },
      { value: 48, intensity: 'high' },
      { value: 56, intensity: 'high' }
    ]},
    { name: 'Sat', slots: [
      { value: 42, intensity: 'high' },
      { value: 64, intensity: 'high' },
      { value: 36, intensity: 'medium' },
      { value: 50, intensity: 'high' }
    ]}
  ];

  // Time performance data for the heatmap legend
  timePerformance = [
    { label: '6 AM', performance: 75 },
    { label: '12 PM', performance: 85 },
    { label: '6 PM', performance: 90 }
  ];

  // All campaigns data
  allCampaigns = [
    {
      name: 'Diwali Festival Sale',
      status: 'active',
      audience: 'Active Buyers',
      channel: 'WhatsApp',
      progress: 78,
      sent: '160,000',
      total: '200,000',
      dateCreated: '2025-08-05'
    },
    {
      name: 'New Model Launch',
      status: 'active',
      audience: 'Leads 300',
      channel: 'Orchestrate',
      progress: 46,
      sent: '93,300',
      total: '200,000',
      dateCreated: '2025-08-08'
    },
    {
      name: 'Service Reminder',
      status: 'completed',
      audience: 'Service Due 70',
      channel: 'SMS',
      progress: 100,
      sent: '75,000',
      total: '75,000',
      dateCreated: '2025-08-03'
    },
    {
      name: 'Summer Sale Alert',
      status: 'paused',
      audience: 'All Users',
      channel: 'Email',
      progress: 25,
      sent: '50,000',
      total: '200,000',
      dateCreated: '2025-07-28'
    },
    {
      name: 'Weekly Newsletter',
      status: 'completed',
      audience: 'Subscribers',
      channel: 'Email',
      progress: 100,
      sent: '180,000',
      total: '180,000',
      dateCreated: '2025-07-20'
    },
    {
      name: 'Product Update',
      status: 'active',
      audience: 'Premium Users',
      channel: 'Push',
      progress: 89,
      sent: '45,000',
      total: '50,000',
      dateCreated: '2025-08-09'
    }
  ];
  
  // Visible campaigns for carousel (filtered)
  visibleCampaigns = [];
  
  campaigns = [
    {
      id: 1,
      name: 'Festival Sale 2024',
      status: 'Running',
      segment: 'Premium Customers',
      channel: 'WhatsApp',
      audienceSize: 125000,
      progressPercentage: 78,
      sent: 97500,
      delivered: 94275,
      errorCount: 125,
      deliveryRate: 96.7,
      aiSuggestions: [
        { icon: 'pi pi-clock', color: '#28a745', text: 'Optimal send time: 2-4 PM' },
        { icon: 'pi pi-lightbulb', color: '#ffc107', text: 'A/B test subject line' }
      ]
    },
    {
      id: 2,
      name: 'Product Launch Alert',
      status: 'Paused',
      segment: 'Tech Enthusiasts',
      channel: 'Email',
      audienceSize: 85000,
      progressPercentage: 45,
      sent: 38250,
      delivered: 36021,
      errorCount: 0,
      deliveryRate: 94.2,
      aiSuggestions: [
        { icon: 'pi pi-users', color: '#17a2b8', text: 'Expand target segment' },
        { icon: 'pi pi-chart-bar', color: '#dc3545', text: 'Low engagement detected' }
      ]
    },
    {
      id: 3,
      name: 'Weekly Newsletter',
      status: 'Completed',
      segment: 'All Subscribers',
      channel: 'Email',
      audienceSize: 450000,
      progressPercentage: 100,
      sent: 450000,
      delivered: 423900,
      errorCount: 2100,
      deliveryRate: 94.2,
      aiSuggestions: [
        { icon: 'pi pi-check-circle', color: '#28a745', text: 'Campaign completed successfully' }
      ]
    },
    {
      id: 4,
      name: 'Flash Sale Reminder',
      status: 'Running',
      segment: 'Cart Abandoners',
      channel: 'SMS',
      audienceSize: 28000,
      progressPercentage: 92,
      sent: 25760,
      delivered: 25373,
      errorCount: 15,
      deliveryRate: 98.5,
      aiSuggestions: [
        { icon: 'pi pi-bolt', color: '#ffc107', text: 'High urgency working well' }
      ]
    },
    {
      id: 5,
      name: 'App Update Notification',
      status: 'Running',
      segment: 'Mobile Users',
      channel: 'Push',
      audienceSize: 180000,
      progressPercentage: 67,
      sent: 120600,
      delivered: 117143,
      errorCount: 450,
      deliveryRate: 97.1,
      aiSuggestions: [
        { icon: 'pi pi-mobile', color: '#17a2b8', text: 'Good mobile engagement' }
      ]
    },
    {
      id: 6,
      name: 'Loyalty Program Invite',
      status: 'Draft',
      segment: 'High-Value Customers',
      channel: 'RCS',
      audienceSize: 15000,
      progressPercentage: 0,
      sent: 0,
      delivered: 0,
      errorCount: 0,
      deliveryRate: 0,
      aiSuggestions: [
        { icon: 'pi pi-star', color: '#6f42c1', text: 'RCS rich media recommended' }
      ]
    }
  ];

  // Cost optimization data
  optimizationViews = [
    { label: 'CPM Analysis', value: 'cpm' },
    { label: 'CPC Analysis', value: 'cpc' },
    { label: 'CPL Analysis', value: 'cpl' }
  ];
  
  selectedOptimizationView = 'cpm';
  
  costMetrics = {
    cpm: 12.50,
    cpmChange: -8.2,
    cpc: 0.85,
    cpcChange: 5.1,
    cpl: 45.20,
    cplChange: -12.5
  };
  
  cpmBreakdown = [
    { channel: 'WhatsApp', value: 18.20 },
    { channel: 'SMS', value: 8.50 },
    { channel: 'Email', value: 2.80 },
    { channel: 'Push', value: 1.20 },
    { channel: 'RCS', value: 24.50 }
  ];
  
  cpcBreakdown = [
    { channel: 'WhatsApp', value: 1.25 },
    { channel: 'SMS', value: 0.95 },
    { channel: 'Email', value: 0.45 },
    { channel: 'Push', value: 0.35 },
    { channel: 'RCS', value: 1.85 }
  ];
  
  cplBreakdown = [
    { channel: 'WhatsApp', value: 52.30 },
    { channel: 'SMS', value: 38.90 },
    { channel: 'Email', value: 28.50 },
    { channel: 'Push', value: 25.80 },
    { channel: 'RCS', value: 75.60 }
  ];

  // Orchestration analysis data
  orchestrationViews = [
    { label: 'Fallback Analysis', value: 'fallback' },
    { label: 'Journey Flow', value: 'journey' },
    { label: 'Channel Sequence', value: 'sequence' }
  ];
  
  selectedOrchestrationView = 'fallback';
  
  orchestrationFlow = [
    {
      channel: 'WhatsApp',
      icon: 'pi pi-whatsapp',
      color: '#25D366',
      attempts: 125000,
      successRate: 96.8,
      fallbackRate: 3.2
    },
    {
      channel: 'SMS',
      icon: 'pi pi-mobile',
      color: '#007bff',
      attempts: 4000,
      successRate: 98.5,
      fallbackRate: 1.5
    },
    {
      channel: 'Email',
      icon: 'pi pi-envelope',
      color: '#dc3545',
      attempts: 60,
      successRate: 94.2,
      fallbackRate: 0
    }
  ];
  
  orchestrationInsights = {
    primarySuccess: 96.8,
    fallbackUsage: 3.2,
    overallDelivery: 98.1
  };

  // BSP Performance data
  bspProviders = [
    { name: 'Twilio', id: 'twilio', icon: 'pi pi-phone', color: '#F22F46' },
    { name: 'SendGrid', id: 'sendgrid', icon: 'pi pi-send', color: '#1A82E2' },
    { name: 'MessageBird', id: 'messagebird', icon: 'pi pi-twitter', color: '#2481D7' },
    { name: 'Plivo', id: 'plivo', icon: 'pi pi-volume-up', color: '#00B388' },
    { name: 'TextLocal', id: 'textlocal', icon: 'pi pi-comments', color: '#FF6B35' }
  ];
  
  selectedBSPs = ['twilio', 'sendgrid', 'messagebird'];
  
  bspMetrics = [
    { label: 'Delivery Rate', value: 'delivery_rate' },
    { label: 'Response Time', value: 'response_time' },
    { label: 'Cost per Message', value: 'cost_per_message' },
    { label: 'Uptime', value: 'uptime' }
  ];
  
  selectedBSPMetric = 'delivery_rate';

  // Festival timeline data  
  festivalRegions = [
    { label: 'All India', value: 'all-india' },
    { label: 'North India', value: 'north' },
    { label: 'South India', value: 'south' },
    { label: 'West India', value: 'west' },
    { label: 'East India', value: 'east' }
  ];
  
  selectedRegion = 'all-india';
  currentMonth = 'August';
  currentYear = 2025;
  showCampaignCalendar = false; // Default to collapsed for better UX
  
  upcomingFestivals = [
    {
      id: 1,
      name: 'Raksha Bandhan',
      date: new Date('2025-08-19'),
      description: 'Festival celebrating sibling bonds',
      expectedEngagement: 35,
      optimalWindow: '3-5 days before'
    },
    {
      id: 2,
      name: 'Ganesh Chaturthi',
      date: new Date('2025-08-29'),
      description: 'Hindu festival honoring Lord Ganesha',
      expectedEngagement: 45,
      optimalWindow: '5-7 days before'
    },
    {
      id: 3,
      name: 'Dussehra',
      date: new Date('2025-10-02'),
      description: 'Victory of good over evil',
      expectedEngagement: 55,
      optimalWindow: '7-10 days before'
    }
  ];

  // Budget calculator data
  budgetScenario = {
    budget: 50000,
    audience: 100000,
    primaryChannel: 'whatsapp',
    duration: 7
  };
  
  projections = {
    messagesSent: 95000,
    coverage: 95,
    expectedOpens: 84750,
    openRate: 89.2,
    expectedClicks: 11790,
    clickRate: 12.4,
    expectedConversions: 1179,
    conversionRate: 1.2,
    roi: 245,
    projectedRevenue: 122500
  };
  
  optimizationSuggestions = [
    {
      icon: 'pi pi-clock',
      color: '#28a745',
      text: 'Send at 2-4 PM for 15% better engagement',
      impact: '+15% CTR'
    },
    {
      icon: 'pi pi-users',
      color: '#17a2b8',
      text: 'A/B test two message variants',
      impact: '+8% conversion'
    },
    {
      icon: 'pi pi-chart-line',
      color: '#ffc107',
      text: 'Add SMS fallback for failed deliveries',
      impact: '+3% reach'
    }
  ];

  // Notification system - already declared above
  
  // Performance vs Budget data
  selectedCampaignForAnalysis = '';
  campaignAnalysisOptions = [
    { label: 'Select Campaign', value: '' },
    { label: 'Diwali Festival Sale', value: 'diwali-sale' },
    { label: 'New Model Launch', value: 'model-launch' },
    { label: 'Service Reminder', value: 'service-reminder' }
  ];
  
  campaignPerformanceData = {
    preCost: 25000,
    postCost: 18500,
    preRevenue: 85000,
    postRevenue: 122000,
    preConversion: 8.5,
    postConversion: 12.3,
    preROI: 240,
    postROI: 559
  };
  
  constructor(private campaignDataService: CampaignDataService) {}

  ngOnInit(): void {
    this.updateDataAge();
    this.calculateProjections();
    this.startLiveUpdatesSimulation();
    this.filterCampaigns();
  }

  // Weekly Campaign Overview Methods
  toggleWeeklyOverview(): void {
    this.weeklyOverviewExpanded = !this.weeklyOverviewExpanded;
  }

  getDotsArray(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i);
  }

  getLimitedDotsArray(count: number, maxDots: number): number[] {
    const limitedCount = Math.min(count, maxDots);
    return Array(limitedCount).fill(0).map((_, i) => i);
  }

  getChannelIcon(channelName: string): string {
    const iconMap: { [key: string]: string } = {
      'SMS': 'comment',
      'WhatsApp': 'whatsapp',
      'Email': 'envelope',
      'Push': 'bell',
      'RCS': 'comments'
    };
    return iconMap[channelName] || 'chart-bar';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Utility methods
  formatNumber(num: number): string {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + ' L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  updateDataAge(): void {
    const rangeMap: { [key: string]: number } = {
      '7d': 7,
      '15d': 15,
      '30d': 30,
      '45d': 45,
      '60d': 60,
      '90d': 90
    };
    this.dataAge = rangeMap[this.selectedDateRange] || 45;
  }

  // Event handlers
  onCreateCampaign(): void {
    this.showNotification('New campaign creation started!');
  }

  onDateRangeChange(): void {
    this.updateDataAge();
    this.refreshAllData();
  }

  onChannelChange(): void {
    this.refreshChannelData();
  }

  // Refresh methods
  refreshChannelData(): void {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
      this.showNotification('Channel data refreshed successfully!');
    }, 1500);
  }

  refreshCampaignData(): void {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
      this.showNotification('Campaign data refreshed successfully!');
    }, 2000);
  }

  refreshAllData(): void {
    this.refreshChannelData();
    this.refreshCampaignData();
  }

  // Campaign monitoring methods
  toggleViewMode(): void {
    this.isCardView = !this.isCardView;
  }

  setViewMode(mode: 'cards' | 'table'): void {
    this.viewMode = mode;
  }
  
  onTimeFilterChange(): void {
    this.filterCampaigns();
  }
  
  onStatusFilterChange(): void {
    this.filterCampaigns();
  }
  
  filterCampaigns(): void {
    let filtered = [...this.allCampaigns];
    
    // Filter by status
    if (this.selectedStatusFilter !== 'all-statuses') {
      filtered = filtered.filter(campaign => campaign.status === this.selectedStatusFilter);
    }
    
    // Filter by date (simple simulation based on dateCreated)
    const now = new Date();
    if (this.selectedTimeFilter === 'last-7-days') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(campaign => new Date(campaign.dateCreated) >= sevenDaysAgo);
    } else if (this.selectedTimeFilter === 'last-30-days') {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(campaign => new Date(campaign.dateCreated) >= thirtyDaysAgo);
    }
    
    this.visibleCampaigns = filtered.slice(0, 3); // Show first 3 for carousel
  }
  
  // Inactive customer methods
  createExclusionList(): void {
    this.showNotification('Exclusion list created for 24.5K inactive customers');
  }
  
  createWinbackCampaign(): void {
    this.showNotification('Win-back campaign template created for inactive customers');
  }
  
  // Campaign calendar methods
  planCampaign(festival: string): void {
    this.showNotification(`Campaign planning started for ${festival}`);
  }
  
  toggleCampaignCalendar(): void {
    this.showCampaignCalendar = !this.showCampaignCalendar;
    this.showNotification(this.showCampaignCalendar ? 'Campaign calendar expanded' : 'Campaign calendar collapsed');
  }
  
  // Performance vs Budget methods
  onCampaignAnalysisChange(): void {
    if (this.selectedCampaignForAnalysis) {
      this.loadCampaignPerformanceData();
    }
  }
  
  // Enhanced functionality methods
  showRetryCostModal(campaign: any): void {
    const cost = this.calculateRetryCost(campaign);
    this.showNotification(`Retry cost for "${campaign.name}": ₹${cost}. Proceeding with retry...`);
  }
  
  calculateRetryCost(campaign: any): number {
    const failedMessages = campaign.total - campaign.sent;
    const costPerMessage = 0.5; // Sample cost
    return Math.round(failedMessages * costPerMessage);
  }
  
  getCampaignCost(campaign: any): number {
    return Math.round(campaign.sent * 0.5); // Sample calculation
  }
  
  updateVisibleCampaigns(): void {
    const startIndex = this.currentCardPage * 3;
    const endIndex = startIndex + 3;
    this.visibleCampaigns = this.allCampaigns.slice(startIndex, endIndex);
  }
  
  loadCampaignPerformanceData(): void {
    // Simulate different data based on selected campaign
    if (this.selectedCampaignForAnalysis === 'diwali-sale') {
      this.campaignPerformanceData = {
        preCost: 32000,
        postCost: 24500,
        preRevenue: 98000,
        postRevenue: 145000,
        preConversion: 9.2,
        postConversion: 14.8,
        preROI: 206,
        postROI: 491
      };
    } else if (this.selectedCampaignForAnalysis === 'model-launch') {
      this.campaignPerformanceData = {
        preCost: 18000,
        postCost: 15200,
        preRevenue: 65000,
        postRevenue: 89000,
        preConversion: 6.8,
        postConversion: 11.2,
        preROI: 261,
        postROI: 485
      };
    }
  }

  previousCampaigns(): void {
    if (this.currentCardPage > 0) {
      this.currentCardPage--;
    }
  }

  nextCampaigns(): void {
    if (this.currentCardPage < this.totalCardPages - 1) {
      this.currentCardPage++;
    }
  }

  getCurrentPageCampaigns() {
    const startIndex = this.currentCardPage * 3;
    return this.campaigns.slice(startIndex, startIndex + 3);
  }

  getCampaignStatusSeverity(status: string): string {
    const severityMap: { [key: string]: string } = {
      'Running': 'success',
      'Paused': 'warning',
      'Completed': 'info',
      'Draft': 'secondary',
      'Failed': 'danger'
    };
    return severityMap[status] || 'secondary';
  }

  getProgressBarClass(status: string): string {
    return status === 'Running' ? 'progress-running' : 
           status === 'Completed' ? 'progress-completed' : 'progress-paused';
  }

  getDeliveryRateClass(rate: number): string {
    return rate >= 95 ? 'delivery-excellent' : 
           rate >= 85 ? 'delivery-good' : 'delivery-poor';
  }

  resumeCampaign(campaignName: string): void {
    this.showNotification(`Campaign "${campaignName}" has been resumed`);
  }

  pauseCampaign(campaignName: string): void {
    this.showNotification(`Campaign "${campaignName}" has been paused`);
  }

  retryCampaign(campaignId: number): void {
    const campaign = this.campaigns.find(c => c.id === campaignId);
    if (campaign) {
      campaign.errorCount = 0;
      this.showNotification(`Retry initiated for campaign "${campaign.name}"!`);
    }
  }

  viewCampaignDetails(campaignName: string): void {
    this.showNotification(`Opening details for campaign: ${campaignName}`);
  }

  // Heatmap methods
  getEngagementRate(hour: number, dayIndex: number): number {
    // Simulate realistic engagement patterns
    const baseRate = Math.random() * 30 + 20;
    const peakHours = [10, 11, 14, 15, 19, 20];
    const weekendBoost = (dayIndex === 5 || dayIndex === 6) ? 5 : 0;
    const peakBoost = peakHours.includes(hour) ? 15 : 0;
    
    return Math.round(Math.min(baseRate + weekendBoost + peakBoost, 85));
  }

  getHeatmapColor(rate: number): string {
    const intensity = rate / 100;
    const red = Math.round(255 * (1 - intensity));
    const green = Math.round(255 * intensity);
    return `rgb(${red}, ${green}, 100)`;
  }

  getHeatColor(value: number): string {
    if (value <= 20) return '#e5f3ff';  // Very light blue
    if (value <= 40) return '#b3d9ff';  // Light blue  
    if (value <= 60) return '#66b3ff';  // Medium blue
    if (value <= 80) return '#1a8cff';  // Dark blue
    return '#0066cc';                   // Very dark blue
  }

  getHeatmapTooltip(hour: number, dayIndex: number): string {
    const day = this.weekDays[dayIndex];
    const rate = this.getEngagementRate(hour, dayIndex);
    return `${day} ${hour}:00 - Engagement: ${rate}%`;
  }

  // Section expansion
  expandSection(sectionName: string): void {
    console.log('Expanding section:', sectionName);
    // Future implementation: open section in modal or expand view
  }

  // BSP methods
  getSelectedBSPs() {
    return this.bspProviders
      .filter(bsp => this.selectedBSPs.includes(bsp.id))
      .map(bsp => ({
        ...bsp,
        rating: Math.round(Math.random() * 2) + 3, // 3-5 stars
        deliveryRate: Math.round(Math.random() * 15) + 85, // 85-100%
        responseTime: Math.round(Math.random() * 500) + 100, // 100-600ms
        costPerMessage: (Math.random() * 0.5 + 0.2).toFixed(2), // 0.2-0.7
        uptime: (Math.random() * 2 + 98).toFixed(1), // 98-100%
        type: ['SMS', 'Email', 'WhatsApp'][Math.floor(Math.random() * 3)],
        recommendation: this.getBSPRecommendation(bsp.name)
      }));
  }

  getBSPRecommendation(name: string): string {
    const recommendations: { [key: string]: string } = {
      'Twilio': 'Best for reliability and global reach. Recommended for critical campaigns.',
      'SendGrid': 'Excellent email deliverability. Great for newsletter campaigns.',
      'MessageBird': 'Good balance of cost and performance. Suitable for bulk messaging.',
      'Plivo': 'Cost-effective option with decent performance. Good for budget campaigns.',
      'TextLocal': 'Regional specialist with competitive pricing for local campaigns.'
    };
    return recommendations[name] || 'Good performance for standard campaigns.';
  }

  // Festival methods
  previousMonth(): void {
    // Implementation for navigating to previous month
    console.log('Navigate to previous month');
  }

  nextMonth(): void {
    // Implementation for navigating to next month
    console.log('Navigate to next month');
  }

  planFestivalCampaign(festivalId: number): void {
    const festival = this.upcomingFestivals.find(f => f.id === festivalId);
    if (festival) {
      this.showNotification(`Campaign planning started for ${festival.name}!`);
    }
  }

  // Budget calculator methods
  calculateProjections(): void {
    const channelRates: { [key: string]: any } = {
      'whatsapp': { cost: 0.45, open: 89.2, click: 12.4, conversion: 1.2 },
      'sms': { cost: 0.25, open: 95.1, click: 8.7, conversion: 0.8 },
      'email': { cost: 0.08, open: 28.3, click: 3.8, conversion: 0.5 },
      'push': { cost: 0.02, open: 42.6, click: 6.9, conversion: 0.9 },
      'rcs': { cost: 0.65, open: 78.4, click: 15.2, conversion: 1.5 }
    };

    const rates = channelRates[this.budgetScenario.primaryChannel] || channelRates.whatsapp;
    const maxMessages = Math.floor(this.budgetScenario.budget / rates.cost);
    const messagesSent = Math.min(maxMessages, this.budgetScenario.audience);
    
    this.projections = {
      messagesSent,
      coverage: Math.round((messagesSent / this.budgetScenario.audience) * 100),
      expectedOpens: Math.round(messagesSent * rates.open / 100),
      openRate: rates.open,
      expectedClicks: Math.round(messagesSent * rates.click / 100),
      clickRate: rates.click,
      expectedConversions: Math.round(messagesSent * rates.conversion / 100),
      conversionRate: rates.conversion,
      roi: Math.round((messagesSent * rates.conversion / 100 * 100 / this.budgetScenario.budget) * 100),
      projectedRevenue: messagesSent * rates.conversion / 100 * 100 // Assuming ₹100 per conversion
    };
  }

  saveBudgetScenario(): void {
    this.showNotification('Budget scenario saved successfully!');
  }

  // Notification methods
  showNotification(message: string): void {
    this.liveNotification = message;
    this.showLiveNotification = true;
    setTimeout(() => {
      this.showLiveNotification = false;
    }, 4000);
  }

  startLiveUpdatesSimulation(): void {
    // Simulate live updates every 30 seconds
    setInterval(() => {
      if (this.isLiveUpdatesActive) {
        // Update some random metrics
        this.totalReach += Math.floor(Math.random() * 1000);
        this.totalSpend += Math.floor(Math.random() * 100);
        
        // Update random campaign progress
        const runningCampaigns = this.campaigns.filter(c => c.status === 'Running');
        if (runningCampaigns.length > 0) {
          const randomCampaign = runningCampaigns[Math.floor(Math.random() * runningCampaigns.length)];
          if (randomCampaign.progressPercentage < 100) {
            randomCampaign.progressPercentage = Math.min(randomCampaign.progressPercentage + Math.floor(Math.random() * 5), 100);
            randomCampaign.sent = Math.floor((randomCampaign.progressPercentage / 100) * randomCampaign.audienceSize);
            randomCampaign.delivered = Math.floor(randomCampaign.sent * (randomCampaign.deliveryRate / 100));
          }
        }
      }
    }, 30000);
  }

  toggleLiveUpdates(): void {
    this.isLiveUpdatesActive = !this.isLiveUpdatesActive;
    this.showNotification(this.isLiveUpdatesActive ? 'Live updates enabled!' : 'Live updates paused!');
  }
}