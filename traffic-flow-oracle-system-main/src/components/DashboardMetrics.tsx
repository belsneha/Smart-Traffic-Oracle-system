
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMapContext } from './MapContext';
import { TrafficCone, AlertTriangle, Route, Car } from 'lucide-react';

const DashboardMetrics: React.FC = () => {
  const { intersections, incidents } = useMapContext();
  
  // Calculate metrics
  const activeIncidents = incidents.filter(inc => !inc.resolved).length;
  const totalIntersections = intersections.length;
  
  // Calculate average congestion level
  const avgCongestion = Math.round(
    intersections.reduce((sum, int) => sum + int.congestionLevel, 0) / totalIntersections
  );
  
  const signalStateCount = intersections.reduce((acc, int) => {
    acc[int.signalState] = (acc[int.signalState] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const metrics = [
    {
      title: "Avg. Congestion",
      value: `${avgCongestion}%`,
      description: "Network average",
      icon: <TrafficCone className="h-4 w-4 text-traffic-teal" />,
      color: avgCongestion > 65 ? "text-traffic-red" : 
             avgCongestion > 35 ? "text-traffic-yellow" : "text-traffic-green"
    },
    {
      title: "Active Incidents",
      value: activeIncidents,
      description: "Requiring attention",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      color: "text-gray-900"
    },
    {
      title: "Traffic Signals",
      value: totalIntersections,
      description: `${signalStateCount.green || 0} green, ${signalStateCount.red || 0} red`,
      icon: <Route className="h-4 w-4 text-traffic-blue" />,
      color: "text-gray-900"
    },
    {
      title: "Traffic Flow",
      value: "3,841",
      description: "Vehicles per hour",
      icon: <Car className="h-4 w-4 text-gray-600" />,
      color: "text-gray-900"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center">
              {metric.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
