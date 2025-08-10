import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FestivalTimeline() {
  const { data: festivals, isLoading } = useQuery({
    queryKey: ["/api/festivals"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Festivals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-slate-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getGradientClass = (index: number) => {
    const gradients = [
      'bg-gradient-to-r from-red-50 to-pink-50 border-red-100',
      'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-100',
      'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Festivals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {festivals?.map((festival: any, index: number) => (
            <div key={festival.id} className={`flex items-center space-x-3 p-3 rounded-lg border ${getGradientClass(index)}`}>
              <div className="text-2xl">{festival.emoji}</div>
              <div>
                <div className="font-medium text-slate-900">{festival.name}</div>
                <div className="text-sm text-slate-600">
                  {new Date(festival.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })} • {festival.daysLeft} days left
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 text-primary hover:text-blue-600 border-primary hover:bg-blue-50"
        >
          Plan Festival Campaigns
        </Button>
      </CardContent>
    </Card>
  );
}
