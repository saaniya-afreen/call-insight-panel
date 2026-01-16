export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface TranscriptMessage {
  role: 'assistant' | 'user';
  content: string;
}

export interface TranscriptData {
  messages: TranscriptMessage[];
}

export interface ExtractedInfoData {
  call_sign: string;
  imo_number: string;
  caller_name: string;
  vessel_name: string;
  company_name: string;
  answered_your_query: string;
}

export interface CallLog {
  id: string;
  event_type: string;
  event_id: string;
  call_id: string;
  from_number: string;
  to_number: string;
  direction: 'inbound' | 'outbound';
  transcript: string;
  call_status: string;
  start_timestamp: number;
  end_timestamp: number;
  disconnection_reason: string;
  extracted_info: ExtractedInfoData;
  created_at: string;
}

// Helper functions to transform Supabase data
export const formatDuration = (startTimestamp: number, endTimestamp: number): string => {
  // Timestamps are already in milliseconds
  const durationMs = endTimestamp - startTimestamp;
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const formatDate = (timestamp: number): string => {
  // Timestamp is in milliseconds
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatTime = (timestamp: number): string => {
  // Timestamp is in milliseconds
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const parseTranscript = (transcriptJson: string): TranscriptMessage[] => {
  try {
    const data: TranscriptData = JSON.parse(transcriptJson);
    return data.messages || [];
  } catch {
    return [];
  }
};

export const mapDirection = (direction: 'inbound' | 'outbound'): 'incoming' | 'outgoing' => {
  return direction === 'inbound' ? 'incoming' : 'outgoing';
};

export const mapCallStatus = (status: string): 'completed' | 'missed' | 'voicemail' => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('complete') || statusLower.includes('ended')) {
    return 'completed';
  }
  if (statusLower.includes('miss') || statusLower.includes('no-answer')) {
    return 'missed';
  }
  if (statusLower.includes('voicemail')) {
    return 'voicemail';
  }
  return 'completed';
};
