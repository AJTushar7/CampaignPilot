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

  constructor(private campaignDataService: CampaignDataService) { }

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