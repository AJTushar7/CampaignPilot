import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Users, Bot } from "lucide-react";

export default function AISuggestions() {
  const suggestions = [
    {
      icon: TrendingUp,
      title: "Optimization Opportunity",
      description: "Sending emails at 2 PM instead of 10 AM could increase open rates by 23%",
      action: "Apply Suggestion",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Users,
      title: "Audience Insight", 
      description: "Mobile users show 45% higher engagement. Consider mobile-first content.",
      action: "View Analysis",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      icon: Bot,
      title: "Smart Automation",
      description: "Set up automated follow-up campaigns to recover 15% of inactive users.",
      action: "Configure Now",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle>AI Insights & Recommendations</CardTitle>
            <p className="text-sm text-slate-600">Powered by machine learning analytics</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            
            return (
              <div key={index} className="bg-white rounded-lg p-4 border border-purple-100">
                <div className="flex items-start space-x-3">
                  <div className={`${suggestion.bgColor} p-2 rounded-lg`}>
                    <IconComponent className={`h-5 w-5 ${suggestion.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{suggestion.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{suggestion.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-primary hover:text-blue-600 mt-2 p-0 h-auto font-medium"
                    >
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
