import React from 'react';
import type { TranscriptMessage } from '@/types/supabase';

interface TranscriptionTabProps {
  messages: TranscriptMessage[];
}

const TranscriptionTab: React.FC<TranscriptionTabProps> = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <div className="text-gray-400 text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 mx-auto mb-4"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          <p className="text-lg font-medium">No transcription available</p>
          <p className="text-sm mt-2">This call has not been transcribed yet.</p>
        </div>
      </div>
    );
  }

  const getSpeakerLabel = (role: 'assistant' | 'user') => {
    return role === 'assistant' ? 'AI Assistant' : 'Customer';
  };

  const getSpeakerStyles = (role: 'assistant' | 'user') => {
    if (role === 'assistant') {
      return {
        bubble: 'bg-blue-50 text-blue-900 rounded-tl-none',
        label: 'text-blue-600'
      };
    }
    return {
      bubble: 'bg-gray-50 text-gray-900 rounded-tr-none',
      label: 'text-gray-600'
    };
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Call Transcription</h3>
        <p className="text-sm text-gray-500 mt-1">
          Full conversation transcript.
        </p>
      </div>
      
      <div className="space-y-4 mt-4">
        {messages.map((message, index) => {
          const styles = getSpeakerStyles(message.role);
          const isAssistant = message.role === 'assistant';
          
          return (
            <div 
              key={index} 
              className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[85%] ${isAssistant ? '' : 'text-right'}`}>
                <div className={`text-xs font-medium mb-1 ${styles.label}`}>
                  {getSpeakerLabel(message.role)}
                </div>
                <div className={`text-sm p-3 rounded-lg ${styles.bubble}`}>
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TranscriptionTab;
