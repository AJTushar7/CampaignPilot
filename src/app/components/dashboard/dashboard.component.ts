import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignDataService } from '../../services/campaign-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  dateRangeOptions = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 15 days', value: '15d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 45 days', value: '45d' },
    { label: 'Last 60 days', value: '60d' },
    { label: 'Last 90 days', value: '90d' }
  ];
  
  channelOptions = [
    { label: 'All Channels', value: 'all' },
    { label: 'SMS', value: 'sms' },
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'Email', value: 'email' },
    { label: 'Push', value: 'push' },
    { label: 'RCS', value: 'rcs' }
  ];
  
  selectedDateRange = '45d'; // Start with 45 days to show more features
  selectedChannel = 'all';
  
  // Dashboard state
  isLiveUpdatesActive = true;
  dataAge = 45; // Dynamic based on selected range
  availableSections: string[] = [];
  
  // Real-time notification for demo
  liveNotification = '';
  showLiveNotification = false;
  
  // Dashboard metrics (dynamically calculated)
  totalCampaigns = 12;
  totalReach = 635000;
  totalSpend = 21249;
  
  // New UI properties
  isDarkMode = false;
  activeCampaigns = 8;
  isCardView = true;
  isRefreshing = false;
  selectedOrchestrationView = 'fallback';
  selectedBSPs: string[] = [];
  
  // Dropdown options for new sections
  orchestrationViews = [
    { label: 'Fallback Analysis', value: 'fallback' },
    { label: 'Journey Flow', value: 'journey' },
    { label: 'Channel Sequence', value: 'sequence' }
  ];
  
  bspProviders = [
    { name: 'Twilio', id: 'twilio' },
    { name: 'SendGrid', id: 'sendgrid' },
    { name: 'MessageBird', id: 'messagebird' },
    { name: 'Plivo', id: 'plivo' },
    { name: 'TextLocal', id: 'textlocal' }
  ];
  
  bspMetrics = ['delivery_rate', 'response_time', 'cost_per_message'];
  
  costMetrics = {
    cpm: 12.50,
    cpmChange: -8.2,
    cpc: 0.85,
    cpcChange: 5.1,
    cpl: 45.20,
    cplChange: -12.5
  };

  constructor(private campaignDataService: CampaignDataService) { }
  
  // Utility method for number formatting
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
  
  // UI interaction methods
  openSettings(): void {
    console.log('Opening settings panel...');
    // Future implementation: open settings modal
  }
  
  expandSection(sectionName: string): void {
    console.log('Expanding section:', sectionName);
    // Future implementation: expand section or open modal
  }
  
  toggleViewMode(): void {
    this.isCardView = !this.isCardView;
    console.log('View mode changed to:', this.isCardView ? 'Cards' : 'Table');
  }
  
  refreshCampaignData(): void {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
      this.showLiveNotification = true;
      this.liveNotification = 'Campaign data refreshed successfully!';
      setTimeout(() => this.showLiveNotification = false, 3000);
    }, 2000);
  }
  
  openBudgetCalculator(): void {
    console.log('Opening budget calculator...');
    // Future implementation: open calculator modal
  }
  
  // Additional properties for new UI sections
  selectedRegion = 'all-india';
  selectedAnalyticsView = 'overview';
  inactiveCustomers = 2450;
  highValueCustomers = 892;
  churnRiskCustomers = 156;
  
  festivalRegions = [
    { label: 'All India', value: 'all-india' },
    { label: 'North India', value: 'north' },
    { label: 'South India', value: 'south' },
    { label: 'West India', value: 'west' },
    { label: 'East India', value: 'east' }
  ];
  
  analyticsViews = [
    { label: 'Overview', value: 'overview' },
    { label: 'Trend Analysis', value: 'trends' },
    { label: 'Predictive Models', value: 'predictions' },
    { label: 'Customer Insights', value: 'customer-insights' }
  ];

  ngOnInit(): void {
    this.updateDataAge();
    this.loadAvailableSections();
    this.startLiveUpdatesSimulation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAvailableSections(): void {
    this.availableSections = this.campaignDataService.getAvailableSections();
    
    // Show notification about newly available features when data age changes
    const newFeatures = this.getSectionAvailabilityStatus();
    if (newFeatures.length > 0 && this.dataAge >= 30) {
      this.showLiveNotification = true;
      this.liveNotification = `${newFeatures.length} advanced features now available!`;
      setTimeout(() => {
        this.showLiveNotification = false;
      }, 4000);
    }
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

  getDataAgeDescription(): string {
    if (this.dataAge >= 60) {
      return 'Advanced Analytics & Trend Analysis Available';
    } else if (this.dataAge >= 45) {
      return 'Festival Planning & Customer Insights Enabled';
    } else if (this.dataAge >= 30) {
      return 'Customer Win-Back Strategies Available';
    } else {
      return 'Live Campaign Monitoring Active';
    }
  }

  getSectionAvailabilityStatus(): string[] {
    const sections = [];
    if (this.dataAge >= 30) sections.push('Inactive Customer Management');
    if (this.dataAge >= 45) sections.push('Festival Calendar & Seasonal Insights');
    if (this.dataAge >= 60) sections.push('Advanced Analytics & Predictive Intelligence');
    return sections;
  }

  onCreateCampaign(): void {
    console.log('Creating new campaign...');
    // Simulate campaign creation success
    this.showLiveNotification = true;
    this.liveNotification = 'New campaign created successfully!';
    setTimeout(() => {
      this.showLiveNotification = false;
    }, 3000);
  }

  onDateRangeChange(): void {
    this.updateDataAge();
    this.loadAvailableSections();
    console.log('Date range changed to:', this.selectedDateRange, 'Data age:', this.dataAge);
  }

  onChannelChange(): void {
    console.log('Channel filter changed to:', this.selectedChannel);
  }

  toggleLiveUpdates(): void {
    this.isLiveUpdatesActive = !this.isLiveUpdatesActive;
    if (this.isLiveUpdatesActive) {
      this.startLiveUpdatesSimulation();
    }
  }

  private startLiveUpdatesSimulation(): void {
    // Simulate real-time campaign updates
    if (this.isLiveUpdatesActive) {
      setTimeout(() => {
        this.showLiveNotification = true;
        this.liveNotification = 'Year End Offers campaign performance is optimizing...';
        setTimeout(() => {
          this.showLiveNotification = false;
          if (this.isLiveUpdatesActive) {
            this.startLiveUpdatesSimulation();
          }
        }, 2000);
      }, 10000);
    }
  }

  getActiveFeatureCount(): number {
    let count = 6; // Base features always available
    if (this.dataAge >= 30) count += 1;
    if (this.dataAge >= 45) count += 1;
    if (this.dataAge >= 60) count += 2;
    return count;
  }


}