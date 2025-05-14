
import React from 'react';
import Navbar from '@/components/Navbar';
import DashboardMetrics from '@/components/DashboardMetrics';
import TrafficMap from '@/components/TrafficMap';
import SignalControl from '@/components/SignalControl';
import IncidentReport from '@/components/IncidentReport';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import { MapProvider } from '@/components/MapContext';

const Index: React.FC = () => {
  return (
    <MapProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Traffic Management Dashboard</h1>
          
          <div className="mb-6">
            <DashboardMetrics />
          </div>
          
          <div className="mb-6">
            <TrafficMap />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SignalControl />
            <IncidentReport />
          </div>
          
          <div className="mb-6">
            <AnalyticsPanel />
          </div>
        </main>
      </div>
    </MapProvider>
  );
};

export default Index;
