import React, { useState } from 'react';
import { Search, ChevronLeft, Loader2 } from 'lucide-react';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCallLogs } from '@/hooks/useCallLogs';
import type { CallLog } from '@/types/supabase';
import { formatDate, formatTime, formatDuration, mapDirection, mapCallStatus } from '@/types/supabase';
import CallInsightPanel from '@/components/CallInsightPanel';

const ITEMS_PER_PAGE = 10;

const Index = () => {
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: callLogs, isLoading, error } = useCallLogs();

  // Pagination calculations
  const totalItems = callLogs?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLogs = callLogs?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreviousPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  
  const handleRowClick = (call: CallLog) => {
    setSelectedCall(call);
  };
  
  const handleClosePanel = () => {
    setSelectedCall(null);
  };

  const getStatusBadgeClass = (status: 'completed' | 'missed' | 'voicemail') => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'voicemail':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              <Badge variant="secondary">{callLogs?.length || 0}</Badge>
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

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Failed to load call logs. Please try again.
              </div>
            ) : (
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
                  {paginatedLogs?.map((log) => {
                    const callerName = log.extracted_info?.caller_name || log.from_number;
                    const displayDate = formatDate(log.start_timestamp);
                    const displayTime = formatTime(log.start_timestamp);
                    const displayDuration = formatDuration(log.start_timestamp, log.end_timestamp);
                    const displayType = mapDirection(log.direction);
                    const displayStatus = mapCallStatus(log.call_status);

                    return (
                      <TableRow 
                        key={log.id}
                        onClick={() => handleRowClick(log)}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{callerName}</TableCell>
                        <TableCell>{log.to_number}</TableCell>
                        <TableCell>{displayDate}</TableCell>
                        <TableCell>{displayTime}</TableCell>
                        <TableCell>{displayDuration}</TableCell>
                        <TableCell className="capitalize">{displayType}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={getStatusBadgeClass(displayStatus)}
                          >
                            {displayStatus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={handlePreviousPage}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={handleNextPage}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call Insight Panel */}
      <CallInsightPanel call={selectedCall} onClose={handleClosePanel} />
    </div>
  );
};

export default Index;
