
import React from 'react';
import { CallLog } from '../data/callData';
import { Clock, Phone, PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CallLogItemProps {
  call: CallLog;
  isSelected: boolean;
  onClick: () => void;
}

const CallLogItem: React.FC<CallLogItemProps> = ({ call, isSelected, onClick }) => {
  const getStatusColor = () => {
    switch (call.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'voicemail':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCallIcon = () => {
    switch (call.type) {
      case 'incoming':
        return <PhoneIncoming size={16} className="text-blue-500" />;
      case 'outgoing':
        return <PhoneOutgoing size={16} className="text-green-500" />;
      default:
        return <Phone size={16} className="text-gray-500" />;
    }
  };

  return (
    <div 
      className={cn(
        "flex flex-col p-4 border-b cursor-pointer transition-colors",
        isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium text-gray-900">{call.caller}</div>
        <div className="text-xs text-gray-500">{call.date}</div>
      </div>
      
      <div className="flex justify-between text-sm">
        <div className="flex items-center text-gray-600">
          <span className="mr-2">{getCallIcon()}</span>
          <span>to {call.recipient}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>{call.time}</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-2 items-center">
        <div className="flex items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
            {call.status}
          </span>
        </div>
        <div className="text-xs text-gray-500">{call.duration}</div>
      </div>
    </div>
  );
};

export default CallLogItem;
