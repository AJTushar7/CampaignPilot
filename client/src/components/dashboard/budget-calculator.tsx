import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb } from "lucide-react";

export default function BudgetCalculator() {
  const [calculationMode, setCalculationMode] = useState<'pre' | 'post'>('pre');
  const [budget, setBudget] = useState({
    total: '10000',
    smsPercent: '40',
    emailPercent: '30',
    whatsappPercent: '20',
    pushPercent: '10'
  });

  const [projectedMetrics] = useState({
    reach: '45,000 users',
    conversions: '3,780 (8.4%)',
    revenue: '$28,350',
    roi: '184%'
  });

  const handleBudgetChange = (field: string, value: string) => {
    setBudget(prev => ({ ...prev, [field]: value }));
  };

  const calculateROI = () => {
    // TODO: Implement actual ROI calculation logic
    console.log('Calculating ROI with budget:', budget);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Budget vs Performance Calculator</CardTitle>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <Button
              variant={calculationMode === 'pre' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCalculationMode('pre')}
              className="px-4 py-2"
            >
              Pre-Campaign
            </Button>
            <Button
              variant={calculationMode === 'post' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCalculationMode('post')}
              className="px-4 py-2"
            >
              Post-Campaign
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget Planning */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Budget Planning</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="total-budget" className="text-sm font-medium text-slate-700">
                  Total Budget
                </Label>
                <Input
                  id="total-budget"
                  type="number"
                  value={budget.total}
                  onChange={(e) => handleBudgetChange('total', e.target.value)}
                  placeholder="10000"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="sms-percent" className="text-sm font-medium text-slate-700">
                    SMS (%)
                  </Label>
                  <Input
                    id="sms-percent"
                    type="number"
                    value={budget.smsPercent}
                    onChange={(e) => handleBudgetChange('smsPercent', e.target.value)}
                    placeholder="40"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email-percent" className="text-sm font-medium text-slate-700">
                    Email (%)
                  </Label>
                  <Input
                    id="email-percent"
                    type="number"
                    value={budget.emailPercent}
                    onChange={(e) => handleBudgetChange('emailPercent', e.target.value)}
                    placeholder="30"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="whatsapp-percent" className="text-sm font-medium text-slate-700">
                    WhatsApp (%)
                  </Label>
                  <Input
                    id="whatsapp-percent"
                    type="number"
                    value={budget.whatsappPercent}
                    onChange={(e) => handleBudgetChange('whatsappPercent', e.target.value)}
                    placeholder="20"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="push-percent" className="text-sm font-medium text-slate-700">
                    Push (%)
                  </Label>
                  <Input
                    id="push-percent"
                    type="number"
                    value={budget.pushPercent}
                    onChange={(e) => handleBudgetChange('pushPercent', e.target.value)}
                    placeholder="10"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            <Button onClick={calculateROI} className="w-full bg-primary text-white hover:bg-blue-600">
              Calculate Projected ROI
            </Button>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">
              {calculationMode === 'pre' ? 'Projected Performance' : 'Actual Performance'}
            </h4>
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">
                  {calculationMode === 'pre' ? 'Estimated Reach' : 'Actual Reach'}
                </span>
                <span className="font-medium">{projectedMetrics.reach}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">
                  {calculationMode === 'pre' ? 'Expected Conversions' : 'Actual Conversions'}
                </span>
                <span className="font-medium">{projectedMetrics.conversions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">
                  {calculationMode === 'pre' ? 'Projected Revenue' : 'Actual Revenue'}
                </span>
                <span className="font-medium text-green-600">{projectedMetrics.revenue}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3">
                <span className="text-sm font-medium text-slate-900">
                  {calculationMode === 'pre' ? 'Expected ROI' : 'Actual ROI'}
                </span>
                <span className="font-bold text-green-600">{projectedMetrics.roi}</span>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 p-1 rounded">
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h5 className="font-medium text-blue-900">AI Recommendation</h5>
                  <p className="text-sm text-blue-700 mt-1">
                    {calculationMode === 'pre' 
                      ? 'Allocate 15% more budget to WhatsApp for 23% higher conversion potential.'
                      : 'Based on results, consider shifting 10% of SMS budget to email for next campaign.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
