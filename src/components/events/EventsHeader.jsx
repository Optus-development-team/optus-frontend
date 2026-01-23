import { Building2, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import { DEMO_COMPANY_NAME, DEMO_ROLE } from '../../utils/eventsSupabase';
import './EventsHeader.css';

export const EventsHeader = () => {
  return (
    <header className="events-header">
      <div className="events-header-container">
        <div className="events-header-left">
          <div className="events-logo">
            <div className="events-logo-icon">
              <span className="events-logo-text">O</span>
            </div>
            <div>
              <h1 className="events-title">OptuSBMS</h1>
              <p className="events-subtitle">Owner Dashboard</p>
            </div>
          </div>
          <div className="events-company-badge">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">{DEMO_COMPANY_NAME}</span>
            <Badge variant="secondary" className="ml-1">
              <User className="w-3 h-3 mr-1" />
              {DEMO_ROLE}
            </Badge>
          </div>
        </div>

        <div className="events-header-right">
          <span className="events-realtime-indicator">
            <span className="events-pulse" />
            Real-time
          </span>
        </div>
      </div>

      {/* Mobile: Tenant Info */}
      <div className="events-mobile-company">
        <Building2 className="w-4 h-4 text-gray-500" />
        <span className="text-sm">{DEMO_COMPANY_NAME}</span>
        <Badge variant="secondary" className="ml-auto">
          <User className="w-3 h-3 mr-1" />
          {DEMO_ROLE}
        </Badge>
      </div>
    </header>
  );
};
