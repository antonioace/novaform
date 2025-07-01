import React from "react";
import { FiActivity } from "react-icons/fi";

interface EventData {
  title: string;
  description: string;
  time: string;
  status: "success" | "error" | "info";
  color: string;
}

interface RecentEventProps {
  event: EventData;
}

export const RecentEvent: React.FC<RecentEventProps> = ({ event }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg mr-3 ${event.color}`}>
        <FiActivity className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{event.title}</p>
        <p className="text-xs text-gray-500">{event.description}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs text-gray-500">{event.time}</p>
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        event.status === 'success' ? 'bg-green-100 text-green-800' : 
        event.status === 'error' ? 'bg-red-100 text-red-800' : 
        'bg-blue-100 text-blue-800'
      }`}>
        {event.status}
      </span>
    </div>
  </div>
); 