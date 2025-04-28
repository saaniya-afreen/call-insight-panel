
import React from 'react';
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
import { callLogs } from '@/data/callData';

const Index = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Vibtree</h1>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100">
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100">
            <span className="text-sm font-medium">Goals</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100">
            <span className="text-sm font-medium">Approvals</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100">
            <span className="text-sm font-medium">Tasks</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100">
            <span className="text-sm font-medium">Discussions</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100">
            <span className="text-sm font-medium">Tickets</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded">
            <span className="text-sm font-medium">Accounts</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Accounts</h1>
              <Badge variant="secondary">2051</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search accounts..."
                className="pl-10 pr-4 py-2 border rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border">
            <div className="flex gap-4 p-4 border-b">
              <Button variant="secondary" className="bg-gray-100">Users</Button>
              <Button variant="ghost">Partners</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>Workspace Name</TableHead>
                  <TableHead>Email ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {callLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.caller}</TableCell>
                    <TableCell>{log.recipient}</TableCell>
                    <TableCell>{log.type}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Starter
                      </Badge>
                    </TableCell>
                    <TableCell>0/20</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        ⋮
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
