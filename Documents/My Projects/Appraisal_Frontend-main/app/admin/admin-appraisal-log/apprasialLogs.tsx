"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Menu,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Users,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface AppraisalData {
  id: string;
  appraisee: string;
  appraiseeStatus: string;
  hodStatus: string;
  divisionalHeadStatus: string;
  groupHeadStatus: string;
  committeeStatus: string;
  score: number;
  reasons: string;
  date: string;
}

// const mockData: AppraisalData[] = [
//   {
//     id: "1",
//     appraisee: "FRIS",
//     appraiseeStatus: "SUBMITTED",
//     hodStatus: "SUBMITTED",
//     divisionalHeadStatus: "PENDING",
//     groupHeadStatus: "",
//     committeeStatus: "",
//     score: 50,
//     reasons: "Leadership Development Program",
//     date: "Jun 11, 2025",
//   },
//   {
//     id: "2",
//     appraisee: "FRIS",
//     appraiseeStatus: "SUBMITTED",
//     hodStatus: "SUBMITTED",
//     divisionalHeadStatus: "PENDING",
//     groupHeadStatus: "",
//     committeeStatus: "",
//     score: 50,
//     reasons: "",
//     date: "Jun 14, 2025",
//   },
//   {
//     id: "3",
//     appraisee: "FRIS",
//     appraiseeStatus: "SUBMITTED",
//     hodStatus: "SUBMITTED",
//     divisionalHeadStatus: "PENDING",
//     groupHeadStatus: "SUBMITTED",
//     committeeStatus: "",
//     score: 30,
//     reasons: "Promotion",
//     date: "Jun 11, 2025",
//   },
//   {
//     id: "4",
//     appraisee: "INFO Null",
//     appraiseeStatus: "SUBMITTED",
//     hodStatus: "SUBMITTED",
//     divisionalHeadStatus: "",
//     groupHeadStatus: "",
//     committeeStatus: "",
//     score: 110,
//     reasons: "",
//     date: "Jun 22, 2025",
//   },
// ];

const getStatusBadge = (status: string) => {
  if (!status) return null;

  const statusConfig = {
    SUBMITTED: {
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: "✓",
    },
    PENDING: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: "⏳",
    },
    APPROVED: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: "✓" },
    REJECTED: { color: "bg-red-100 text-red-800 border-red-200", icon: "✗" },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;

  return (
    <Badge variant="outline" className={cn("font-medium border", config.color)}>
      <span className="mr-1">{config.icon}</span>
      {status}
    </Badge>
  );
};

const getScoreBadge = (score: number) => {
  let colorClass = "";
  let icon = "";

  if (score >= 90) {
    colorClass = "bg-emerald-500 text-white";
    icon = "🏆";
  } else if (score >= 70) {
    colorClass = "bg-blue-500 text-white";
    icon = "⭐";
  } else if (score >= 50) {
    colorClass = "bg-amber-500 text-white";
    icon = "📈";
  } else {
    colorClass = "bg-red-500 text-white";
    icon = "📉";
  }

  return (
    <Badge className={cn("font-bold", colorClass)}>
      <span className="mr-1">{icon}</span>
      {score}
    </Badge>
  );
};

export default function AppraisalLogStatus() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");

  const { data: mockData, isLoading } = useQuery({
    queryKey: ["appraisal-logs"],
    queryFn: async () => {
      try {
        return await fetch("/api/get-admin-appraisal-log")
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(mockData.map((item: any) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const filteredData = mockData?.filter(
    (item: any) =>
      item?.appraisee?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.reasons?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}

      <div className="p-6">
        {/* Stats Cards */}

        {/* Main Table Card */}
        <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-t-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Appraisal Logs
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search appraisals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-slate-200 focus:border-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-blue-50 border-blue-200 bg-transparent"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-emerald-50 border-emerald-200 bg-transparent"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedRows.length === filteredData?.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Appraisee Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Appraisee Status
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      HOD Status
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Divisional Head
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Group Head
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Committee
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Score
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Reasons
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData?.map((item: any, index: any) => (
                    <TableRow
                      key={item.id}
                      className={cn(
                        "hover:bg-blue-50/50 transition-colors",
                        selectedRows?.includes(item.id) && "bg-blue-50/30"
                      )}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedRows?.includes(item.id)}
                          onCheckedChange={(checked) =>
                            handleSelectRow(item?.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium text-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {item?.appraisee_name?.charAt(0)}
                          </div>
                          {item?.appraisee_name}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(item?.user_status)}</TableCell>
                      <TableCell>{getStatusBadge(item?.hod_status)}</TableCell>
                      <TableCell>
                        {getStatusBadge(item.divisional_status)}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.group_status)}</TableCell>
                      <TableCell>
                        {getStatusBadge(item.appraisal_status)}
                      </TableCell>
                      <TableCell>{getScoreBadge(item.score)}</TableCell>
                      <TableCell>
                        {item?.reasons && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {item.reasons}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {item.statusDate}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Download className="h-4 w-4" />
                              Download Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Footer */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 bg-slate-50/50 border-t">
              <div className="text-sm text-slate-600">
                {selectedRows?.length} of {filteredData?.length} row(s) selected
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Rows per page:</span>
                  <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Page 1 of 1</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-transparent"
                      disabled
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-transparent"
                      disabled
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-transparent"
                      disabled
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-transparent"
                      disabled
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
