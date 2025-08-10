import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, Pause, Play, Edit3, LayoutGrid, List } from "lucide-react";

interface CampaignMonitoringProps {
  onViewDetails: (campaignId: string) => void;
}

export default function CampaignMonitoring({ onViewDetails }: CampaignMonitoringProps) {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Real-time Campaign Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse border border-slate-200 rounded-xl p-6">
                <div className="h-32 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredCampaigns = campaigns?.filter((campaign: any) => 
    statusFilter === 'all' || campaign.status === statusFilter
  ) || [];

  const paginatedCampaigns = filteredCampaigns.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const totalPages = Math.ceil(filteredCampaigns.length / cardsPerPage);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'destructive';
      case 'scheduled': return 'secondary';
      case 'completed': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      case 'completed': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const then = new Date(date);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Real-time Campaign Monitoring</CardTitle>
          <div className="flex items-center space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex bg-slate-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
                className="px-3 py-1"
              >
                <LayoutGrid className="h-4 w-4 mr-1" />
                Cards
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="px-3 py-1"
              >
                <List className="h-4 w-4 mr-1" />
                Table
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'cards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-slate-600">
                  {currentPage * cardsPerPage + 1}-{Math.min((currentPage + 1) * cardsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage >= totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-slate-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: 2 min ago
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paginatedCampaigns.map((campaign: any) => (
                <div key={campaign.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">{campaign.name}</h4>
                      <p className="text-sm text-slate-600">
                        {campaign.type} • {Array.isArray(campaign.channels) ? campaign.channels.join(' + ') : campaign.channels}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                      {campaign.status === 'active' && (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      {campaign.status === 'paused' && (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      {campaign.status === 'scheduled' && (
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {campaign.status !== 'scheduled' ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Sent</span>
                          <span className="font-medium">{campaign.sent?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Delivered</span>
                          <span className="font-medium">
                            {campaign.delivered?.toLocaleString() || 0} ({campaign.sent ? ((campaign.delivered / campaign.sent) * 100).toFixed(1) : 0}%)
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Opened</span>
                          <span className="font-medium">
                            {campaign.opened?.toLocaleString() || 0} ({campaign.sent ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%)
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Clicked</span>
                          <span className="font-medium">
                            {campaign.clicked?.toLocaleString() || 0} ({campaign.sent ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : 0}%)
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Target Audience</span>
                          <span className="font-medium">{campaign.targetAudience?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Estimated Cost</span>
                          <span className="font-medium">${campaign.cost}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Channel</span>
                          <span className="font-medium">
                            {Array.isArray(campaign.channels) ? campaign.channels.join(', ') : campaign.channels}
                          </span>
                        </div>
                        {campaign.scheduledAt && (
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="text-xs text-slate-600 mb-1">Scheduled for:</div>
                            <div className="text-sm font-medium text-slate-900">
                              {new Date(campaign.scheduledAt).toLocaleDateString()} at {new Date(campaign.scheduledAt).toLocaleTimeString()}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {campaign.status === 'paused' && (
                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                        <div className="text-xs text-amber-700 font-medium mb-1 flex items-center">
                          <Pause className="h-3 w-3 mr-1" />
                          Campaign Paused
                        </div>
                        <div className="text-xs text-amber-600">Paused due to low engagement</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      {campaign.status === 'scheduled' ? 'Created' : 
                       campaign.status === 'paused' ? 'Paused' : 'Started'}: {' '}
                      <span>
                        {formatTimeAgo(
                          campaign.status === 'scheduled' ? campaign.createdAt :
                          campaign.status === 'paused' ? campaign.pausedAt :
                          campaign.startedAt
                        )}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewDetails(campaign.id)}
                      className="text-primary hover:text-blue-600"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
