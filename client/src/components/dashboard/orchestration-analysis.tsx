import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function OrchestrationAnalysis() {
  const orchestrationData = [
    {
      journey: "Email → SMS",
      performance: "+34%",
      trend: "up",
      color: "bg-green-500"
    },
    {
      journey: "Push → WhatsApp", 
      performance: "+12%",
      trend: "up",
      color: "bg-amber-500"
    },
    {
      journey: "SMS → RCS",
      performance: "-8%",
      trend: "down",
      color: "bg-red-500"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-amber-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Journey Orchestration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orchestrationData.map((item, index) => {
            const TrendIcon = getTrendIcon(item.trend);
            const trendColor = getTrendColor(item.trend);
            
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-sm font-medium">{item.journey}</span>
                </div>
                <div className={`text-sm font-bold flex items-center ${trendColor}`}>
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {item.performance}
                </div>
              </div>
            );
          })}
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 text-primary hover:text-blue-600 border-primary hover:bg-blue-50"
        >
          View Full Analysis
        </Button>
      </CardContent>
    </Card>
  );
}
