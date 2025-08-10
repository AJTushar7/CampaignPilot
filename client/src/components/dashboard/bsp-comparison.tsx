import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function BSPComparison() {
  const { data: providers, isLoading } = useQuery({
    queryKey: ["/api/bsp-providers"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>BSP Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreVariant = (score: string) => {
    if (score.includes('A')) return 'default';
    if (score.includes('B')) return 'secondary';
    return 'outline';
  };

  const getScoreColor = (score: string) => {
    if (score.includes('A')) return 'bg-green-100 text-green-800';
    if (score.includes('B')) return 'bg-amber-100 text-amber-800';
    return 'bg-slate-100 text-slate-800';
  };

  const renderProgressBar = (value: string | null) => {
    if (!value) return <span className="text-slate-400 text-sm">N/A</span>;
    
    const numValue = parseInt(value);
    let colorClass = 'bg-red-500';
    if (numValue >= 90) colorClass = 'bg-green-500';
    else if (numValue >= 75) colorClass = 'bg-amber-500';
    
    return (
      <div className="flex items-center space-x-2">
        <div className="w-12 bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${colorClass}`}
            style={{ width: `${numValue}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium w-10">{value}%</span>
      </div>
    );
  };

  const getProviderInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };

  const getProviderColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-red-100 text-red-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-amber-100 text-amber-600'
    ];
    return colors[name.length % colors.length];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>BSP Performance Comparison</CardTitle>
          <Select defaultValue="delivery_rate">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delivery_rate">Delivery Rate</SelectItem>
              <SelectItem value="cost_per_message">Cost per Message</SelectItem>
              <SelectItem value="response_time">Response Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Provider</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">SMS</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">WhatsApp</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Email</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Push</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Overall Score</th>
              </tr>
            </thead>
            <tbody>
              {providers?.map((provider: any) => (
                <tr key={provider.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getProviderColor(provider.name)}`}>
                        <span className="font-bold text-sm">{getProviderInitials(provider.name)}</span>
                      </div>
                      <span className="font-medium">{provider.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {renderProgressBar(provider.smsDeliveryRate)}
                  </td>
                  <td className="py-3 px-4">
                    {renderProgressBar(provider.whatsappDeliveryRate)}
                  </td>
                  <td className="py-3 px-4">
                    {renderProgressBar(provider.emailDeliveryRate)}
                  </td>
                  <td className="py-3 px-4">
                    {renderProgressBar(provider.pushDeliveryRate)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm px-2 py-1 rounded-full font-medium ${getScoreColor(provider.overallScore)}`}>
                      {provider.overallScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
