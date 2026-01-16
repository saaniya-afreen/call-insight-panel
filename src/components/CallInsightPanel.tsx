import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { CallLog } from '@/types/supabase';
import { parseTranscript } from '@/types/supabase';
import CallDetailsTab from './CallDetailsTab';
import TranscriptionTab from './TranscriptionTab';
import ExtractedInfoTab from './ExtractedInfoTab';
import { cn } from '@/lib/utils';

interface CallInsightPanelProps {
  call: CallLog | null;
  onClose: () => void;
}

type TabType = 'details' | 'transcription' | 'extracted';

const CallInsightPanel: React.FC<CallInsightPanelProps> = ({ call, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('details');

  if (!call) return null;

  const TabButton: React.FC<{
    tab: TabType;
    label: string;
    active: boolean;
    onClick: () => void;
  }> = ({ label, active, onClick }) => (
    <button
      className={cn(
        "py-2 px-4 text-sm font-medium border-b-2 focus:outline-none transition-colors",
        active
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );

  // Parse transcript from JSON string
  const transcriptMessages = parseTranscript(call.transcript);

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l shadow-lg transform transition-transform ease-in-out duration-300 z-40 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Call Insights</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="border-b">
        <div className="flex">
          <TabButton
            tab="details"
            label="Call Details"
            active={activeTab === 'details'}
            onClick={() => setActiveTab('details')}
          />
          <TabButton
            tab="transcription"
            label="Transcription"
            active={activeTab === 'transcription'}
            onClick={() => setActiveTab('transcription')}
          />
          <TabButton
            tab="extracted"
            label="Extracted Info"
            active={activeTab === 'extracted'}
            onClick={() => setActiveTab('extracted')}
          />
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {activeTab === 'details' && <CallDetailsTab call={call} />}
        {activeTab === 'transcription' && (
          <TranscriptionTab messages={transcriptMessages} />
        )}
        {activeTab === 'extracted' && (
          <ExtractedInfoTab extractedInfo={call.extracted_info} />
        )}
      </div>
    </div>
  );
};

export default CallInsightPanel;
