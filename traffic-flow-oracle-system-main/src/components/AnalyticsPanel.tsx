
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMapContext } from './MapContext';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

const AnalyticsPanel: React.FC = () => {
  const { intersections, incidents } = useMapContext();
  
  // Calculate data for congestion by intersection
  const congestionData = intersections.map(intersection => ({
    name: intersection.name.split(' & ')[0], // Simplify name for display
    congestion: intersection.congestionLevel,
    color: intersection.congestionLevel > 65 ? '#EF4444' : 
           intersection.congestionLevel > 35 ? '#FBBF24' : '#10B981'
  }));

  // Calculate data for incident types
  const incidentTypeCounts: Record<string, number> = {};
  incidents.forEach(incident => {
    incidentTypeCounts[incident.type] = (incidentTypeCounts[incident.type] || 0) + 1;
  });

  const incidentTypeData = Object.entries(incidentTypeCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: 
      type === 'accident' ? '#EF4444' :
      type === 'construction' ? '#F97316' :
      type === 'event' ? '#2563EB' :
      type === 'weather' ? '#8B5CF6' : 
      '#6B7280'
  }));

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-medium">
            Congestion by Intersection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={congestionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis label={{ value: 'Congestion %', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="congestion" name="Congestion Level" unit="%">
                  {congestionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-md font-medium">
            Incident Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incidentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPanel;
