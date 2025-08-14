import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-calculator',
  templateUrl: './budget-calculator.component.html',
  styleUrls: ['./budget-calculator.component.scss']
})
export class BudgetCalculatorComponent implements OnInit {
  budgetPlan = {
    totalBudget: 10000,
    smsPercentage: 40,
    emailPercentage: 30,
    whatsappPercentage: 20,
    pushPercentage: 10
  };

  projectedPerformance = {
    estimatedReach: 45000,
    expectedConversions: 3780,
    conversionRate: 8.4,
    projectedRevenue: 28350,
    expectedROI: 184
  };

  aiRecommendation = {
    title: 'AI Recommendation',
    message: 'Allocate 15% more budget to WhatsApp for 23% higher conversion potential.',
    confidence: 92
  };

  activeTab = 'pre';
  budgetUsagePercentage = 75.8;
  selectedCampaign = 'diwali-offer';

  campaignOptions = [
    { label: 'Diwali Festival Offer', value: 'diwali-offer' },
    { label: 'Summer Sale Campaign', value: 'summer-sale' },
    { label: 'New Year Promotion', value: 'new-year' },
    { label: 'Monsoon Offers', value: 'monsoon' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.calculateProjectedPerformance();
  }

  onBudgetChange(): void {
    this.calculateProjectedPerformance();
  }

  calculateProjectedPerformance(): void {
    // Simulate ROI calculation based on budget allocation
    const totalBudget = this.budgetPlan.totalBudget;
    const weightedConversion = (
      (this.budgetPlan.smsPercentage * 0.08) +
      (this.budgetPlan.emailPercentage * 0.06) +
      (this.budgetPlan.whatsappPercentage * 0.12) +
      (this.budgetPlan.pushPercentage * 0.04)
    ) / 100;

    this.projectedPerformance.estimatedReach = Math.round(totalBudget * 4.5);
    this.projectedPerformance.expectedConversions = Math.round(this.projectedPerformance.estimatedReach * weightedConversion);
    this.projectedPerformance.conversionRate = parseFloat((weightedConversion * 100).toFixed(1));
    this.projectedPerformance.projectedRevenue = Math.round(this.projectedPerformance.expectedConversions * 7.5);
    this.projectedPerformance.expectedROI = Math.round((this.projectedPerformance.projectedRevenue / totalBudget) * 100);
  }

  calculateProjectedROI(): void {
    this.calculateProjectedPerformance();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getChannelAllocation(channel: string): number {
    return Math.round((this.budgetPlan.totalBudget * this.budgetPlan[channel + 'Percentage']) / 100);
  }
}