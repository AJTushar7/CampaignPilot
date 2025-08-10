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

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { ChannelPerformanceComponent } from './components/channel-performance/channel-performance.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { CampaignMonitoringComponent } from './components/campaign-monitoring/campaign-monitoring.component';
import { AiSuggestionsComponent } from './components/ai-suggestions/ai-suggestions.component';
import { BspComparisonComponent } from './components/bsp-comparison/bsp-comparison.component';
import { CampaignDataService } from './services/campaign-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    KpiCardsComponent,
    ChannelPerformanceComponent,
    HeatMapComponent,
    CampaignMonitoringComponent,
    AiSuggestionsComponent,
    BspComparisonComponent
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
    TagModule
  ],
  providers: [CampaignDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }