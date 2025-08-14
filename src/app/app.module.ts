import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
// import { ChartModule } from 'primeng/chart'; // Commented out due to chart.js dependency issue
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { BadgeModule } from 'primeng/badge';
import { RatingModule } from 'primeng/rating';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { ChannelPerformanceComponent } from './components/channel-performance/channel-performance.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { CampaignMonitoringComponent } from './components/campaign-monitoring/campaign-monitoring.component';
import { AiSuggestionsComponent } from './components/ai-suggestions/ai-suggestions.component';
import { BspComparisonComponent } from './components/bsp-comparison/bsp-comparison.component';
import { CampaignDataService } from './services/campaign-data.service';
import { BudgetCalculatorComponent } from './components/budget-calculator/budget-calculator.component';
import { JourneyOrchestrationComponent } from './components/journey-orchestration/journey-orchestration.component';
import { InactiveCustomersComponent } from './components/inactive-customers/inactive-customers.component';
import { FestivalCalendarComponent } from './components/festival-calendar/festival-calendar.component';
import { CampaignNotificationsComponent } from './components/campaign-notifications/campaign-notifications.component';
import { WeeklyCampaignOverviewComponent } from './components/weekly-campaign-overview/weekly-campaign-overview.component';
import { OrchestrationAnalysisComponent } from './components/orchestration-analysis/orchestration-analysis.component';
import { ExportMenuComponent } from './components/export-menu/export-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    KpiCardsComponent,
    ChannelPerformanceComponent,
    HeatMapComponent,
    CampaignMonitoringComponent,
    AiSuggestionsComponent,
    BspComparisonComponent,
    BudgetCalculatorComponent,
    JourneyOrchestrationComponent,
    InactiveCustomersComponent,
    FestivalCalendarComponent,
    CampaignNotificationsComponent,
    WeeklyCampaignOverviewComponent,
    OrchestrationAnalysisComponent,
    ExportMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    DialogModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    PanelModule,
    TagModule,
    MultiSelectModule,
    InputNumberModule,
    SliderModule,
    BadgeModule,
    RatingModule,
    MessagesModule,
    TooltipModule
  ],
  providers: [CampaignDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }