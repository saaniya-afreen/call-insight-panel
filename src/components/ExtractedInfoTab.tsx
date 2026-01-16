import React from 'react';
import type { ExtractedInfoData } from '@/types/supabase';
import { Ship, Building2, User, Hash, Anchor, CheckCircle2 } from 'lucide-react';

interface ExtractedInfoTabProps {
  extractedInfo: ExtractedInfoData | undefined;
}

const ExtractedInfoTab: React.FC<ExtractedInfoTabProps> = ({ extractedInfo }) => {
  if (!extractedInfo) {
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <p className="text-lg font-medium">No extracted information available</p>
          <p className="text-sm mt-2">This call has not been analyzed yet.</p>
        </div>
      </div>
    );
  }

  const infoItems = [
    { 
      label: 'Caller Name', 
      value: extractedInfo.caller_name, 
      icon: User,
      color: 'text-blue-500'
    },
    { 
      label: 'Company Name', 
      value: extractedInfo.company_name, 
      icon: Building2,
      color: 'text-purple-500'
    },
    { 
      label: 'Vessel Name', 
      value: extractedInfo.vessel_name, 
      icon: Ship,
      color: 'text-cyan-500'
    },
    { 
      label: 'Call Sign', 
      value: extractedInfo.call_sign, 
      icon: Anchor,
      color: 'text-green-500'
    },
    { 
      label: 'IMO Number', 
      value: extractedInfo.imo_number, 
      icon: Hash,
      color: 'text-orange-500'
    },
    { 
      label: 'Query Answered', 
      value: extractedInfo.answered_your_query, 
      icon: CheckCircle2,
      color: extractedInfo.answered_your_query?.toLowerCase() === 'yes' 
        ? 'text-green-500' 
        : 'text-red-500'
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Extracted Information</h3>
        <p className="text-sm text-gray-500 mt-1">
          Key details automatically extracted from this call.
        </p>
      </div>
      
      <div className="space-y-3">
        {infoItems.map((item, index) => {
          const IconComponent = item.icon;
          const hasValue = item.value && item.value.trim() !== '';
          
          return (
            <div 
              key={index} 
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <IconComponent className={`h-5 w-5 ${item.color} mr-3 flex-shrink-0`} />
              <div className="flex-grow min-w-0">
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {item.label}
                </div>
                <div className={`text-sm font-medium truncate ${hasValue ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                  {hasValue ? item.value : 'Not provided'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtractedInfoTab;
