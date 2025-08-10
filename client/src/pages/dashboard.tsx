import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, ChevronDown, Clock } from "lucide-react";
import KPICards from "@/components/dashboard/kpi-cards";
import ChannelPerformance from "@/components/dashboard/channel-performance";
import HeatMap from "@/components/dashboard/heat-map";
import CampaignMonitoring from "@/components/dashboard/campaign-monitoring";
import AISuggestions from "@/components/dashboard/ai-suggestions";
import BSPComparison from "@/components/dashboard/bsp-comparison";
import OrchestrationAnalysis from "@/components/dashboard/orchestration-analysis";
import InactiveCustomers from "@/components/dashboard/inactive-customers";
import FestivalTimeline from "@/components/dashboard/festival-timeline";
import BudgetCalculator from "@/components/dashboard/budget-calculator";
import CampaignDetailsModal from "@/components/modals/campaign-details-modal";

export default function Dashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 days");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: kpiMetrics } = useQuery({
    queryKey: ["/api/kpi-metrics"],
  });

  const handleCreateCampaign = () => {
    // TODO: Implement create campaign functionality
    console.log("Create campaign clicked");
  };

  const handleViewCampaignDetails = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCampaignId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-slate-900">Campaign Manager</h1>
              <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4 text-slate-600" />
                <span className="text-sm text-slate-700">{selectedDateRange}</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </div>
            </div>
            <Button onClick={handleCreateCampaign} className="bg-primary text-white hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Cards Section */}
        <KPICards metrics={kpiMetrics} />

        {/* Channel Performance & Heat Map Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChannelPerformance />
          <HeatMap />
        </section>

        {/* Real-time Campaign Monitoring */}
        <CampaignMonitoring onViewDetails={handleViewCampaignDetails} />

        {/* AI Analytics Suggestions */}
        <AISuggestions />

        {/* BSP Comparison */}
        <BSPComparison />

        {/* Bottom Row: Orchestration, Inactive Customers, Festival Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OrchestrationAnalysis />
          <InactiveCustomers />
          <FestivalTimeline />
        </div>

        {/* Budget vs Performance Calculator */}
        <BudgetCalculator />
      </main>

      {/* Campaign Details Modal */}
      <CampaignDetailsModal
        campaignId={selectedCampaignId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
