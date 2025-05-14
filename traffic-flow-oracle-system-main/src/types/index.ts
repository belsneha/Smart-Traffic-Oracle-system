
// Traffic signal states
export type SignalState = 'red' | 'yellow' | 'green';

// Traffic intersection
export interface Intersection {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  signalState: SignalState;
  congestionLevel: number; // 0-100
  cameras: boolean;
  sensors: boolean;
}

// Traffic incident
export interface Incident {
  id: string;
  type: 'accident' | 'construction' | 'event' | 'weather' | 'other';
  severity: 'low' | 'medium' | 'high';
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  reportedAt: Date;
  resolved: boolean;
}

// Traffic metric
export interface TrafficMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}
