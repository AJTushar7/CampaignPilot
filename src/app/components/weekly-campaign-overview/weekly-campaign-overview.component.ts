import { Component, OnInit } from '@angular/core';

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
export class WeeklyCampaignOverviewComponent implements OnInit {
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
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  get totalCampaignsWeek(): number {
    return this.weekDays.reduce((total, day) => total + day.totalCampaigns, 0);
  }

  get totalActiveWeek(): number {
    return this.weekDays.reduce((total, day) => total + day.live, 0);
  }

  get totalScheduledWeek(): number {
    return this.weekDays.reduce((total, day) => total + day.scheduled, 0);
  }
}