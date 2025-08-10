import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Mail, Bell, MessageCircle, Smartphone } from "lucide-react";

export default function ChannelPerformance() {
  const { data: performance, isLoading } = useQuery({
    queryKey: ["/api/channel-performance"],
  });

  const channelIcons = {
    SMS: Smartphone,
    WhatsApp: MessageSquare,
    Email: Mail,
    Push: Bell,
    RCS: MessageCircle,
  };

  const channelColors = {
    SMS: "bg-blue-500",
    WhatsApp: "bg-green-500", 
    Email: "bg-red-500",
    Push: "bg-purple-500",
    RCS: "bg-amber-500",
  };

  if (isLoading || !performance) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-slate-200 rounded"></div>
                    <div className="w-20 h-4 bg-slate-200 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-4 flex-1 max-w-md">
                    <div className="flex-1 bg-slate-200 rounded-full h-2"></div>
                    <div className="w-12 h-4 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Channel Performance</CardTitle>
          <Select defaultValue="delivery_rate">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delivery_rate">Delivery Rate</SelectItem>
              <SelectItem value="open_rate">Open Rate</SelectItem>
              <SelectItem value="click_rate">Click Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performance.map((channel: any) => {
            const IconComponent = channelIcons[channel.channel as keyof typeof channelIcons];
            const colorClass = channelColors[channel.channel as keyof typeof channelColors];
            
            return (
              <div key={channel.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <IconComponent className={`h-5 w-5 ${channel.channel === 'SMS' ? 'text-blue-500' : channel.channel === 'WhatsApp' ? 'text-green-500' : channel.channel === 'Email' ? 'text-red-500' : channel.channel === 'Push' ? 'text-purple-500' : 'text-amber-500'}`} />
                  <span className="font-medium text-slate-700">{channel.channel}</span>
                </div>
                <div className="flex items-center space-x-4 flex-1 max-w-md">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${colorClass}`}
                      style={{ width: `${channel.value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-12">{channel.value}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
