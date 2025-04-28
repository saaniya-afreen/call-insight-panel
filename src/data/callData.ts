
export interface CallLog {
  id: string;
  caller: string;
  recipient: string;
  date: string;
  time: string;
  duration: string;
  type: 'incoming' | 'outgoing';
  status: 'completed' | 'missed' | 'voicemail';
}

export interface CallTranscription {
  id: string;
  text: string;
  segments: {
    speaker: string;
    text: string;
    timestamp: string;
  }[];
}

export interface ExtractedInfo {
  id: string;
  topics: string[];
  sentimentScore: number;
  actionItems: string[];
  keyEntities: {
    name: string;
    type: string;
  }[];
}

// Sample call logs data
export const callLogs: CallLog[] = [
  {
    id: '1',
    caller: 'John Smith',
    recipient: 'Sales Department',
    date: '2025-04-28',
    time: '09:15 AM',
    duration: '5:23',
    type: 'incoming',
    status: 'completed'
  },
  {
    id: '2',
    caller: 'Emily Johnson',
    recipient: 'Support Team',
    date: '2025-04-28',
    time: '10:42 AM',
    duration: '3:17',
    type: 'incoming',
    status: 'completed'
  },
  {
    id: '3',
    caller: 'Sales Team',
    recipient: 'Michael Brown',
    date: '2025-04-27',
    time: '02:30 PM',
    duration: '8:45',
    type: 'outgoing',
    status: 'completed'
  },
  {
    id: '4',
    caller: 'Sarah Davis',
    recipient: 'Tech Support',
    date: '2025-04-27',
    time: '11:20 AM',
    duration: '0:00',
    type: 'incoming',
    status: 'missed'
  },
  {
    id: '5',
    caller: 'Customer Service',
    recipient: 'Robert Wilson',
    date: '2025-04-26',
    time: '04:15 PM',
    duration: '2:09',
    type: 'outgoing',
    status: 'completed'
  },
  {
    id: '6',
    caller: 'Alex Thompson',
    recipient: 'Billing Department',
    date: '2025-04-26',
    time: '01:30 PM',
    duration: '0:42',
    type: 'incoming',
    status: 'voicemail'
  }
];

