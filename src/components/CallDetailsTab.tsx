
import React from 'react';
import { CallLog } from '../data/callData';
import { 
  CalendarIcon, 
  Clock, 
  PhoneIncoming, 
  PhoneOutgoing,
  User,
  Users
} from 'lucide-react';

interface CallDetailsTabProps {
  call: CallLog;
}

const CallDetailsTab: React.FC<CallDetailsTabProps> = ({ call }) => {
  const getStatusBadgeClass = () => {
    switch (call.status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'missed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'voicemail':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Call Information</h3>
        <div className="mt-1 text-sm text-gray-500">
          Details about the selected call.
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          {call.type === 'incoming' ? (
            <PhoneIncoming className="h-5 w-5 text-blue-500 mr-3" />
          ) : (
            <PhoneOutgoing className="h-5 w-5 text-green-500 mr-3" />
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">
              {call.type === 'incoming' ? 'Incoming Call' : 'Outgoing Call'}
            </div>
            <div className="text-sm text-gray-500">
              Type
            </div>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <User className="h-5 w-5 text-gray-500 mr-3" />
          <div>
            <div className="text-sm font-medium text-gray-900">{call.caller}</div>
            <div className="text-sm text-gray-500">Caller</div>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <Users className="h-5 w-5 text-gray-500 mr-3" />
          <div>
            <div className="text-sm font-medium text-gray-900">{call.recipient}</div>
            <div className="text-sm text-gray-500">Recipient</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <CalendarIcon className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-900">{call.date}</div>
              <div className="text-sm text-gray-500">Date</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <Clock className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-900">{call.time}</div>
              <div className="text-sm text-gray-500">Time</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between p-3 bg-gray-50 rounded-md">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-900">{call.duration}</div>
              <div className="text-sm text-gray-500">Duration</div>
            </div>
          </div>
          
          <div className={`px-3 py-1 text-sm border rounded-full ${getStatusBadgeClass()}`}>
            {call.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallDetailsTab;
