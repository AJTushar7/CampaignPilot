import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Clock, Users, DollarSign, TrendingUp, Edit3, Pause, Play, Trash2 } from "lucide-react";

interface CampaignDetailsModalProps {
  campaignId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CampaignDetailsModal({ campaignId, isOpen, onClose }: CampaignDetailsModalProps) {
  const { data: campaign, isLoading } = useQuery({
    queryKey: ["/api/campaigns", campaignId],
    enabled: !!campaignId && isOpen,
  });

  if (!isOpen || !campaignId) return null;

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="animate-pulse">
              <div className="h-64 bg-slate-200 rounded"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!campaign) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Campaign Not Found</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8 text-slate-500">
            <p>Campaign details could not be loaded.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      case 'completed': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const deliveryRate = campaign.sent ? ((campaign.delivered / campaign.sent) * 100).toFixed(1) : '0';
  const openRate = campaign.sent ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : '0';
  const clickRate = campaign.sent ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : '0';
  const conversionRate = campaign.sent ? ((campaign.converted / campaign.sent) * 100).toFixed(1) : '0';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{campaign.name}</DialogTitle>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(campaign.status)}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.targetAudience?.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Total Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${campaign.cost}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Delivery Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deliveryRate}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionRate}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Details Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Campaign Type</label>
                      <p className="text-slate-900">{campaign.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Channels</label>
                      <p className="text-slate-900">
                        {Array.isArray(campaign.channels) ? campaign.channels.join(', ') : campaign.channels}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Created</label>
                      <p className="text-slate-900">{formatDate(campaign.createdAt)}</p>
                    </div>
                    {campaign.startedAt && (
                      <div>
                        <label className="text-sm font-medium text-slate-600">Started</label>
                        <p className="text-slate-900">{formatDate(campaign.startedAt)}</p>
                      </div>
                    )}
                    {campaign.scheduledAt && (
                      <div>
                        <label className="text-sm font-medium text-slate-600">Scheduled</label>
                        <p className="text-slate-900">{formatDate(campaign.scheduledAt)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Sent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{campaign.sent?.toLocaleString() || 0}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Delivered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{campaign.delivered?.toLocaleString() || 0}</div>
                    <div className="text-xs text-slate-600">{deliveryRate}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Opened</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{campaign.opened?.toLocaleString() || 0}</div>
                    <div className="text-xs text-slate-600">{openRate}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Clicked</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{campaign.clicked?.toLocaleString() || 0}</div>
                    <div className="text-xs text-slate-600">{clickRate}%</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-slate-500">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <p>Detailed audience analytics would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit Campaign
                    </Button>
                    {campaign.status === 'active' && (
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-1" />
                        Pause Campaign
                      </Button>
                    )}
                    {campaign.status === 'paused' && (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Resume Campaign
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
