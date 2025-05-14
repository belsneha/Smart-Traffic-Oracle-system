
import React, { useState } from 'react';
import { useMapContext } from './MapContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Incident } from '../types';

const IncidentReport: React.FC = () => {
  const { addIncident } = useMapContext();
  const { toast } = useToast();
  const [reportForm, setReportForm] = useState({
    type: 'accident' as Incident['type'],
    severity: 'medium' as Incident['severity'],
    description: '',
    // In a real application, we would get these from a map click or address input
    location: { lat: 40.7328, lng: -73.9860 }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportForm.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a description of the incident.",
        variant: "destructive"
      });
      return;
    }

    addIncident(reportForm);
    
    // Reset form
    setReportForm(prev => ({
      ...prev,
      description: '',
    }));

    toast({
      title: "Incident Reported",
      description: "The incident has been successfully reported and added to the system.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-medium flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
          Report Traffic Incident
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Incident Type</Label>
            <RadioGroup 
              defaultValue="accident"
              className="flex flex-wrap gap-4"
              onValueChange={(value) => setReportForm(prev => ({ 
                ...prev, 
                type: value as Incident['type'] 
              }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accident" id="accident" />
                <Label htmlFor="accident">Accident</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="construction" id="construction" />
                <Label htmlFor="construction">Construction</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="event" id="event" />
                <Label htmlFor="event">Event</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weather" id="weather" />
                <Label htmlFor="weather">Weather</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Severity</Label>
            <RadioGroup 
              defaultValue="medium" 
              className="flex gap-4"
              onValueChange={(value) => setReportForm(prev => ({ 
                ...prev, 
                severity: value as Incident['severity'] 
              }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">High</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              placeholder="Describe the incident..."
              value={reportForm.description}
              onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="pt-2">
            <Button type="submit">Report Incident</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncidentReport;
