import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-festival-calendar',
  templateUrl: './festival-calendar.component.html',
  styleUrls: ['./festival-calendar.component.scss']
})
export class FestivalCalendarComponent implements OnInit {
  upcomingFestivals = [
    {
      name: 'Christmas',
      date: 'Dec 25',
      daysLeft: 12,
      icon: '🎄',
      color: 'green',
      opportunities: ['Gift promotions', 'Holiday sales', 'Family offers']
    },
    {
      name: 'New Year',
      date: 'Jan 1',
      daysLeft: 19,
      icon: '🎉',
      color: 'blue',
      opportunities: ['Resolution campaigns', 'Fresh start offers', 'Party planning']
    },
    {
      name: "Valentine's Day",
      date: 'Feb 14',
      daysLeft: 63,
      icon: '💕',
      color: 'red',
      opportunities: ['Romantic packages', 'Couple offers', 'Gift suggestions']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  planFestivalCampaigns(): void {
    console.log('Planning festival campaigns');
  }

  getFestivalIcon(festival: any): string {
    return festival.icon;
  }
}