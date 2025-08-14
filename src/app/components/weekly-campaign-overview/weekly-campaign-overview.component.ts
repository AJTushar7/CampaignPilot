import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

interface WeekDay {
  name: string;
  number: number;
  totalCampaigns: number;
  live: number;
  scheduled: number;
  paused: number;
  trafficLevel: string;
  isToday: boolean;
}

@Component({
  selector: 'app-weekly-campaign-overview',
  templateUrl: './weekly-campaign-overview.component.html',
  styleUrls: ['./weekly-campaign-overview.component.scss']
})
export class WeeklyCampaignOverviewComponent implements OnInit, OnChanges {
  @Input() selectedChannel: string = 'all';
  @Input() selectedDateRange: string = '7d';
  @Input() filteredCampaignCount: number = 0;
  
  isExpanded = false;
  
  weekDays: WeekDay[] = [
    {
      name: 'Thu',
      number: 14,
      totalCampaigns: 6,
      live: 2,
      scheduled: 4,
      paused: 0,
      trafficLevel: 'Moderate',
      isToday: true  // Today is Thursday 14th
    },
    {
      name: 'Fri',
      number: 15,
      totalCampaigns: 7,
      live: 2,
      scheduled: 1,
      paused: 4,
      trafficLevel: 'Moderate',
      isToday: false
    },
    {
      name: 'Sat',
      number: 16,
      totalCampaigns: 10,
      live: 3,
      scheduled: 5,
      paused: 2,
      trafficLevel: 'Heavy',
      isToday: false
    },
    {
      name: 'Sun',
      number: 17,
      totalCampaigns: 8,
      live: 1,
      scheduled: 2,
      paused: 5,
      trafficLevel: 'Heavy',
      isToday: false
    },
    {
      name: 'Mon',
      number: 18,
      totalCampaigns: 5,
      live: 4,
      scheduled: 1,
      paused: 0,
      trafficLevel: 'Moderate',
      isToday: false
    },
    {
      name: 'Tue',
      number: 19,
      totalCampaigns: 7,
      live: 1,
      scheduled: 2,
      paused: 4,
      trafficLevel: 'Moderate',
      isToday: false
    },
    {
      name: 'Wed',
      number: 20,
      totalCampaigns: 10,
      live: 2,
      scheduled: 3,
      paused: 5,
      trafficLevel: 'Heavy',
      isToday: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.generateWeekDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedChannel'] || changes['selectedDateRange'] || changes['filteredCampaignCount']) {
      this.updateWeekDaysBasedOnFilters();
    }
  }

  // Get current week data filtering Monday to Friday only
  get currentWeekDays(): WeekDay[] {
    return this.weekDays.slice(0, 5); // Only Mon-Fri
  }

  generateWeekDays() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const monday = new Date(today);
    
    // Calculate Monday of current week
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    monday.setDate(diff);
    
    this.weekDays = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    
    // Base data that will be adjusted based on filters
    const baseCampaignData = [18, 22, 15, 20, 16]; // Mon, Tue, Wed, Thu, Fri
    
    for (let i = 0; i < 5; i++) {
      const currentDate = new Date(monday);
      currentDate.setDate(monday.getDate() + i);
      
      const isToday = currentDate.toDateString() === today.toDateString();
      const baseCampaigns = baseCampaignData[i];
      
      this.weekDays.push({
        name: dayNames[i],
        number: currentDate.getDate(),
        totalCampaigns: baseCampaigns,
        live: Math.floor(baseCampaigns * 0.4),
        scheduled: Math.floor(baseCampaigns * 0.3),
        paused: Math.floor(baseCampaigns * 0.3),
        trafficLevel: baseCampaigns > 18 ? 'Heavy' : baseCampaigns > 15 ? 'Moderate' : 'Light',
        isToday: isToday
      });
    }
  }

  updateWeekDaysBasedOnFilters() {
    // Calculate channel ratio based on filtered campaign count
    const totalCampaigns = 27; // Total campaigns across all channels  
    const channelRatio = this.filteredCampaignCount / totalCampaigns;
    const dateMultiplier = this.selectedDateRange === '7d' ? 0.6 : 1.0;
    
    // Update each day based on the filters
    this.weekDays = this.weekDays.map(day => {
      const adjustedTotal = Math.round(day.totalCampaigns * channelRatio * dateMultiplier);
      return {
        ...day,
        totalCampaigns: Math.max(1, adjustedTotal), // Minimum 1 campaign per day
        live: Math.floor(adjustedTotal * 0.4),
        scheduled: Math.floor(adjustedTotal * 0.3),
        paused: Math.floor(adjustedTotal * 0.3),
        trafficLevel: adjustedTotal > 18 ? 'Heavy' : adjustedTotal > 15 ? 'Moderate' : 'Light'
      };
    });
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  get totalCampaignsWeek(): number {
    return this.currentWeekDays.reduce((total, day) => total + day.totalCampaigns, 0);
  }

  get totalActiveWeek(): number {
    return this.currentWeekDays.reduce((total, day) => total + day.live, 0);
  }

  get totalScheduledWeek(): number {
    return this.currentWeekDays.reduce((total, day) => total + day.scheduled, 0);
  }
}