import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InactiveCustomers() {
  const { data: inactiveCustomers } = useQuery({
    queryKey: ["/api/inactive-customers"],
  });

  // Mock aggregated data since we don't have a specific endpoint for this
  const inactiveStats = {
    total: 2847,
    winbackEligible: 1234,
    highValue: 567,
    churnRisk: 1046
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inactive Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-red-600">{inactiveStats.total.toLocaleString()}</div>
          <div className="text-sm text-slate-600">customers inactive for 30+ days</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Win-back eligible</span>
            <span className="font-medium text-green-600">{inactiveStats.winbackEligible.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">High-value customers</span>
            <span className="font-medium text-amber-600">{inactiveStats.highValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Churn risk</span>
            <span className="font-medium text-red-600">{inactiveStats.churnRisk.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Button className="w-full bg-primary text-white hover:bg-blue-600">
            Create Win-back Campaign
          </Button>
          <Button variant="outline" className="w-full">
            View Detailed Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
