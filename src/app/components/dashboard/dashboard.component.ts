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

  // Date range and filter options - Only 2 options as requested
  dateRangeOptions = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 15 Days', value: '15d' }
  ];

  channelOptions = [
    { label: 'All Channels', value: 'all' },
    { label: 'SMS', value: 'sms' },
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'Email', value: 'email' },
    { label: 'Push', value: 'push' },
    { label: 'RCS', value: 'rcs' }
  ];

  performanceMetrics = [
    { label: 'Conversions', value: 'conversions' },
    { label: 'Click Rate', value: 'clicks' },
    { label: 'Open Rate', value: 'opens' },
    { label: 'Revenue', value: 'revenue' }
  ];
  
  selectedDateRange = '7d';
  selectedChannel = 'all';
  selectedPerformanceMetric = 'conversions';
  
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

  // Channel Performance Data matching screenshots
  channelPerformanceData = [
    { name: 'SMS', icon: 'pi pi-mobile', iconClass: 'sms', percentage: 100, value: '15,709', colorClass: 'blue' },
    { name: 'WhatsApp', icon: 'pi pi-whatsapp', iconClass: 'whatsapp', percentage: 75, value: '11,304', colorClass: 'green' },
    { name: 'Email', icon: 'pi pi-envelope', iconClass: 'email', percentage: 55, value: '8,762', colorClass: 'purple' },
    { name: 'Push', icon: 'pi pi-bell', iconClass: 'push', percentage: 40, value: '5,977', colorClass: 'orange' }
  ];

  // Heatmap data for the grid - exact from screenshots
  heatmapData = [
    { name: 'Sun', hours: [
      { percentage: 6, intensity: 'low' },
      { percentage: 12, intensity: 'low' },
      { percentage: 16, intensity: 'medium' },
      { percentage: 24, intensity: 'medium' }
    ]},
    { name: 'Mon', hours: [
      { percentage: 12, intensity: 'low' },
      { percentage: 24, intensity: 'medium' },
      { percentage: 36, intensity: 'medium' },
      { percentage: 48, intensity: 'high' }
    ]},
    { name: 'Tue', hours: [
      { percentage: 16, intensity: 'medium' },
      { percentage: 36, intensity: 'medium' },
      { percentage: 54, intensity: 'high' },
      { percentage: 72, intensity: 'high' }
    ]},
    { name: 'Wed', hours: [
      { percentage: 24, intensity: 'medium' },
      { percentage: 48, intensity: 'high' },
      { percentage: 72, intensity: 'high' },
      { percentage: 96, intensity: 'very-high' }
    ]},
    { name: 'Thu', hours: [
      { percentage: 20, intensity: 'medium' },
      { percentage: 60, intensity: 'high' },
      { percentage: 50, intensity: 'high' },
      { percentage: 36, intensity: 'medium' }
    ]},
    { name: 'Fri', hours: [
      { percentage: 36, intensity: 'medium' },
      { percentage: 72, intensity: 'high' },
      { percentage: 56, intensity: 'high' },
      { percentage: 96, intensity: 'very-high' }
    ]},
    { name: 'Sat', hours: [
      { percentage: 42, intensity: 'high' },
      { percentage: 64, intensity: 'high' },
      { percentage: 36, intensity: 'medium' },
      { percentage: 50, intensity: 'high' }
    ]}
  ];

  // Peak Hours data
  peakHours = [
    { time: '6 AM', percentage: 45 },
    { time: '12 PM', percentage: 75 },
    { time: '6 PM', percentage: 90 }
  ];

  // Campaign Cards Data - matching screenshot data
  visibleCampaignCards = [
    {
      name: 'Flash Sale Alert',
      channel: 'SMS Campaign',
      status: 'Executing',
      statusClass: 'executing',
      statusIcon: 'pi pi-play',
      icon: 'pi pi-mobile',
      progressPercentage: 67,
      sent: '89K',
      target: '132K',
      spent: '₹29K',
      conversions: '1234',
      budgetUsage: 64.2
    },
    {
      name: 'Weekend Offer',
      channel: 'WhatsApp',
      status: 'Scheduled',
      statusClass: 'scheduled',
      statusIcon: 'pi pi-clock',
      icon: 'pi pi-whatsapp',
      progressPercentage: 0,
      sent: '0K',
      target: '88K',
      spent: '₹0K',
      conversions: '0',
      budgetUsage: 0.0
    },
    {
      name: 'Service Reminder',
      channel: 'Email Campaign',
      status: 'Paused',
      statusClass: 'paused',
      statusIcon: 'pi pi-pause',
      icon: 'pi pi-envelope',
      progressPercentage: 23,
      sent: '12K',
      target: '54K',
      spent: '₹9K',
      conversions: '89',
      budgetUsage: 38.7
    }
  ];

  // Store all campaign cards for filtering - 10 campaigns with different statuses
  allCampaignCards = [
    {
      name: 'Flash Sale Alert',
      channel: 'SMS',
      status: 'Executing',
      statusClass: 'executing',
      statusIcon: 'pi pi-play',
      icon: 'pi pi-mobile',
      progressPercentage: 67,
      sent: '89K',
      target: '134K',
      spent: '₹29K',
      conversions: '1234',
      budgetUsage: 67.2
    },
    {
      name: 'Weekend Offer',
      channel: 'WhatsApp',
      status: 'Scheduled',
      statusClass: 'scheduled',
      statusIcon: 'pi pi-clock',
      icon: 'pi pi-whatsapp',
      progressPercentage: 0,
      sent: '0K',
      target: '88K',
      spent: '₹0K',
      conversions: '0',
      budgetUsage: 0.0
    },
    {
      name: 'Service Reminder',
      channel: 'Email',
      status: 'Paused',
      statusClass: 'paused',
      statusIcon: 'pi pi-pause',
      icon: 'pi pi-envelope',
      progressPercentage: 23,
      sent: '12K',
      target: '54K',
      spent: '₹9K',
      conversions: '89',
      budgetUsage: 38.7
    },
    {
      name: 'Product Launch',
      channel: 'Push',
      status: 'Failed',
      statusClass: 'failed',
      statusIcon: 'pi pi-times',
      icon: 'pi pi-bell',
      progressPercentage: 12,
      sent: '3K',
      target: '25K',
      spent: '₹2K',
      conversions: '12',
      budgetUsage: 8.0
    },
    {
      name: 'Festival Campaign',
      channel: 'RCS',
      status: 'Executing',
      statusClass: 'executing',
      statusIcon: 'pi pi-play',
      icon: 'pi pi-comments',
      progressPercentage: 85,
      sent: '156K',
      target: '180K',
      spent: '₹45K',
      conversions: '2890',
      budgetUsage: 82.5
    },
    {
      name: 'Black Friday',
      channel: 'Email',
      status: 'Completed',
      statusClass: 'completed',
      statusIcon: 'pi pi-check',
      icon: 'pi pi-envelope',
      progressPercentage: 100,
      sent: '245K',
      target: '245K',
      spent: '₹67K',
      conversions: '4567',
      budgetUsage: 100.0
    },
    {
      name: 'New User Onboarding',
      channel: 'SMS',
      status: 'Executing',
      statusClass: 'executing',
      statusIcon: 'pi pi-play',
      icon: 'pi pi-mobile',
      progressPercentage: 34,
      sent: '67K',
      target: '200K',
      spent: '₹18K',
      conversions: '567',
      budgetUsage: 35.2
    },
    {
      name: 'App Update Notification',
      channel: 'Push',
      status: 'Scheduled',
      statusClass: 'scheduled',
      statusIcon: 'pi pi-clock',
      icon: 'pi pi-bell',
      progressPercentage: 0,
      sent: '0K',
      target: '1.2M',
      spent: '₹0K',
      conversions: '0',
      budgetUsage: 0.0
    },
    {
      name: 'Customer Feedback',
      channel: 'WhatsApp',
      status: 'Paused',
      statusClass: 'paused',
      statusIcon: 'pi pi-pause',
      icon: 'pi pi-whatsapp',
      progressPercentage: 45,
      sent: '78K',
      target: '170K',
      spent: '₹25K',
      conversions: '234',
      budgetUsage: 48.9
    },
    {
      name: 'Holiday Wishes',
      channel: 'RCS',
      status: 'Failed',
      statusClass: 'failed',
      statusIcon: 'pi pi-times',
      icon: 'pi pi-comments',
      progressPercentage: 8,
      sent: '5K',
      target: '60K',
      spent: '₹3K',
      conversions: '15',
      budgetUsage: 12.5
    }
  ];

  // Campaign Table Data - initialized after allCampaignCards
  campaignTableData: any[] = [];
  
  // KPI Data object for template binding
  kpiData = {
    totalCampaigns: 148,
    totalSpend: '₹12.5L',
    totalRevenue: '₹50.5L',
    avgConversion: '10.7%',
    activeUsers: '2.4M'
  };

  constructor(private campaignDataService: CampaignDataService) {}

  ngOnInit(): void {
    // Initialize campaign table data from allCampaignCards
    this.campaignTableData = this.allCampaignCards.map(campaign => ({
      name: campaign.name,
      channel: campaign.channel,
      status: campaign.status,
      statusClass: campaign.statusClass,
      statusIcon: campaign.statusIcon,
      icon: campaign.icon,
      progressPercentage: campaign.progressPercentage,
      sent: campaign.sent,
      conversions: campaign.conversions,
      spent: campaign.spent
    }));
    
    this.updateCampaignDataFilters();
  }

  onChannelChange() {
    console.log('Channel changed to:', this.selectedChannel);
    // Update KPIs based on selected channel
    this.updateKPIData();
    // Update weekly overview based on selected channel
    this.updateWeeklyOverviewData();
  }

  onDateRangeChange() {
    console.log('Date range changed to:', this.selectedDateRange);
    // Update KPIs based on selected date range
    this.updateKPIData();
    // Update weekly overview based on selected date range
    this.updateWeeklyOverviewData();
  }

  onTimeFilterChange(): void {
    this.updateCampaignDataFilters();
  }

  onStatusFilterChange(): void {
    this.updateCampaignDataFilters();
  }

  updateCampaignDataFilters(): void {
    let filteredCards = [...this.allCampaignCards];
    
    // Filter by status
    if (this.selectedStatusFilter !== 'all') {
      filteredCards = filteredCards.filter(campaign => 
        campaign.statusClass === this.selectedStatusFilter
      );
    }
    
    // Filter by time (simplified logic)
    if (this.selectedTimeFilter === 'today') {
      filteredCards = filteredCards.filter(campaign => 
        campaign.statusClass === 'executing'
      );
    }
    
    // Show all filtered cards (up to 10)
    this.visibleCampaignCards = filteredCards;
  }

  applyFilters(): void {
    // Apply filters ONLY to KPIs and weekly overview - NOT channel performance
    console.log('Applying filters - Channel:', this.selectedChannel, 'Date Range:', this.selectedDateRange);
    
    // Update KPIs based on filters
    this.updateKPIData();
    
    // Update weekly overview data based on filters
    // Channel filtering only affects KPIs and weekly overview, NOT channel performance
    
    // Update heatmap data (not affected by channel filter)
    this.updateHeatmapData();
    
    // Update campaign data (not affected by channel filter)
    this.updateCampaignDataFilters();
  }

  updateKPIData(): void {
    // Update KPIs based on selected channel and date range
    const baseData = {
      '7d': { campaigns: 12, spend: 95000, revenue: 380000, conversion: 8.5, users: 1800000 },
      '15d': { campaigns: 18, spend: 185000, revenue: 505000, conversion: 10.7, users: 2400000 }
    };
    
    const data = baseData[this.selectedDateRange] || baseData['7d'];
    
    // Apply channel-specific multipliers
    let multiplier = 1.0;
    switch(this.selectedChannel) {
      case 'sms': multiplier = 0.8; break;
      case 'whatsapp': multiplier = 1.2; break;
      case 'email': multiplier = 0.9; break;
      case 'push': multiplier = 0.7; break;
      case 'rcs': multiplier = 1.1; break;
      default: multiplier = 1.0; // all channels
    }
    
    // Update KPI values
    this.totalCampaigns = Math.round(data.campaigns * multiplier);
    this.totalSpend = Math.round(data.spend * multiplier);
    
    // Update the actual KPI card values in the template
    this.kpiData = {
      totalCampaigns: this.totalCampaigns,
      totalSpend: `₹${(this.totalSpend/100000).toFixed(1)}L`,
      totalRevenue: `₹${(data.revenue * multiplier/100000).toFixed(1)}L`,
      avgConversion: `${(data.conversion * multiplier).toFixed(1)}%`,
      activeUsers: `${(data.users * multiplier/1000000).toFixed(1)}M`
    };
  }



  updateWeeklyOverviewData(): void {
    // Update weekly overview data based on selected channel and date range
    console.log('Updating weekly overview data for channel:', this.selectedChannel, 'date range:', this.selectedDateRange);
    
    // Apply channel and date range filters to weekly data
    const baseMultiplier = this.selectedDateRange === '7d' ? 0.7 : 1.0;
    let channelMultiplier = 1.0;
    
    switch(this.selectedChannel) {
      case 'sms': channelMultiplier = 0.8; break;
      case 'whatsapp': channelMultiplier = 1.2; break;
      case 'email': channelMultiplier = 0.9; break;
      case 'push': channelMultiplier = 0.7; break;
      case 'rcs': channelMultiplier = 1.1; break;
      default: channelMultiplier = 1.0; // all channels
    }
    
    const multiplier = baseMultiplier * channelMultiplier;
    
    // Update weekly summary totals
    this.totalActiveCampaigns = Math.round(14 * multiplier);
    this.totalScheduledCampaigns = Math.round(19 * multiplier);
    this.totalWeeklyCampaigns = Math.round(52 * multiplier);
    
    // Update individual day data
    this.weekDays = this.weekDays.map(day => ({
      ...day,
      campaignCount: Math.round(day.campaignCount * multiplier),
      live: Math.round(day.live * multiplier),
      scheduled: Math.round(day.scheduled * multiplier),
      paused: Math.round(day.paused * multiplier)
    }));
  }



  updateHeatmapData(): void {
    // Update heatmap based on date range
    if (this.selectedDateRange === '7d') {
      // Show last 7 days heatmap data
      console.log('Updating heatmap for last 7 days');
    } else {
      // Show last 15 days heatmap data
      console.log('Updating heatmap for last 15 days');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Methods for component functionality
  toggleWeeklyOverview(): void {
    this.weeklyOverviewExpanded = !this.weeklyOverviewExpanded;
  }

  setViewMode(mode: 'cards' | 'table'): void {
    this.viewMode = mode;
  }

  nextCards(): void {
    if (this.currentCardPage < this.totalCardPages - 1) {
      this.currentCardPage++;
    }
  }

  previousCards(): void {
    if (this.currentCardPage > 0) {
      this.currentCardPage--;
    }
  }

  // Campaign action methods
  pauseCampaign(campaign: any): void {
    campaign.status = 'Paused';
    campaign.statusClass = 'paused';
    campaign.statusIcon = 'pi pi-pause';
    this.updateCampaignInAllLists(campaign);
  }

  resumeCampaign(campaign: any): void {
    campaign.status = 'Executing';
    campaign.statusClass = 'executing';
    campaign.statusIcon = 'pi pi-play';
    this.updateCampaignInAllLists(campaign);
  }

  startCampaign(campaign: any): void {
    campaign.status = 'Executing';
    campaign.statusClass = 'executing';
    campaign.statusIcon = 'pi pi-play';
    this.updateCampaignInAllLists(campaign);
  }

  deleteCampaign(campaign: any): void {
    const tableIndex = this.campaignTableData.indexOf(campaign);
    if (tableIndex > -1) {
      this.campaignTableData.splice(tableIndex, 1);
    }
    const cardIndex = this.visibleCampaignCards.indexOf(campaign);
    if (cardIndex > -1) {
      this.visibleCampaignCards.splice(cardIndex, 1);
    }
  }

  retryCampaign(campaign: any): void {
    campaign.status = 'Executing';
    campaign.statusClass = 'executing';
    campaign.statusIcon = 'pi pi-play';
    this.updateCampaignInAllLists(campaign);
  }

  // Helper method to update campaign status across all lists
  private updateCampaignInAllLists(updatedCampaign: any): void {
    // Update in table data
    const tableIndex = this.campaignTableData.findIndex(c => c.name === updatedCampaign.name);
    if (tableIndex > -1) {
      this.campaignTableData[tableIndex].status = updatedCampaign.status;
      this.campaignTableData[tableIndex].statusClass = updatedCampaign.statusClass;
      this.campaignTableData[tableIndex].statusIcon = updatedCampaign.statusIcon;
    }

    // Update in visible campaign cards
    const cardIndex = this.visibleCampaignCards.findIndex(c => c.name === updatedCampaign.name);
    if (cardIndex > -1) {
      this.visibleCampaignCards[cardIndex].status = updatedCampaign.status;
      this.visibleCampaignCards[cardIndex].statusClass = updatedCampaign.statusClass;
      this.visibleCampaignCards[cardIndex].statusIcon = updatedCampaign.statusIcon;
    }
  }

  // Helper methods
  getLimitedDotsArray(count: number, limit: number): number[] {
    return Array(Math.min(count, limit)).fill(0);
  }

  trackByCampaignName(index: number, campaign: any): string {
    return campaign.name;
  }
}