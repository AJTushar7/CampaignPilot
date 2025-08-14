import { Component, OnInit } from '@angular/core';
import { ExportService, CampaignData, KPIData, ChannelPerformance, BSPPerformance } from '../../services/export.service';
import { Campaign } from '../../services/campaign-data.service';
import { CampaignDataService } from '../../services/campaign-data.service';

@Component({
  selector: 'app-export-menu',
  templateUrl: './export-menu.component.html',
  styleUrls: ['./export-menu.component.scss']
})
export class ExportMenuComponent implements OnInit {
  showExportMenu = false;
  isExporting = false;

  kpiData: KPIData = {
    totalCampaigns: 148,
    totalSpend: 1250000,
    totalRevenue: 5050000,
    avgConversion: 10.7,
    totalReach: 2400000,
    overallROI: 4.04
  };

  channelData: ChannelPerformance[] = [
    { channel: 'WhatsApp', campaigns: 45, reach: 850000, conversion: 12.3, spend: 425000, revenue: 1800000, roi: 4.24 },
    { channel: 'SMS', campaigns: 38, reach: 720000, conversion: 8.9, spend: 320000, revenue: 1200000, roi: 3.75 },
    { channel: 'Email', campaigns: 35, reach: 520000, conversion: 6.2, spend: 280000, revenue: 950000, roi: 3.39 },
    { channel: 'Push', campaigns: 30, reach: 310000, conversion: 4.1, spend: 225000, revenue: 1100000, roi: 4.89 }
  ];

  bspData: BSPPerformance[] = [
    { provider: 'Cloud API', channel: 'WhatsApp', deliveryRate: 98.5, cost: 0.45, reliability: 99.2, volume: 450000 },
    { provider: 'MM Lite', channel: 'WhatsApp', deliveryRate: 97.8, cost: 0.42, reliability: 98.8, volume: 400000 },
    { provider: 'Karix', channel: 'RCS', deliveryRate: 95.2, cost: 0.25, reliability: 96.5, volume: 180000 },
    { provider: 'TCL', channel: 'RCS', deliveryRate: 94.8, cost: 0.22, reliability: 95.8, volume: 160000 }
  ];

  constructor(
    private exportService: ExportService,
    private campaignDataService: CampaignDataService
  ) { }

  ngOnInit(): void {
  }

  toggleExportMenu(): void {
    this.showExportMenu = !this.showExportMenu;
  }

  async exportDashboardPDF(): Promise<void> {
    this.isExporting = true;
    try {
      console.log('Starting PDF export...');
      this.campaignDataService.getCampaigns().subscribe(campaigns => {
        console.log('Campaign data received, transforming...');
        const campaignData = this.transformCampaignData(campaigns);
        console.log('Data transformed, generating PDF...');
        this.exportService.exportDashboardToPDF(this.kpiData, campaignData, this.channelData);
        this.showExportMenu = false;
        this.isExporting = false;
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('PDF export failed. Please try again.');
      this.isExporting = false;
    }
  }

  async exportDashboardExcel(): Promise<void> {
    this.isExporting = true;
    try {
      this.campaignDataService.getCampaigns().subscribe(campaigns => {
        const campaignData = this.transformCampaignData(campaigns);
        this.exportService.exportDashboardToExcel(this.kpiData, campaignData, this.channelData, this.bspData);
        this.showExportMenu = false;
        this.isExporting = false;
      });
    } catch (error) {
      console.error('Error exporting Excel:', error);
      this.isExporting = false;
    }
  }

  async exportCampaignData(): Promise<void> {
    this.isExporting = true;
    try {
      this.campaignDataService.getCampaigns().subscribe(campaigns => {
        const campaignData = this.transformCampaignData(campaigns);
        this.exportService.exportCampaignDataToExcel(campaignData);
        this.showExportMenu = false;
        this.isExporting = false;
      });
    } catch (error) {
      console.error('Error exporting campaign data:', error);
      this.isExporting = false;
    }
  }

  private transformCampaignData(campaigns: any[]): CampaignData[] {
    return campaigns.map(campaign => ({
      name: campaign.name,
      channel: campaign.channels ? campaign.channels[0] : 'Multi-Channel',
      status: campaign.status,
      sent: campaign.sent,
      delivered: campaign.delivered,
      opened: campaign.opened,
      clicked: campaign.clicked,
      converted: campaign.converted,
      spend: this.parseCurrency(campaign.cost),
      revenue: this.parseCurrency(campaign.revenue),
      cpl: Math.round(this.parseCurrency(campaign.cost) / Math.max(campaign.converted, 1)),
      roi: campaign.roi,
      conversionRate: campaign.conversionRate,
      startDate: campaign.startedAt || campaign.createdAt,
      endDate: campaign.startedAt ? new Date(campaign.startedAt.getTime() + (30 * 24 * 60 * 60 * 1000)) : new Date()
    }));
  }

  private parseCurrency(currencyString: string): number {
    if (typeof currencyString === 'number') return currencyString;
    return parseFloat(currencyString.replace(/[₹,]/g, '')) || 0;
  }
}