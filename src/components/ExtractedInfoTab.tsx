
import React from 'react';
import { ExtractedInfo } from '../data/callData';

interface ExtractedInfoTabProps {
  extractedInfo: ExtractedInfo | undefined;
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

  const getSentimentColor = () => {
    const score = extractedInfo.sentimentScore;
    
    if (score > 0.5) return 'text-green-600 bg-green-50';
    if (score > 0 && score <= 0.5) return 'text-green-500 bg-green-50';
    if (score === 0) return 'text-gray-500 bg-gray-50';
    if (score >= -0.5 && score < 0) return 'text-red-500 bg-red-50';
    if (score < -0.5) return 'text-red-600 bg-red-50';
    
    return 'text-gray-500 bg-gray-50';
  };

  const getSentimentEmoji = () => {
    const score = extractedInfo.sentimentScore;
    
    if (score > 0.5) return '😄';
    if (score > 0 && score <= 0.5) return '🙂';
    if (score === 0) return '😐';
    if (score >= -0.5 && score < 0) return '🙁';
    if (score < -0.5) return '😠';
    
    return '😐';
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Extracted Information</h3>
        <p className="text-sm text-gray-500 mt-1">
          Key insights automatically extracted from this call.
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Topics */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Topics Discussed</h4>
          <div className="flex flex-wrap gap-2">
            {extractedInfo.topics.map((topic, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        
        {/* Sentiment */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Sentiment Analysis</h4>
          <div className={`inline-flex items-center px-4 py-2 rounded-md ${getSentimentColor()}`}>
            <span className="text-xl mr-2">{getSentimentEmoji()}</span>
            <span className="text-sm">
              {extractedInfo.sentimentScore > 0 
                ? `Positive (${extractedInfo.sentimentScore})` 
                : extractedInfo.sentimentScore < 0 
                  ? `Negative (${extractedInfo.sentimentScore})` 
                  : 'Neutral'}
            </span>
          </div>
        </div>
        
        {/* Action Items */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Action Items</h4>
          <ul className="space-y-2">
            {extractedInfo.actionItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-4 h-4 bg-amber-400 rounded-full mt-1 mr-2"></span>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Key Entities */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Entities</h4>
          <div className="bg-gray-50 rounded-md p-3">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">
                    Entity
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {extractedInfo.keyEntities.map((entity, index) => (
                  <tr key={index}>
                    <td className="py-2 text-sm text-gray-700">
                      {entity.name}
                    </td>
                    <td className="py-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                        {entity.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractedInfoTab;
