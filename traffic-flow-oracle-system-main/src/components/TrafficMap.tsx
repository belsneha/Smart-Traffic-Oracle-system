
import React, { useEffect, useRef } from 'react';
import { useMapContext } from './MapContext';
import { Card, CardContent } from '@/components/ui/card';
import { Map } from 'lucide-react';

const TrafficMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { intersections, incidents, selectIntersection } = useMapContext();

  // In a real application, we would use a mapping library like Mapbox, Google Maps, or Leaflet
  // For now, we'll create a placeholder map with some visual elements

  useEffect(() => {
    // In a real implementation, this is where we would initialize the map library
    console.log('Map would be initialized here with real implementation');
  }, []);

  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <div className="bg-slate-100 p-4 flex items-center justify-between border-b">
          <div className="flex items-center">
            <Map className="h-5 w-5 text-traffic-blue mr-2" />
            <h3 className="font-medium">Traffic Map</h3>
          </div>
        </div>
        
        <div className="relative">
          <div ref={mapRef} className="w-full h-[400px] bg-slate-200 relative overflow-hidden">
            {/* This is a placeholder for an actual map. In a real app, we'd render a map here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                Interactive map would be displayed here.<br />
                In production, this would use Mapbox, Google Maps, or a similar service.
              </p>
            </div>
            
            {/* Visual representation of intersections */}
            {intersections.map((intersection, index) => {
              // Calculate mock positions for demo purposes
              const left = 20 + (index * 18) + '%';
              const top = 30 + (Math.sin(index) * 20) + '%';
              
              return (
                <div 
                  key={intersection.id}
                  className="absolute w-6 h-6 rounded-full cursor-pointer transform hover:scale-110 transition-transform"
                  style={{ 
                    left, 
                    top,
                    backgroundColor: 
                      intersection.signalState === 'red' ? 'rgb(239, 68, 68)' :
                      intersection.signalState === 'yellow' ? 'rgb(251, 191, 36)' : 
                      'rgb(16, 185, 129)',
                    boxShadow: '0 0 0 2px white, 0 0 0 4px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => selectIntersection(intersection.id)}
                  title={intersection.name}
                />
              );
            })}
            
            {/* Visual representation of incidents */}
            {incidents
              .filter(incident => !incident.resolved)
              .map((incident, index) => {
                // Calculate mock positions for demo purposes
                const left = 15 + (index * 20) + '%';
                const top = 60 + (Math.sin(index * 2) * 15) + '%';
                
                return (
                  <div 
                    key={incident.id}
                    className={`
                      absolute w-5 h-5 transform rotate-45 cursor-pointer
                      ${incident.severity === 'high' ? 'bg-red-500' : 
                         incident.severity === 'medium' ? 'bg-amber-500' : 'bg-yellow-400'}
                    `}
                    style={{ left, top }}
                    title={incident.description}
                  />
                );
              })}
          </div>
          
          <div className="flex justify-end gap-4 p-2 bg-white border-t">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-traffic-green mr-1"></div>
              <span className="text-xs">Clear</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-traffic-yellow mr-1"></div>
              <span className="text-xs">Moderate</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-traffic-red mr-1"></div>
              <span className="text-xs">Heavy</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficMap;
