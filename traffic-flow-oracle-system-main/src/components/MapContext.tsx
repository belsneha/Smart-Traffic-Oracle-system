import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Intersection, Incident, SignalState } from '../types';

interface MapContextType {
  intersections: Intersection[];
  incidents: Incident[];
  selectedIntersection: Intersection | null;
  selectIntersection: (id: string | null) => void;
  toggleSignal: (id: string) => void;
  addIncident: (incident: Omit<Incident, 'id' | 'reportedAt' | 'resolved'>) => void;
  resolveIncident: (id: string) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};

interface MapProviderProps {
  children: ReactNode;
}

// Mock data for intersections
const mockIntersections: Intersection[] = [
  {
    id: 'int-001',
    name: 'Main St & 1st Ave',
    location: { lat: 40.7128, lng: -74.006 },
    signalState: 'green',
    congestionLevel: 35,
    cameras: true,
    sensors: true
  },
  {
    id: 'int-002',
    name: 'Broadway & 42nd St',
    location: { lat: 40.7567, lng: -73.9862 },
    signalState: 'red',
    congestionLevel: 78,
    cameras: true,
    sensors: true
  },
  {
    id: 'int-003',
    name: 'Park Ave & 34th St',
    location: { lat: 40.7484, lng: -73.9857 },
    signalState: 'yellow',
    congestionLevel: 42,
    cameras: false,
    sensors: true
  },
  {
    id: 'int-004',
    name: 'Lexington Ave & 59th St',
    location: { lat: 40.7621, lng: -73.9686 },
    signalState: 'green',
    congestionLevel: 25,
    cameras: true,
    sensors: false
  },
  {
    id: 'int-005',
    name: '5th Ave & 23rd St',
    location: { lat: 40.7414, lng: -73.9891 },
    signalState: 'red',
    congestionLevel: 65,
    cameras: true,
    sensors: true
  }
];

// Mock data for incidents
const mockIncidents: Incident[] = [
  {
    id: 'inc-001',
    type: 'accident',
    severity: 'high',
    location: { lat: 40.7228, lng: -74.0060 },
    description: 'Multi-vehicle collision at intersection',
    reportedAt: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    resolved: false
  },
  {
    id: 'inc-002',
    type: 'construction',
    severity: 'medium',
    location: { lat: 40.7467, lng: -73.9862 },
    description: 'Road work - lane closure',
    reportedAt: new Date(Date.now() - 180 * 60000), // 3 hours ago
    resolved: false
  },
  {
    id: 'inc-003',
    type: 'weather',
    severity: 'medium',
    location: { lat: 40.7584, lng: -73.9857 },
    description: 'Flooding affecting northbound lanes',
    reportedAt: new Date(Date.now() - 90 * 60000), // 1.5 hours ago
    resolved: true
  }
];

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [intersections, setIntersections] = useState<Intersection[]>(mockIntersections);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedIntersection, setSelectedIntersection] = useState<Intersection | null>(null);

  const selectIntersection = (id: string | null) => {
    if (!id) {
      setSelectedIntersection(null);
      return;
    }
    
    const intersection = intersections.find(i => i.id === id) || null;
    setSelectedIntersection(intersection);
  };

  const toggleSignal = (id: string) => {
    setIntersections(prev => prev.map(intersection => {
      if (intersection.id !== id) return intersection;
      
      // Cycle through signal states: red -> green -> yellow -> red
      let newState: SignalState = 'red';
      if (intersection.signalState === 'red') newState = 'green';
      else if (intersection.signalState === 'green') newState = 'yellow';
      
      return {
        ...intersection,
        signalState: newState
      };
    }));
  };

  const addIncident = (incidentData: Omit<Incident, 'id' | 'reportedAt' | 'resolved'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: `inc-${Date.now().toString(36)}`,
      reportedAt: new Date(),
      resolved: false
    };

    setIncidents(prev => [...prev, newIncident]);
  };

  const resolveIncident = (id: string) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === id 
          ? { ...incident, resolved: true }
          : incident
      )
    );
  };

  return (
    <MapContext.Provider
      value={{
        intersections,
        incidents,
        selectedIntersection,
        selectIntersection,
        toggleSignal,
        addIncident,
        resolveIncident
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
