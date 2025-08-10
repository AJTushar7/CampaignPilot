import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Megaphone, Mail, MousePointer, TrendingUp as Growth, DollarSign } from "lucide-react";

interface KPIMetrics {
  totalCampaigns: number;
  openRate: string;
  clickRate: string;
  conversionRate: string;
  totalSpend: string;
  campaignsGrowth: string;
  openRateGrowth: string;
  clickRateGrowth: string;
  conversionGrowth: string;
  spendGrowth: string;
}

interface KPICardsProps {
  metrics?: KPIMetrics;
}

export default function KPICards({ metrics }: KPICardsProps) {
  if (!metrics) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-slate-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </section>
    );
  }

  const getTrendIcon = (value: string) => {
    if (value.startsWith('+')) return TrendingUp;
    if (value.startsWith('-')) return TrendingDown;
    return Minus;
  };

  const getTrendColor = (value: string) => {
    if (value.startsWith('+')) return "text-green-600";
    if (value.startsWith('-')) return "text-red-600";
    return "text-amber-600";
  };

  const kpiData = [
    {
      label: "Total Campaigns",
      value: metrics.totalCampaigns,
      growth: metrics.campaignsGrowth,
      icon: Megaphone,
      bgColor: "bg-blue-100",
      iconColor: "text-primary"
    },
    {
      label: "Open Rate",
      value: `${metrics.openRate}%`,
      growth: `${metrics.openRateGrowth}%`,
      icon: Mail,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      label: "Click Rate", 
      value: `${metrics.clickRate}%`,
      growth: `${metrics.clickRateGrowth}%`,
      icon: MousePointer,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      label: "Conversion Rate",
      value: `${metrics.conversionRate}%`,
      growth: `${metrics.conversionGrowth}%`,
      icon: Growth,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      label: "Total Spend",
      value: metrics.totalSpend,
      growth: `${metrics.spendGrowth}%`,
      icon: DollarSign,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {kpiData.map((kpi, index) => {
        const TrendIcon = getTrendIcon(kpi.growth);
        const trendColor = getTrendColor(kpi.growth);
        const IconComponent = kpi.icon;

        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{kpi.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                  <p className={`text-xs ${trendColor} flex items-center mt-1`}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    <span>{kpi.growth}</span>
                  </p>
                </div>
                <div className={`${kpi.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`${kpi.iconColor} h-5 w-5`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
