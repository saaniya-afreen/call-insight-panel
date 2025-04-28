
import React, { useState } from 'react';
import { callLogs, CallLog } from '../data/callData';
import CallLogItem from './CallLogItem';
import { Search } from 'lucide-react';

interface CallLogTableProps {
  onCallSelect: (call: CallLog) => void;
  selectedCallId: string | null;
}

const CallLogTable: React.FC<CallLogTableProps> = ({ onCallSelect, selectedCallId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCalls = callLogs.filter(call => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      call.caller.toLowerCase().includes(searchTermLower) ||
      call.recipient.toLowerCase().includes(searchTermLower) ||
      call.date.toLowerCase().includes(searchTermLower)
    );
  });
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Call Logs</h2>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search calls..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {filteredCalls.length > 0 ? (
          filteredCalls.map(call => (
            <CallLogItem 
              key={call.id} 
              call={call} 
              isSelected={selectedCallId === call.id}
              onClick={() => onCallSelect(call)} 
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No calls found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default CallLogTable;
