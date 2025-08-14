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
  cost: string;
  spent: number;
  budget: number;
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
      name: 'Flash Sale Alert',
      type: 'SMS',
      status: 'active',
      channels: ['SMS'],
      targetAudience: 132000,
      sent: 89000,
      delivered: 87600,
      opened: 52000,
      clicked: 18400,
      converted: 1234,
      conversions: 1234,
      cost: '2580.00',
      spent: 2290,
      budget: 2580,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      startedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Weekend Offer',
      type: 'WhatsApp',
      status: 'scheduled',
      channels: ['WhatsApp'],
      targetAudience: 88000,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      conversions: 0,
      cost: '1890.00',
      spent: 0,
      budget: 1890,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      scheduledAt: new Date(Date.now() + 18 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Service Reminder',
      type: 'Email',
      status: 'paused',
      channels: ['Email'],
      targetAudience: 54000,
      sent: 32000,
      delivered: 31800,
      opened: 19000,
      clicked: 6800,
      converted: 456,
      conversions: 89,
      cost: '1200.00',
      spent: 890,
      budget: 1200,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      pausedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];

  allCampaigns: Campaign[] = [...this.campaigns];
  filteredCampaigns: Campaign[] = [...this.campaigns];
  currentPage = 0;
  campaignsPerPage = 3;
  selectedStatus = 'All Status';
  selectedDateFilter = 'Last 7 Days';
  viewMode = 'cards'; // 'cards' or 'table'

  statusOptions = [
    { label: 'All Status', value: 'All Status' },
    { label: 'Active', value: 'active' },
    { label: 'Paused', value: 'paused' },
    { label: 'Scheduled', value: 'scheduled' }
  ];

  dateOptions = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 15 Days', value: '15d' },
    { label: 'Last 30 Days', value: '30d' }
  ];

  selectedCampaign: Campaign | null = null;
  showCampaignModal = false;
  Math = Math; // Make Math available in template

  constructor() { }

  ngOnInit(): void { 
    this.filterCampaigns();
  }

  filterCampaigns(): void {
    let filtered = [...this.allCampaigns];
    
    // Filter by status
    if (this.selectedStatus !== 'All Status') {
      filtered = filtered.filter(campaign => 
        campaign.status.toLowerCase() === this.selectedStatus.toLowerCase()
      );
    }
    
    // Filter by date (for demo purposes, keeping all campaigns)
    // In real implementation, this would filter by creation/start date
    
    this.filteredCampaigns = filtered;
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'active': return 'pi pi-play-circle';
      case 'paused': return 'pi pi-pause-circle';
      case 'scheduled': return 'pi pi-clock';
      case 'completed': return 'pi pi-check-circle';
      default: return 'pi pi-circle';
    }
  }

  getProgressPercentage(campaign: Campaign): number {
    if (campaign.targetAudience === 0) return 0;
    return Math.round((campaign.sent / campaign.targetAudience) * 100);
  }

  getBudgetUsagePercentage(campaign: Campaign): number {
    if (campaign.budget === 0) return 0;
    return Math.round((campaign.spent / campaign.budget) * 100);
  }

  get paginatedCampaigns(): Campaign[] {
    const startIndex = this.currentPage * this.campaignsPerPage;
    const endIndex = startIndex + this.campaignsPerPage;
    return this.campaigns.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.campaigns.length / this.campaignsPerPage);
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