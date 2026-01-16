
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { CallLog } from '@/types/supabase';
import type { CallTranscription as OriginalTranscription, ExtractedInfo as OriginalExtractedInfo } from '@/data/callData';
import { useCallTranscription, useExtractedInfo } from '@/hooks/useCallLogs';
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
  const { data: transcription, isLoading: transcriptionLoading } = useCallTranscription(call?.id || null);
  const { data: extractedInfo, isLoading: extractedLoading } = useExtractedInfo(call?.id || null);

  if (!call) return null;

  const TabButton: React.FC<{
    tab: TabType;
    label: string;
    active: boolean;
    onClick: () => void;
  }> = ({ tab, label, active, onClick }) => (
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

  // Transform Supabase data to match component interfaces
  const formattedTranscription: OriginalTranscription | undefined = transcription ? {
    id: transcription.id,
    text: transcription.full_text,
    segments: (transcription.segments as Array<{ speaker: string; text: string; timestamp: string }>) || []
  } : undefined;

  const formattedExtractedInfo: OriginalExtractedInfo | undefined = extractedInfo ? {
    id: extractedInfo.id,
    topics: extractedInfo.topics,
    sentimentScore: extractedInfo.sentiment_score,
    actionItems: extractedInfo.action_items,
    keyEntities: (extractedInfo.key_entities as Array<{ name: string; type: string }>) || []
  } : undefined;

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
          transcriptionLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <TranscriptionTab transcription={formattedTranscription} />
          )
        )}
        {activeTab === 'extracted' && (
          extractedLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <ExtractedInfoTab extractedInfo={formattedExtractedInfo} />
          )
        )}
      </div>
    </div>
  );
};

export default CallInsightPanel;
