
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Map, TrafficCone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <TrafficCone className="h-8 w-8 text-traffic-teal" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              SmartTraffic
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center">
                <Navigation className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center">
                <Map className="mr-2 h-4 w-4" />
                Traffic Map
              </Link>
            </Button>
          </nav>

          <div className="flex items-center">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