// Sample transcription data
export const callTranscriptions: Record<string, CallTranscription> = {
  '1': {
    id: '1',
    text: "Hello, this is John Smith. I'm calling about the recent order I placed. I wanted to check on the status of my shipment. I was told it would arrive by yesterday, but I haven't received any tracking information yet.",
    segments: [
      { speaker: 'John Smith', text: 'Hello, this is John Smith. I\'m calling about the recent order I placed.', timestamp: '00:00' },
      { speaker: 'Sales Rep', text: 'Hi John, thank you for calling. Let me check that for you.', timestamp: '00:12' },
      { speaker: 'John Smith', text: 'I wanted to check on the status of my shipment. I was told it would arrive by yesterday.', timestamp: '00:18' },
      { speaker: 'Sales Rep', text: 'I see your order here. It looks like there was a slight delay in processing. Your order shipped this morning.', timestamp: '00:32' },
      { speaker: 'John Smith', text: 'Oh, I see. Do you have tracking information?', timestamp: '00:50' },
      { speaker: 'Sales Rep', text: 'Yes, I\'ll email that to you right away. You should receive delivery by tomorrow afternoon.', timestamp: '01:02' },
      { speaker: 'John Smith', text: 'Great, thank you for your help.', timestamp: '01:15' },
      { speaker: 'Sales Rep', text: 'Is there anything else I can assist you with today?', timestamp: '01:20' },
      { speaker: 'John Smith', text: 'No, that\'s all I needed. Have a good day.', timestamp: '01:25' },
      { speaker: 'Sales Rep', text: 'You too, thank you for calling.', timestamp: '01:30' }
    ]
  },
  '2': {
    id: '2',
    text: "Hi, this is Emily Johnson calling. I'm having trouble logging into my account on your website. I keep getting an error message saying 'invalid credentials' but I'm sure I'm using the right password.",
    segments: [
      { speaker: 'Emily Johnson', text: "Hi, this is Emily Johnson calling. I'm having trouble logging into my account on your website.", timestamp: '00:00' },
      { speaker: 'Support Rep', text: "Hello Emily, I'd be happy to help you with that login issue.", timestamp: '00:10' },
      { speaker: 'Emily Johnson', text: "I keep getting an error message saying 'invalid credentials' but I'm sure I'm using the right password.", timestamp: '00:17' },
      { speaker: 'Support Rep', text: "Let me check your account. Can I have your email address please?", timestamp: '00:30' },
      { speaker: 'Emily Johnson', text: "It's emily.johnson@example.com", timestamp: '00:35' },
      { speaker: 'Support Rep', text: "Thank you. I see the issue - your account has been temporarily locked due to multiple login attempts. I can reset that for you now.", timestamp: '00:45' },
      { speaker: 'Emily Johnson', text: "Oh, that explains it. Yes, please reset it.", timestamp: '01:10' },
      { speaker: 'Support Rep', text: "Done. You should receive an email with instructions to set a new password. Is there anything else you need help with?", timestamp: '01:20' },
      { speaker: 'Emily Johnson', text: "No, that's all. Thank you for your help!", timestamp: '01:50' }
    ]
  },
  '3': {
    id: '3',
    text: "Hello, this is the sales team calling for Michael Brown. We're following up on the proposal we sent last week and wanted to discuss any questions you might have.",
    segments: [
      { speaker: 'Sales Rep', text: "Hello, this is the sales team calling for Michael Brown. We're following up on the proposal we sent last week.", timestamp: '00:00' },
      { speaker: 'Michael Brown', text: "Hi there, yes I've been reviewing it. I had a few questions about the pricing structure.", timestamp: '00:12' },
      { speaker: 'Sales Rep', text: "I'd be happy to clarify that for you. Which aspects were you unclear about?", timestamp: '00:25' },
      { speaker: 'Michael Brown', text: "On page 5, you mention volume discounts but don't specify the thresholds. Can you elaborate on that?", timestamp: '00:32' },
      { speaker: 'Sales Rep', text: "Absolutely. The discounts start at 10% for orders over $5,000, 15% for orders over $10,000, and 20% for orders over $20,000.", timestamp: '00:48' },
      { speaker: 'Michael Brown', text: "That makes sense. And what about the implementation timeline? Is that flexible?", timestamp: '01:10' },
      { speaker: 'Sales Rep', text: "Yes, we can adjust the timeline based on your needs. The standard implementation takes 4 weeks, but we can expedite or extend as needed.", timestamp: '01:20' },
      { speaker: 'Michael Brown', text: "Great. Let me discuss this with my team and get back to you by Friday.", timestamp: '01:45' },
      { speaker: 'Sales Rep', text: "Sounds good. I'll send you an email with the discount details we discussed. Is there anything else you'd like to know?", timestamp: '01:55' },
      { speaker: 'Michael Brown', text: "That covers everything for now. Thanks for calling.", timestamp: '02:10' },
      { speaker: 'Sales Rep', text: "You're welcome. Looking forward to hearing from you on Friday.", timestamp: '02:15' }
    ]
  }
};

// Sample extracted info data
export const extractedInfos: Record<string, ExtractedInfo> = {
  '1': {
    id: '1',
    topics: ['Order Status', 'Shipping Delay', 'Tracking Information'],
    sentimentScore: 0.2,
    actionItems: [
      'Email tracking information to customer',
      'Update delivery status in system'
    ],
    keyEntities: [
      { name: 'Order', type: 'Object' },
      { name: 'Tracking Information', type: 'Data' }
    ]
  },
  '2': {
    id: '2',
    topics: ['Login Issues', 'Account Access', 'Password Reset'],
    sentimentScore: -0.3,
    actionItems: [
      'Reset password for customer',
      'Send email with reset instructions',
      'Check account security settings'
    ],
    keyEntities: [
      { name: 'Account', type: 'Object' },
      { name: 'emily.johnson@example.com', type: 'Email' }
    ]
  },
  '3': {
    id: '3',
    topics: ['Sales Proposal', 'Pricing Discussion', 'Volume Discounts', 'Implementation Timeline'],
    sentimentScore: 0.7,
    actionItems: [
      'Send email detailing discount thresholds',
      'Follow up on Friday',
      'Prepare implementation timeline options'
    ],
    keyEntities: [
      { name: 'Proposal', type: 'Document' },
      { name: '$5,000', type: 'Amount' },
      { name: '$10,000', type: 'Amount' },
      { name: '$20,000', type: 'Amount' },
      { name: 'Friday', type: 'Date' }
    ]
  }
};
