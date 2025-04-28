
import React, { useState } from 'react';
import CallLogTable from '@/components/CallLogTable';
import CallInsightPanel from '@/components/CallInsightPanel';
import { CallLog } from '@/data/callData';

const Index = () => {
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  
  const handleCallSelect = (call: CallLog) => {
    setSelectedCall(call);
  };
  
  const handleClosePanel = () => {
    setSelectedCall(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 px-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Call Insight Dashboard</h1>
          <p className="text-gray-600 mt-1">
            View and analyze your call logs with detailed insights
          </p>
        </header>
        
        <div className="flex flex-1">
          <div className={`transition-all duration-300 ease-in-out ${selectedCall ? 'w-2/3' : 'w-full'}`}>
            <CallLogTable 
              onCallSelect={handleCallSelect}
              selectedCallId={selectedCall?.id || null}
            />
          </div>
          
          {/* Overlay for mobile when panel is open */}
          {selectedCall && (
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={handleClosePanel}
            ></div>
          )}
          
          <CallInsightPanel call={selectedCall} onClose={handleClosePanel} />
        </div>
      </div>
    </div>
  );
};

export default Index;
