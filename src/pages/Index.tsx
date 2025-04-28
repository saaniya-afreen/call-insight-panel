
import React, { useState } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { CallLog, callLogs } from '@/data/callData';
import CallInsightPanel from '@/components/CallInsightPanel';

const Index = () => {
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  
  const handleRowClick = (call: CallLog) => {
    setSelectedCall(call);
  };
  
  const handleClosePanel = () => {
    setSelectedCall(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="h-5 w-5" />
          <h1 className="text-xl font-semibold">MPA Call Logs</h1>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded">
            <span className="text-sm font-medium">Call Logs</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Call Logs</h1>
              <Badge variant="secondary">2051</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs..."
                className="pl-10 pr-4 py-2 border rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border">
            <div className="flex gap-4 p-4 border-b">
              <Button variant="secondary" className="bg-gray-100">All Calls</Button>
              <Button variant="ghost">Recent</Button>
              <Button variant="ghost">Missed</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Caller</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {callLogs.map((log) => (
                  <TableRow 
                    key={log.id}
                    onClick={() => handleRowClick(log)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{log.caller}</TableCell>
                    <TableCell>{log.recipient}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.time}</TableCell>
                    <TableCell>{log.duration}</TableCell>
                    <TableCell>{log.type}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={
                          log.status === 'completed' ? "bg-green-100 text-green-800" : 
                          log.status === 'missed' ? "bg-red-100 text-red-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Call Insight Panel */}
      <CallInsightPanel call={selectedCall} onClose={handleClosePanel} />
    </div>
  );
};

export default Index;
