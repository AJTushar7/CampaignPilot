import { Component, OnInit } from '@angular/core';
import { CampaignDataService, ChannelData } from '../services/campaign-data.service';

@Component({
  selector: 'app-channel-performance',
  templateUrl: './channel-performance.component.html',
  styleUrls: ['./channel-performance.component.scss']
})
export class ChannelPerformanceComponent implements OnInit {
  selectedMetric = 'Delivery Rate';
  metricOptions = [
    { label: 'Delivery Rate', value: 'Delivery Rate' },
    { label: 'Open Rate', value: 'Open Rate' },
    { label: 'Click Rate', value: 'Click Rate' }
  ];

  channelData: ChannelData[] = [];
  loading = true;

  constructor(private campaignDataService: CampaignDataService) { }

  ngOnInit(): void {
    this.loadChannelData();
  }

  private loadChannelData(): void {
    this.campaignDataService.getChannelPerformance().subscribe({
      next: (data) => {
        this.channelData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading channel data:', error);
        this.loading = false;
      }
    });
  }
}