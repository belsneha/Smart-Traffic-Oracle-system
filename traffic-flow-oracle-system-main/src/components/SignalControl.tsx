
import React from 'react';
import { useMapContext } from './MapContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrafficCone } from 'lucide-react';

const SignalControl: React.FC = () => {
  const { intersections, selectedIntersection, selectIntersection, toggleSignal } = useMapContext();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-medium">
            <TrafficCone className="h-4 w-4 inline mr-1" /> Traffic Signal Control
          </CardTitle>
          <Select
            value={selectedIntersection?.id || ''}
            onValueChange={(value) => selectIntersection(value || null)}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select intersection" />
            </SelectTrigger>
            <SelectContent>
              {intersections.map(intersection => (
                <SelectItem key={intersection.id} value={intersection.id}>
                  {intersection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {selectedIntersection ? (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Status</span>
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-4 h-4 rounded-full
                    ${selectedIntersection.signalState === 'red' ? 'bg-traffic-red' : 
                      selectedIntersection.signalState === 'yellow' ? 'bg-traffic-yellow' : 
                      'bg-traffic-green'}`}
                />
                <span className="capitalize">{selectedIntersection.signalState}</span>
                
                <Badge variant="outline" className="ml-2">
                  {selectedIntersection.congestionLevel > 65 ? 'Heavy Traffic' : 
                   selectedIntersection.congestionLevel > 35 ? 'Moderate Traffic' : 'Light Traffic'}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Features</span>
              <div className="flex space-x-2">
                <Badge variant={selectedIntersection.cameras ? "default" : "outline"}>
                  Cameras {selectedIntersection.cameras ? "✓" : "✗"}
                </Badge>
                <Badge variant={selectedIntersection.sensors ? "default" : "outline"}>
                  Sensors {selectedIntersection.sensors ? "✓" : "✗"}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Signal Control</span>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant={selectedIntersection.signalState === 'red' ? 'default' : 'outline'}
                  className={selectedIntersection.signalState === 'red' ? 'bg-traffic-red hover:bg-red-600' : ''}
                  onClick={() => toggleSignal(selectedIntersection.id)}
                >
                  Red
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedIntersection.signalState === 'yellow' ? 'default' : 'outline'}
                  className={selectedIntersection.signalState === 'yellow' ? 'bg-traffic-yellow hover:bg-amber-500 text-black' : ''}
                  onClick={() => toggleSignal(selectedIntersection.id)}
                >
                  Yellow
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedIntersection.signalState === 'green' ? 'default' : 'outline'}
                  className={selectedIntersection.signalState === 'green' ? 'bg-traffic-green hover:bg-green-600' : ''}
                  onClick={() => toggleSignal(selectedIntersection.id)}
                >
                  Green
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40 text-muted-foreground">
            Select an intersection to control its traffic signal
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SignalControl;
