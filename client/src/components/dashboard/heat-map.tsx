import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function HeatMap() {
  const [selectedMetric, setSelectedMetric] = useState("engagement_rate");

  // Mock heat map data - 14 cells for simplified 2-week view
  const heatMapData = [
    { value: 85, intensity: 'high' },
    { value: 45, intensity: 'low' },
    { value: 67, intensity: 'medium' },
    { value: 92, intensity: 'high' },
    { value: 23, intensity: 'low' },
    { value: 78, intensity: 'medium' },
    { value: 56, intensity: 'medium' },
    { value: 81, intensity: 'high' },
    { value: 94, intensity: 'high' },
    { value: 62, intensity: 'medium' },
    { value: 34, intensity: 'low' },
    { value: 76, intensity: 'medium' },
    { value: 58, intensity: 'medium' },
    { value: 87, intensity: 'high' },
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'bg-green-200 text-green-800 hover:bg-green-300';
      case 'medium': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'low': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-slate-100 text-slate-600 hover:bg-slate-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Campaign Performance Heat Map</CardTitle>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engagement_rate">Engagement Rate</SelectItem>
              <SelectItem value="conversion_rate">Conversion Rate</SelectItem>
              <SelectItem value="roi">ROI</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {heatMapData.map((cell, index) => (
            <div
              key={index}
              className={`aspect-square rounded text-xs flex items-center justify-center cursor-pointer transition-colors ${getIntensityColor(cell.intensity)}`}
              title={`${selectedMetric}: ${cell.value}%`}
            >
              {cell.value}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
          <span>Low</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-100 rounded"></div>
            <div className="w-3 h-3 bg-amber-100 rounded"></div>
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <div className="w-3 h-3 bg-green-200 rounded"></div>
          </div>
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  );
}
