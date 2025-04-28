
import React from 'react';
import { CallTranscription } from '../data/callData';

interface TranscriptionTabProps {
  transcription: CallTranscription | undefined;
}

const TranscriptionTab: React.FC<TranscriptionTabProps> = ({ transcription }) => {
  if (!transcription) {
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

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Call Transcription</h3>
        <p className="text-sm text-gray-500 mt-1">
          Full conversation transcript with timestamps.
        </p>
      </div>
      
      <div className="space-y-6 mt-4">
        {transcription.segments.map((segment, index) => (
          <div key={index} className="flex">
            <div className="flex-shrink-0 w-16 text-xs text-gray-500 pt-1">
              {segment.timestamp}
            </div>
            <div className="flex-grow">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {segment.speaker}
              </div>
              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg rounded-tl-none">
                {segment.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptionTab;
