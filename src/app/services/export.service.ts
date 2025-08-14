import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  // Export to Excel
  exportToExcel(data: any[], filename: string = 'campaign-report'): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Campaign Data');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  // Export dashboard to Excel with multiple sheets
  exportDashboardToExcel(): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // KPI Data
    const kpiData = [
      { Metric: 'Total Campaigns', Value: '148', Type: 'Count' },
      { Metric: 'Total Spend', Value: '₹12.5L', Type: 'Currency' },
      { Metric: 'Total Revenue', Value: '₹50.5L', Type: 'Currency' },
      { Metric: 'Avg Conversion', Value: '10.7%', Type: 'Percentage' }
    ];
    const kpiSheet = XLSX.utils.json_to_sheet(kpiData);
    XLSX.utils.book_append_sheet(workbook, kpiSheet, 'KPI Metrics');

    // Channel Performance
    const channelData = [
      { Channel: 'SMS', 'Sent': 2450000, 'Delivered': 2328000, 'Opens': 1396800, 'Clicks': 186240, 'Conversions': 24412, 'Revenue': '₹18.5L' },
      { Channel: 'WhatsApp', 'Sent': 1850000, 'Delivered': 1776000, 'Opens': 1420800, 'Clicks': 248320, 'Conversions': 34765, 'Revenue': '₹22.8L' },
      { Channel: 'Email', 'Sent': 3200000, 'Delivered': 2944000, 'Opens': 1032400, 'Clicks': 61952, 'Conversions': 8068, 'Revenue': '₹6.2L' },
      { Channel: 'Push', 'Sent': 1650000, 'Delivered': 1551000, 'Opens': 310200, 'Clicks': 24816, 'Conversions': 1737, 'Revenue': '₹1.8L' },
      { Channel: 'RCS', 'Sent': 980000, 'Delivered': 931000, 'Opens': 558600, 'Clicks': 55860, 'Conversions': 6702, 'Revenue': '₹1.2L' }
    ];
    const channelSheet = XLSX.utils.json_to_sheet(channelData);
    XLSX.utils.book_append_sheet(workbook, channelSheet, 'Channel Performance');

    // Campaign Data
    const campaignData = [
      { Campaign: 'Diwali Festival Sale', Status: 'Executing', Channel: 'WhatsApp', Budget: '₹2.5L', Spend: '₹1.8L', Conversions: 3420, ROI: '4.2x' },
      { Campaign: 'New Year Promotion', Status: 'Scheduled', Channel: 'SMS', Budget: '₹1.8L', Spend: '₹0', Conversions: 0, ROI: '-' },
      { Campaign: 'Flash Sale Weekend', Status: 'Completed', Channel: 'Email', Budget: '₹1.2L', Spend: '₹1.2L', Conversions: 1850, ROI: '2.8x' },
      { Campaign: 'Summer Collection', Status: 'Paused', Channel: 'Push', Budget: '₹0.8L', Spend: '₹0.3L', Conversions: 450, ROI: '1.9x' },
      { Campaign: 'Monsoon Offers', Status: 'Failed', Channel: 'RCS', Budget: '₹1.5L', Spend: '₹0.2L', Conversions: 85, ROI: '0.5x' }
    ];
    const campaignSheet = XLSX.utils.json_to_sheet(campaignData);
    XLSX.utils.book_append_sheet(workbook, campaignSheet, 'Campaign Details');

    // BSP Performance
    const bspData = [
      { Channel: 'WhatsApp', Provider: 'Cloud API', 'Delivery Rate': '95.2%', 'Cost per Message': '₹0.15', 'Success Rate': '92.8%' },
      { Channel: 'WhatsApp', Provider: 'MM Lite', 'Delivery Rate': '93.8%', 'Cost per Message': '₹0.12', 'Success Rate': '89.5%' },
      { Channel: 'SMS', Provider: 'Karix', 'Delivery Rate': '94.8%', 'Cost per Message': '₹0.08', 'Success Rate': '91.2%' },
      { Channel: 'SMS', Provider: 'TCL', 'Delivery Rate': '92.5%', 'Cost per Message': '₹0.09', 'Success Rate': '88.7%' },
      { Channel: 'RCS', Provider: 'Karix RCS', 'Delivery Rate': '89.3%', 'Cost per Message': '₹0.25', 'Success Rate': '85.4%' }
    ];
    const bspSheet = XLSX.utils.json_to_sheet(bspData);
    XLSX.utils.book_append_sheet(workbook, bspSheet, 'BSP Performance');

    XLSX.writeFile(workbook, `automotive-campaign-dashboard-${this.getTimestamp()}.xlsx`);
  }

  // Export to PDF
  exportToPDF(title: string = 'Campaign Dashboard Report'): void {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text(title, 14, 22);

    // Add generation date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // KPI Summary
    doc.setFontSize(14);
    doc.text('KPI Summary', 14, 45);

    const kpiTableData = [
      ['Total Campaigns', '148'],
      ['Total Spend', '₹12.5L'],
      ['Total Revenue', '₹50.5L'],
      ['Average Conversion Rate', '10.7%']
    ];

    (doc as any).autoTable({
      head: [['Metric', 'Value']],
      body: kpiTableData,
      startY: 50,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14 }
    });

    // Channel Performance
    doc.setFontSize(14);
    doc.text('Channel Performance', 14, (doc as any).lastAutoTable.finalY + 20);

    const channelTableData = [
      ['SMS', '2.45M', '95.0%', '60.0%', '8.0%', '₹18.5L'],
      ['WhatsApp', '1.85M', '96.0%', '80.0%', '13.5%', '₹22.8L'],
      ['Email', '3.20M', '92.0%', '35.1%', '2.1%', '₹6.2L'],
      ['Push', '1.65M', '94.0%', '20.0%', '1.1%', '₹1.8L'],
      ['RCS', '0.98M', '95.0%', '60.0%', '6.8%', '₹1.2L']
    ];

    (doc as any).autoTable({
      head: [['Channel', 'Sent', 'Delivery', 'Open Rate', 'Conv Rate', 'Revenue']],
      body: channelTableData,
      startY: (doc as any).lastAutoTable.finalY + 25,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      margin: { left: 14 }
    });

    // Active Campaigns
    if ((doc as any).lastAutoTable.finalY > 240) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Active Campaigns', 14, 30);
      var startY = 35;
    } else {
      doc.setFontSize(14);
      doc.text('Active Campaigns', 14, (doc as any).lastAutoTable.finalY + 20);
      var startY = (doc as any).lastAutoTable.finalY + 25;
    }

    const campaignTableData = [
      ['Diwali Festival Sale', 'Executing', 'WhatsApp', '₹2.5L', '4.2x'],
      ['New Year Promotion', 'Scheduled', 'SMS', '₹1.8L', '-'],
      ['Flash Sale Weekend', 'Completed', 'Email', '₹1.2L', '2.8x'],
      ['Summer Collection', 'Paused', 'Push', '₹0.8L', '1.9x'],
      ['Monsoon Offers', 'Failed', 'RCS', '₹1.5L', '0.5x']
    ];

    (doc as any).autoTable({
      head: [['Campaign', 'Status', 'Channel', 'Budget', 'ROI']],
      body: campaignTableData,
      startY: startY,
      theme: 'grid',
      headStyles: { fillColor: [239, 68, 68] },
      margin: { left: 14 }
    });

    doc.save(`automotive-campaign-report-${this.getTimestamp()}.pdf`);
  }

  // Advanced Excel export with charts and formatting
  exportAdvancedExcel(): void {
    import('exceljs').then(ExcelJS => {
      const workbook = new ExcelJS.Workbook();
      
      // Dashboard Summary Sheet
      const summarySheet = workbook.addWorksheet('Dashboard Summary', {
        pageSetup: { paperSize: 9, orientation: 'landscape' }
      });

      // Add headers
      summarySheet.mergeCells('A1:F1');
      summarySheet.getCell('A1').value = 'Automotive Campaign Manager - Dashboard Report';
      summarySheet.getCell('A1').font = { size: 16, bold: true };
      summarySheet.getCell('A1').alignment = { horizontal: 'center' };

      // KPI Section
      summarySheet.getCell('A3').value = 'Key Performance Indicators';
      summarySheet.getCell('A3').font = { size: 14, bold: true };
      
      const kpiHeaders = ['Metric', 'Current Value', 'Previous Period', 'Change', 'Target'];
      summarySheet.addRow(kpiHeaders);
      summarySheet.getRow(4).font = { bold: true };
      summarySheet.getRow(4).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' }
      };

      const kpiData = [
        ['Total Campaigns', '148', '135', '+9.6%', '150'],
        ['Total Spend', '₹12.5L', '₹11.2L', '+11.6%', '₹15.0L'],
        ['Total Revenue', '₹50.5L', '₹45.8L', '+10.3%', '₹55.0L'],
        ['Avg Conversion Rate', '10.7%', '9.8%', '+0.9%', '12.0%'],
        ['Customer Acquisition Cost', '₹180', '₹195', '-7.7%', '₹150'],
        ['Return on Ad Spend', '4.2x', '3.8x', '+10.5%', '4.5x']
      ];

      kpiData.forEach(row => {
        summarySheet.addRow(row);
      });

      // Style the data rows
      for (let i = 5; i <= 10; i++) {
        summarySheet.getRow(i).getCell(4).font = { 
          color: { argb: summarySheet.getRow(i).getCell(4).value?.toString().includes('+') ? 'FF059669' : 'FFEF4444' }
        };
      }

      // Set column widths
      summarySheet.columns = [
        { width: 25 }, { width: 15 }, { width: 18 }, { width: 12 }, { width: 12 }
      ];

      // Channel Performance Sheet
      const channelSheet = workbook.addWorksheet('Channel Analysis');
      
      channelSheet.mergeCells('A1:H1');
      channelSheet.getCell('A1').value = 'Channel Performance Analysis';
      channelSheet.getCell('A1').font = { size: 14, bold: true };
      channelSheet.getCell('A1').alignment = { horizontal: 'center' };

      const channelHeaders = ['Channel', 'Messages Sent', 'Delivery Rate', 'Open Rate', 'Click Rate', 'Conversion Rate', 'Revenue', 'Cost per Lead'];
      channelSheet.addRow(channelHeaders);
      channelSheet.getRow(2).font = { bold: true };
      channelSheet.getRow(2).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF10B981' }
      };

      const channelPerformanceData = [
        ['SMS', '2,450,000', '95.0%', '60.0%', '8.0%', '1.0%', '₹18.5L', '₹75'],
        ['WhatsApp', '1,850,000', '96.0%', '80.0%', '13.5%', '1.8%', '₹22.8L', '₹68'],
        ['Email', '3,200,000', '92.0%', '35.1%', '2.1%', '0.25%', '₹6.2L', '₹95'],
        ['Push Notification', '1,650,000', '94.0%', '20.0%', '1.5%', '0.1%', '₹1.8L', '₹125'],
        ['RCS', '980,000', '95.0%', '60.0%', '5.7%', '0.68%', '₹1.2L', '₹85']
      ];

      channelPerformanceData.forEach(row => {
        channelSheet.addRow(row);
      });

      channelSheet.columns = [
        { width: 20 }, { width: 15 }, { width: 12 }, { width: 12 }, { width: 12 }, { width: 15 }, { width: 12 }, { width: 15 }
      ];

      // Save the workbook
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer]), `automotive-campaign-advanced-${this.getTimestamp()}.xlsx`);
      });
    });
  }

  // Generate timestamp for unique filenames
  private getTimestamp(): string {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
  }

  // Export specific campaign data
  exportCampaignData(campaignId: string): void {
    // This would typically fetch campaign-specific data from a service
    const campaignData = [
      { Date: '2025-01-01', Channel: 'WhatsApp', Sent: 45000, Delivered: 43200, Opens: 34560, Clicks: 4665, Conversions: 653, Revenue: 48975 },
      { Date: '2025-01-02', Channel: 'WhatsApp', Sent: 48000, Delivered: 46080, Opens: 36864, Clicks: 4972, Conversions: 696, Revenue: 52200 },
      { Date: '2025-01-03', Channel: 'SMS', Sent: 52000, Delivered: 49400, Opens: 29640, Clicks: 2371, Conversions: 332, Revenue: 24900 }
    ];

    this.exportToExcel(campaignData, `campaign-${campaignId}-data`);
  }
}