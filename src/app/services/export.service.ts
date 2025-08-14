import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Workbook } from 'exceljs';

export interface CampaignData {
  name: string;
  channel: string;
  status: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  spend: number;
  revenue: number;
  cpl: number;
  roi: number;
  conversionRate: number;
  startDate: Date;
  endDate: Date;
}

export interface KPIData {
  totalCampaigns: number;
  totalSpend: number;
  totalRevenue: number;
  avgConversion: number;
  totalReach: number;
  overallROI: number;
}

export interface ChannelPerformance {
  channel: string;
  campaigns: number;
  reach: number;
  conversion: number;
  spend: number;
  revenue: number;
  roi: number;
}

export interface BSPPerformance {
  provider: string;
  channel: string;
  deliveryRate: number;
  cost: number;
  reliability: number;
  volume: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  // Export Dashboard Summary to Excel
  exportDashboardToExcel(
    kpiData: KPIData,
    campaignData: CampaignData[],
    channelData: ChannelPerformance[],
    bspData: BSPPerformance[]
  ): void {
    const workbook = new Workbook();
    
    // Dashboard Summary Sheet
    const summarySheet = workbook.addWorksheet('Dashboard Summary');
    this.createSummarySheet(summarySheet, kpiData);
    
    // Campaign Details Sheet
    const campaignSheet = workbook.addWorksheet('Campaign Details');
    this.createCampaignSheet(campaignSheet, campaignData);
    
    // Channel Performance Sheet
    const channelSheet = workbook.addWorksheet('Channel Performance');
    this.createChannelSheet(channelSheet, channelData);
    
    // BSP Performance Sheet
    const bspSheet = workbook.addWorksheet('BSP Performance');
    this.createBSPSheet(bspSheet, bspData);
    
    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      saveAs(blob, `Campaign_Dashboard_Report_${this.formatDate(new Date())}.xlsx`);
    });
  }

  // Export Dashboard Summary to PDF
  exportDashboardToPDF(
    kpiData: KPIData,
    campaignData: CampaignData[],
    channelData: ChannelPerformance[]
  ): void {
    const doc = new jsPDF();
    let yPosition = 20;

    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Campaign Analytics Dashboard Report', 14, yPosition);
    yPosition += 15;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${this.formatDate(new Date())}`, 14, yPosition);
    yPosition += 15;

    // KPI Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Performance Indicators', 14, yPosition);
    yPosition += 10;

    const kpiTable = [
      ['Total Campaigns', kpiData.totalCampaigns.toString()],
      ['Total Spend', `₹${this.formatCurrency(kpiData.totalSpend)}`],
      ['Total Revenue', `₹${this.formatCurrency(kpiData.totalRevenue)}`],
      ['Average Conversion', `${kpiData.avgConversion}%`],
      ['Total Reach', this.formatNumber(kpiData.totalReach)],
      ['Overall ROI', `${kpiData.overallROI}x`]
    ];

    (doc as any).autoTable({
      head: [['Metric', 'Value']],
      body: kpiTable,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14, right: 14 }
    });

    yPosition = Number((doc as any).lastAutoTable.finalY) + 15;

    // Campaign Performance
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Top Performing Campaigns', 14, yPosition);
    yPosition += 10;

    const topCampaigns = campaignData
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 10)
      .map(campaign => [
        campaign.name,
        campaign.channel,
        campaign.status,
        this.formatNumber(campaign.sent),
        `${campaign.conversionRate}%`,
        `₹${this.formatCurrency(campaign.spend)}`,
        `${campaign.roi}x`
      ]);

    (doc as any).autoTable({
      head: [['Campaign', 'Channel', 'Status', 'Sent', 'Conv %', 'Spend', 'ROI']],
      body: topCampaigns,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 8 }
    });

    const finalY: number = Number((doc as any).lastAutoTable.finalY) + 15;

    // Channel Performance
    if (finalY < 250) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Channel Performance Summary', 14, finalY);

      const channelTable = channelData.map(channel => [
        channel.channel,
        channel.campaigns.toString(),
        this.formatNumber(channel.reach),
        `${channel.conversion}%`,
        `₹${this.formatCurrency(channel.spend)}`,
        `${channel.roi}x`
      ]);

      (doc as any).autoTable({
        head: [['Channel', 'Campaigns', 'Reach', 'Conv %', 'Spend', 'ROI']],
        body: channelTable,
        startY: finalY + 10,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 14, right: 14 },
        styles: { fontSize: 8 }
      });
    }

    // Save PDF
    doc.save(`Campaign_Dashboard_Report_${this.formatDate(new Date())}.pdf`);
  }

  // Export Campaign Data to Excel
  exportCampaignDataToExcel(campaignData: CampaignData[]): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      campaignData.map(campaign => ({
        'Campaign Name': campaign.name,
        'Channel': campaign.channel,
        'Status': campaign.status,
        'Messages Sent': campaign.sent,
        'Delivered': campaign.delivered,
        'Opened': campaign.opened,
        'Clicked': campaign.clicked,
        'Converted': campaign.converted,
        'Spend (₹)': campaign.spend,
        'Revenue (₹)': campaign.revenue,
        'CPL (₹)': campaign.cpl,
        'ROI': campaign.roi,
        'Conversion Rate (%)': campaign.conversionRate,
        'Start Date': this.formatDate(campaign.startDate),
        'End Date': this.formatDate(campaign.endDate)
      }))
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Campaign Data');
    
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(
      new Blob([excelBuffer], { type: 'application/octet-stream' }),
      `Campaign_Data_${this.formatDate(new Date())}.xlsx`
    );
  }

  // Create Summary Sheet for Excel
  private createSummarySheet(sheet: any, kpiData: KPIData): void {
    // Title
    sheet.mergeCells('A1:B1');
    sheet.getCell('A1').value = 'Campaign Analytics Dashboard Summary';
    sheet.getCell('A1').font = { bold: true, size: 16 };
    sheet.getCell('A1').alignment = { horizontal: 'center' };

    // Date
    sheet.getCell('A2').value = `Generated on: ${this.formatDate(new Date())}`;
    sheet.getCell('A2').font = { italic: true };

    // KPI Data
    const kpiRows = [
      ['Metric', 'Value'],
      ['Total Campaigns', kpiData.totalCampaigns],
      ['Total Spend (₹)', this.formatCurrency(kpiData.totalSpend)],
      ['Total Revenue (₹)', this.formatCurrency(kpiData.totalRevenue)],
      ['Average Conversion (%)', kpiData.avgConversion],
      ['Total Reach', this.formatNumber(kpiData.totalReach)],
      ['Overall ROI', `${kpiData.overallROI}x`]
    ];

    kpiRows.forEach((row, index) => {
      const rowNum = index + 4;
      sheet.getCell(`A${rowNum}`).value = row[0];
      sheet.getCell(`B${rowNum}`).value = row[1];
      
      if (index === 0) {
        sheet.getCell(`A${rowNum}`).font = { bold: true };
        sheet.getCell(`B${rowNum}`).font = { bold: true };
        sheet.getCell(`A${rowNum}`).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE3F2FD' }
        };
        sheet.getCell(`B${rowNum}`).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE3F2FD' }
        };
      }
    });

    // Auto-fit columns
    sheet.columns = [
      { width: 25 },
      { width: 20 }
    ];
  }

  // Create Campaign Sheet for Excel
  private createCampaignSheet(sheet: any, campaignData: CampaignData[]): void {
    const headers = [
      'Campaign Name', 'Channel', 'Status', 'Messages Sent', 'Delivered',
      'Opened', 'Clicked', 'Converted', 'Spend (₹)', 'Revenue (₹)',
      'CPL (₹)', 'ROI', 'Conversion Rate (%)', 'Start Date', 'End Date'
    ];

    // Add headers
    headers.forEach((header, index) => {
      const cell = sheet.getCell(1, index + 1);
      cell.value = header;
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE3F2FD' }
      };
    });

    // Add data
    campaignData.forEach((campaign, rowIndex) => {
      const row = rowIndex + 2;
      sheet.getCell(row, 1).value = campaign.name;
      sheet.getCell(row, 2).value = campaign.channel;
      sheet.getCell(row, 3).value = campaign.status;
      sheet.getCell(row, 4).value = campaign.sent;
      sheet.getCell(row, 5).value = campaign.delivered;
      sheet.getCell(row, 6).value = campaign.opened;
      sheet.getCell(row, 7).value = campaign.clicked;
      sheet.getCell(row, 8).value = campaign.converted;
      sheet.getCell(row, 9).value = campaign.spend;
      sheet.getCell(row, 10).value = campaign.revenue;
      sheet.getCell(row, 11).value = campaign.cpl;
      sheet.getCell(row, 12).value = campaign.roi;
      sheet.getCell(row, 13).value = campaign.conversionRate;
      sheet.getCell(row, 14).value = this.formatDate(campaign.startDate);
      sheet.getCell(row, 15).value = this.formatDate(campaign.endDate);
    });

    // Auto-fit columns
    sheet.columns = headers.map(() => ({ width: 15 }));
  }

  // Create Channel Sheet for Excel
  private createChannelSheet(sheet: any, channelData: ChannelPerformance[]): void {
    const headers = ['Channel', 'Campaigns', 'Reach', 'Conversion (%)', 'Spend (₹)', 'Revenue (₹)', 'ROI'];

    // Add headers
    headers.forEach((header, index) => {
      const cell = sheet.getCell(1, index + 1);
      cell.value = header;
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE3F2FD' }
      };
    });

    // Add data
    channelData.forEach((channel, rowIndex) => {
      const row = rowIndex + 2;
      sheet.getCell(row, 1).value = channel.channel;
      sheet.getCell(row, 2).value = channel.campaigns;
      sheet.getCell(row, 3).value = channel.reach;
      sheet.getCell(row, 4).value = channel.conversion;
      sheet.getCell(row, 5).value = channel.spend;
      sheet.getCell(row, 6).value = channel.revenue;
      sheet.getCell(row, 7).value = channel.roi;
    });

    // Auto-fit columns
    sheet.columns = headers.map(() => ({ width: 15 }));
  }

  // Create BSP Sheet for Excel
  private createBSPSheet(sheet: any, bspData: BSPPerformance[]): void {
    const headers = ['Provider', 'Channel', 'Delivery Rate (%)', 'Cost per Message (₹)', 'Reliability (%)', 'Volume'];

    // Add headers
    headers.forEach((header, index) => {
      const cell = sheet.getCell(1, index + 1);
      cell.value = header;
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE3F2FD' }
      };
    });

    // Add data
    bspData.forEach((bsp, rowIndex) => {
      const row = rowIndex + 2;
      sheet.getCell(row, 1).value = bsp.provider;
      sheet.getCell(row, 2).value = bsp.channel;
      sheet.getCell(row, 3).value = bsp.deliveryRate;
      sheet.getCell(row, 4).value = bsp.cost;
      sheet.getCell(row, 5).value = bsp.reliability;
      sheet.getCell(row, 6).value = bsp.volume;
    });

    // Auto-fit columns
    sheet.columns = headers.map(() => ({ width: 18 }));
  }

  // Utility methods
  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  }

  private formatCurrency(amount: number): string {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  }

  private formatNumber(num: number): string {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  }
}