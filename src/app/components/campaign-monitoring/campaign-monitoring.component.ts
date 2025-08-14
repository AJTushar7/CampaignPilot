import { Component, OnInit } from '@angular/core';

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'scheduled' | 'completed';
  channels: string[];
  targetAudience: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  conversions: number;
  spent: number;
  budget: number;
  cost: string;
  createdAt: Date;
  startedAt?: Date;
  scheduledAt?: Date;
  pausedAt?: Date;
}

@Component({
  selector: 'app-campaign-monitoring',
  templateUrl: './campaign-monitoring.component.html',
  styleUrls: ['./campaign-monitoring.component.scss']
})
export class CampaignMonitoringComponent implements OnInit {
  campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summer Sale Campaign',
      type: 'Promotional',
      status: 'active',
      channels: ['SMS', 'Email'],
      targetAudience: 15234,
      sent: 15234,
      delivered: 14892,
      opened: 10234,
      clicked: 3567,
      converted: 1234,
      conversions: 1234,
      spent: 1250,
      budget: 2000,
      cost: '1250.00',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      startedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Welcome Series',
      type: 'Onboarding',
      status: 'scheduled',
      channels: ['WhatsApp'],
      targetAudience: 2457,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      conversions: 0,
      spent: 189,
      budget: 500,
      cost: '189.00',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      scheduledAt: new Date(Date.now() + 18 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Product Launch',
      type: 'Announcement',
      status: 'paused',
      channels: ['SMS', 'Email', 'Push'],
      targetAudience: 8543,
      sent: 8543,
      delivered: 8234,
      opened: 4567,
      clicked: 1234,
      converted: 456,
      conversions: 456,
      spent: 567,
      budget: 1000,
      cost: '567.00',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      pausedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];

  currentPage = 0;
  campaignsPerPage = 3;
  selectedStatus = 'All Status';
  viewMode = 'cards'; // 'cards' or 'table'

  statusOptions = [
    { label: 'All Status', value: 'All Status' },
    { label: 'Active', value: 'Active' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Scheduled', value: 'Scheduled' }
  ];

  selectedCampaign: Campaign | null = null;
  showCampaignModal = false;
  Math = Math; // Make Math available in template

  constructor() { }

  ngOnInit(): void { }

  get filteredCampaigns(): Campaign[] {
    let filtered = this.campaigns;
    
    // Filter by status
    if (this.selectedStatus !== 'All Status') {
      filtered = filtered.filter(campaign => 
        campaign.status.toLowerCase() === this.selectedStatus.toLowerCase()
      );
    }
    
    return filtered;
  }

  get paginatedCampaigns(): Campaign[] {
    const startIndex = this.currentPage * this.campaignsPerPage;
    const endIndex = startIndex + this.campaignsPerPage;
    return this.filteredCampaigns.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCampaigns.length / this.campaignsPerPage);
  }

  previousPage(): void {
    this.currentPage = Math.max(0, this.currentPage - 1);
  }

  nextPage(): void {
    this.currentPage = Math.min(this.totalPages - 1, this.currentPage + 1);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'campaign-status active';
      case 'paused': return 'campaign-status paused';
      case 'scheduled': return 'campaign-status scheduled';
      case 'completed': return 'campaign-status completed';
      default: return 'campaign-status';
    }
  }

  getDeliveryRate(campaign: Campaign): string {
    return campaign.sent ? ((campaign.delivered / campaign.sent) * 100).toFixed(1) : '0';
  }

  getOpenRate(campaign: Campaign): string {
    return campaign.sent ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : '0';
  }

  getClickRate(campaign: Campaign): string {
    return campaign.sent ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : '0';
  }

  formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  }

  viewCampaignDetails(campaign: Campaign): void {
    this.selectedCampaign = campaign;
    this.showCampaignModal = true;
  }

  closeCampaignModal(): void {
    this.showCampaignModal = false;
    this.selectedCampaign = null;
  }

  toggleCampaignStatus(campaign: Campaign): void {
    if (campaign.status === 'active') {
      campaign.status = 'paused';
      campaign.pausedAt = new Date();
    } else if (campaign.status === 'paused') {
      campaign.status = 'active';
      campaign.startedAt = new Date();
    }
  }
}