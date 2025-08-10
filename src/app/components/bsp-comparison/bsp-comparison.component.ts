import { Component, OnInit } from '@angular/core';

interface BSPProvider {
  id: string;
  name: string;
  smsDeliveryRate: string | null;
  whatsappDeliveryRate: string | null;
  emailDeliveryRate: string | null;
  pushDeliveryRate: string | null;
  overallScore: string;
}

@Component({
  selector: 'app-bsp-comparison',
  templateUrl: './bsp-comparison.component.html',
  styleUrls: ['./bsp-comparison.component.scss']
})
export class BspComparisonComponent implements OnInit {
  selectedMetric = 'Delivery Rate';
  metricOptions = [
    { label: 'Delivery Rate', value: 'Delivery Rate' },
    { label: 'Cost per Message', value: 'Cost per Message' },
    { label: 'Response Time', value: 'Response Time' }
  ];

  bspProviders: BSPProvider[] = [
    {
      id: '1',
      name: 'Twilio',
      smsDeliveryRate: '94',
      whatsappDeliveryRate: '89',
      emailDeliveryRate: '76',
      pushDeliveryRate: '91',
      overallScore: 'A+'
    },
    {
      id: '2',
      name: 'SendGrid',
      smsDeliveryRate: '78',
      whatsappDeliveryRate: null,
      emailDeliveryRate: '96',
      pushDeliveryRate: null,
      overallScore: 'B+'
    },
    {
      id: '3',
      name: 'Amazon SNS',
      smsDeliveryRate: '87',
      whatsappDeliveryRate: null,
      emailDeliveryRate: '85',
      pushDeliveryRate: '94',
      overallScore: 'B+'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  getProviderInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  }

  getProviderColor(name: string): string {
    const colors = ['blue', 'red', 'green', 'purple', 'orange'];
    return colors[name.length % colors.length];
  }

  getScoreColor(score: string): string {
    if (score.includes('A')) return 'bg-green-100 text-green-800';
    if (score.includes('B')) return 'bg-orange-100 text-orange-800';
    return 'bg-surface-100 text-600';
  }

  renderProgressBar(value: string | null): any {
    if (!value) return null;
    
    const numValue = parseInt(value);
    let colorClass = 'red';
    if (numValue >= 90) colorClass = 'green';
    else if (numValue >= 75) colorClass = 'orange';
    
    return {
      value: numValue,
      color: colorClass,
      text: `${value}%`
    };
  }
}