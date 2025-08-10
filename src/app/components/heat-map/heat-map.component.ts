import { Component, OnInit } from '@angular/core';

interface HeatMapCell {
  value: number;
  intensity: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit {
  selectedMetric = 'Engagement Rate';
  metricOptions = [
    { label: 'Engagement Rate', value: 'Engagement Rate' },
    { label: 'Conversion Rate', value: 'Conversion Rate' },
    { label: 'ROI', value: 'ROI' }
  ];

  heatMapData: HeatMapCell[] = [
    { value: 85, intensity: 'high' },
    { value: 45, intensity: 'low' },
    { value: 67, intensity: 'medium' },
    { value: 92, intensity: 'high' },
    { value: 23, intensity: 'low' },
    { value: 78, intensity: 'medium' },
    { value: 56, intensity: 'medium' },
    { value: 81, intensity: 'high' },
    { value: 94, intensity: 'high' },
    { value: 62, intensity: 'medium' },
    { value: 34, intensity: 'low' },
    { value: 76, intensity: 'medium' },
    { value: 58, intensity: 'medium' },
    { value: 87, intensity: 'high' }
  ];

  constructor() { }

  ngOnInit(): void { }

  getCellClass(intensity: string): string {
    switch (intensity) {
      case 'high': return 'heat-cell high';
      case 'medium': return 'heat-cell medium';
      case 'low': return 'heat-cell low';
      default: return 'heat-cell';
    }
  }
}