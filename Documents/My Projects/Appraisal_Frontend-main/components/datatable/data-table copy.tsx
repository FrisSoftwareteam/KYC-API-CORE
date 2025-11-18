"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Edit2,
  Eye,
  Loader2,
  Save,
  ScanEyeIcon,
  Search,
  Trash2,
  Upload,
  View,
  X,
} from "lucide-react";
import Papa from "papaparse";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
//import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import ReadEmployee from "../admin-page-ui/admin-view-employee/admin-view-employee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import Link from "next/link";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EmployeeDetailsModal } from "../ReadEmployeeModel/ReadEmployeeModel";

interface DataItem {
  id: number;
  fullnames: string;
  staff_id: string;
  workflow?: string;
  workflow_id?: string;
  question_id?: string;
  workflow_title?: string;
  question_title?: string;
  EmailAddress: string;
  educational_qualification?: string;
  lastdatepromoted?: string;
  additional_qualification?: string;
  date_confirmed?: string;
  status?: string;
  role?: string;
  [key: string]: any;
}

type SortDirection = "asc" | "desc" | null;

interface SortConfig {
  key: string;
  direction: SortDirection;
}

type Employee = {
  id: number;
  staffId: string;
  fullnames: string;
  emailAddress: string;
  workflow: string;
  appraisal: string;
  role: string;
  status: string;
  avatar: string;
  department?: string;
  joinDate?: string;
  salary?: number;
};

export default function DataTable2() {
  // Data state
  const [data, setData] = useState<DataItem[]>([]);
  const [originalData, setOriginalData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Editing state
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<DataItem | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  // Search and filtering state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  // Sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "asc",
  });

  // CSV upload state
  const [csvUploadOpen, setCsvUploadOpen] = useState(false);
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const [uploadedData, setUploadedData] = useState<DataItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  // Delete all rows state and handler
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);

  const { data: dataUsers, isLoading } = useQuery({
    queryKey: ["employee2"],
    queryFn: async () => {
      try {
        return await fetch("/api/get-users")
          .then((res: any) => res.json())
          .then(async (data: any) => {
            // Load initial data

            // console.log(data.data);

            setTimeout(
              () => {
                setData(data?.data);
                setOriginalData(data?.data);

                setTotalRows(data?.data?.length);

                setLoading(false);
              },
              isLoading ? 500 : 2000
            );

            //console.log(data.data);

            return data?.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  //console.log(mockData);
  // Apply filters, search, and sorting to data
  const filteredData = useCallback(() => {
    let result = [...(originalData || [])];

    // Apply search
    if (searchTerm) {
      //console.log(searchTerm);
      result = result?.filter((item) => {
        console.log(item);

        return (
          item?.fullnames?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.EmailAddress?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply status filter
    if (statusFilter) {
      result = result?.filter((item) => item?.status === statusFilter);
    }

    // Apply role filter
    if (roleFilter) {
      result = result.filter((item) => item.role === roleFilter);
    }

    // Apply sorting
    if (sortConfig.direction) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setTotalRows(result.length);
    return result;
  }, [originalData, searchTerm, statusFilter, roleFilter, sortConfig]);

  // Get current page data
  const currentData = useCallback(() => {
    const filtered = filteredData();
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filtered.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Update table data when filters change
  useEffect(() => {
    setData(currentData());
  }, [currentData]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, roleFilter]);

  // Edit row handler
  const handleEditRow = (id: number) => {
    console.log(id);

    const rowToEdit = data?.find((item) => item?.id === id);
    if (rowToEdit) {
      setEditingRow(id);
      setEditedValues({ ...rowToEdit });
    }
  };

  // Save edited row
  const handleSaveRow = async () => {
    // console.log("Save the changes...");

    setbuttonLoading(true);

    setTimeout(() => {
      setbuttonLoading(true);
    }, 2000);

    if (editedValues) {
      // Update the data array
      const updatedData = originalData?.map((item) => {
        // if (item.id === editedValues.id) console.log();
        return item?.id === editedValues?.id ? editedValues : item;
      });

      await axios
        .patch(`/api/submit-userflow/${editedValues.id}`, {
          editedValues,
        })
        .then(async (res: any) => {}),
        await axios.post(`/api/save-users-details/`, editedValues);
      //axios.post(`/api/save-users-details/`, editedValues);
      setOriginalData(updatedData);
      setEditingRow(null);
      setEditedValues(null);

      // toast({
      //   title: "Row updated",
      //   description: `Successfully updated row with ID: ${editedValues.id}`,
      // });
    }
    setbuttonLoading(false);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedValues(null);
  };

  // Delete row handler
  const handleDeleteRow = (id: number) => {
    const updatedData = originalData?.filter((item) => item.id !== id);
    setOriginalData(updatedData);

    // toast({
    //   title: "Row deleted",
    //   description: `Successfully deleted row with ID: ${id}`,
    // });
  };

  const handleDeleteAllRows = () => {
    setOriginalData([]);
    setDeleteAllDialogOpen(false);

    // toast({
    //   title: "All data deleted",
    //   description: "Successfully deleted all rows",
    // });
  };

  // Handle form input changes during edit
  const handleEditChange = (field: string, value: string) => {
    // console.log("Handle changes...");
    if (editedValues) {
      setEditedValues({
        ...editedValues,
        [field]: value,
      });
    }
  };

  // Handle sort click
  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

  // CSV export handler
  const handleExportCSV = () => {
    const dataToExport = filteredData();
    const csv = Papa.unparse(dataToExport);

    // Create download link
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV template download handler
  const handleDownloadTemplate = () => {
    // Create template data with headers and one example row
    const templateData = [
      {
        id: 0, // Temporary ID, will be replaced
        staff_id: "",
        fullnames: "",
        date_of_birth: "",
        age: "",
        date_employed: "",
        yearofentry: "",
        grade: "",
        designate: "",
        category: "",
        department: "",
        educational_qualification: "",
        additional_qualification: "",
        date_confirmed: "",
        gender: "",
        lastdatepromoted: "",
        nextofkin: "",
        leavedays: "",
        genotype: "",
        blood: "",
        bank_num: "",
        bank_name: "",
        pfacustodian: "",
        pfa: "",
        pension_num: "",
        state: "",
        lga: "",
        religion: "",
        phone: "",
        town: "",
        address: "",
        EmailAddress: "",
        services: "",
        ranking: "",
      },
    ];

    const csv = Papa.unparse(templateData);

    // Create download link
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "csv_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV upload handlers
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCsvErrors([]);
    setUploadedData([]);

    let parsedData: DataItem[] = [];
    Papa.parse(file, {
      header: true,
      complete: (results: any) => {
        const errors: string[] = [];

        results.data.forEach((row: DataItem, index: number) => {
          // Validate each row - ID is no longer required
          if (!row.fullnames || !row.EmailAddress) {
            errors.push(`Row ${index + 1}: Missing required fields`);
            return;
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(row.EmailAddress)) {
            errors.push(`Row ${index + 1}: Invalid email format`);
            return;
          }

          // Validate status
          // if (!["active", "inactive", "pending"].includes(row.status)) {
          //   errors.push(
          //     `Row ${
          //       index + 1
          //     }: Status must be 'active', 'inactive', or 'pending'`
          //   );
          //   return;
          // }

          // Validate role
          // if (!["Admin", "User", "Editor"].includes(row.role)) {
          //   errors.push(
          //     `Row ${index + 1}: Role must be 'Admin', 'User', or 'Editor'`
          //   );
          //   return;
          // }

          // Add valid row to parsed data (without ID - will be generated later)
          parsedData.push({
            id: Math.round(2), // Temporary ID, will be replaced
            fullnames: row.fullnames,
            EmailAddress: row.EmailAddress.toLowerCase(),
            status: row?.status,
            workflow: row?.workflow,
            staff_id: row?.staff_id,
            workflow_id: row.workflow_id,
            workflow_title: row.workflow_title,
            question_title: row.question_title,
            question_id: row.question_id,
            educational_qualification: row.educational_qualification,
            additional_qualification: row?.additional_qualification,
            lastdatepromoted: row?.lastdatepromoted,
            date_confirmed: row.date_confirmed,
            role: row.role,
          });
        });

        setCsvErrors(errors);
        setUploadedData(parsedData);
        setCsvUploadOpen(true);
      },
    });

    // console.log(parsedData);
    // Reset file input
    event.target.value = "";
  };

  const confirmUpload = async () => {
    if (uploadedData.length > 0) {
      // Find the highest existing ID
      const highestId =
        originalData?.length > 0
          ? Math.max(...originalData?.map((item) => item.id))
          : 0;

      // Generate new IDs for uploaded data
      const dataWithIds = uploadedData.map((item, index) => ({
        ...item,
        id: highestId + index + 1,
      }));

      // Append uploaded data to existing data
      const newData = [...(originalData || []), ...dataWithIds];

      //Go Into the  Db
      console.log(dataWithIds);

      await axios.post("/api/upload-file", dataWithIds);
      setOriginalData(newData);
      setCsvUploadOpen(false);
      setCurrentPage(1);
      // toast({
      //   title: "Data imported",
      //   description: `Successfully added ${uploadedData.length} rows of data`,
      // });
    }
  };

  ///operations/get-flows
  const flows = useQuery({
    queryKey: ["flow2"],
    queryFn: async () => {
      try {
        return await fetch(`/api/get-workflows`)
          .then((res: any) => res.json())
          .then((data: any) => {
            return data.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const question = useQuery({
    queryKey: ["questionType"],
    queryFn: async () => {
      try {
        return await fetch(`/api/question-type`)
          .then((res: any) => res.json())
          .then((data: any) => {
            console.log(data.data);
            return data.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  // console.log(question);
  const openEmployeeModal = (employee: any) => {
    console.log(employee);
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  console.log(editedValues);

  return (
    <>
      <div className="p-2">
        {/* Toolbar */}
        <div className="flex flex-col gap-1 sm:flex-row justify-between items-start mb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search employees' fullnames / email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[500px] bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* <Select
              value={statusFilter || ""}
              onValueChange={(value) => setStatusFilter(value || null)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select> */}

            {/* <Select
              value={roleFilter || ""}
              onValueChange={(value) => setRoleFilter(value || null)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
              </SelectContent>
            </Select> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportCSV}>
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadTemplate}>
                  Download CSV Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" onClick={handleUploadClick}>
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />

            <Button
              variant="outline"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => setDeleteAllDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete All
            </Button>
          </div>
        </div>

        {/* Table */}

        <div className="rounded-md ">
          <Table className="border rounded-md">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead
                  className="w-[80px] cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  ID{" "}
                  {sortConfig.key === "id" &&
                    sortConfig.direction === "asc" &&
                    "↑"}
                  {sortConfig.key === "id" &&
                    sortConfig.direction === "desc" &&
                    "↓"}
                </TableHead>

                <TableHead
                  className="cursor-pointer "
                  onClick={() => handleSort("fullnames")}
                >
                  Staff ID{" "}
                  {sortConfig.key === "staff_id" &&
                    sortConfig.direction === "asc" &&
                    "↑"}
                  {sortConfig.key === "staff_id" &&
                    sortConfig.direction === "desc" &&
                    "↓"}
                </TableHead>
                <TableHead
                  className="cursor-pointer w-[350px]"
                  onClick={() => handleSort("fullnames")}
                >
                  Full Name{" "}
                  {sortConfig.key === "fullnames" &&
                    sortConfig.direction === "asc" &&
                    "↑"}
                  {sortConfig.key === "fullnames" &&
                    sortConfig.direction === "desc" &&
                    "↓"}
                </TableHead>
                <TableHead
                  className="cursor-pointer  w-[350px]"
                  onClick={() => handleSort("EmailAddress")}
                >
                  Email{" "}
                  {sortConfig.key === "EmailAddress" &&
                    sortConfig.direction === "asc" &&
                    "↑"}
                  {sortConfig.key === "EmailAddress" &&
                    sortConfig.direction === "desc" &&
                    "↓"}
                </TableHead>

                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("workflow_id")}
                >
                  Workflow{" "}
                  {sortConfig.key === "workflow_id" &&
                    sortConfig.direction === "asc" &&
                    "↑"}
                  {sortConfig.key === "workflow_id" &&
                    sortConfig.direction === "desc" &&
                    "↓"}
                </TableHead>

                <TableHead
                  className="cursor-pointer w-[260px]"
                  onClick={() => handleSort("question_id")}
                >
                  Appriasal Question(s){" "}
                  {sortConfig.key === "role" &&
                    sortConfig.direction === "asc" &&
                    "↑"}
                  {sortConfig.key === "role" &&
                    sortConfig.direction === "desc" &&
                    "↓"}
                </TableHead>

                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Roles{" "}
                  {sortConfig.key === "status" &&
                    sortConfig.direction === "asc" &&
                    "↑"}
                  {sortConfig.key === "status" &&
                    sortConfig.direction === "desc" &&
                    "↓"}
                </TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      <span className="ml-2">Loading data...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((row, index) => {
                  // console.log(row);

                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row?.id}</TableCell>

                      {/* Staff_id cell */}
                      <TableCell className="font-medium">
                        {row?.staff_id}
                      </TableCell>

                      {/* Name cell */}
                      <TableCell className="w-[350px] font-semibold text-gray-900">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-white shadow-md">
                            <AvatarImage
                              src={row.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback
                              className={`bg-gradient-to-r ${
                                index % 2 === 0
                                  ? "from-blue-400 to-purple-400"
                                  : "from-green-400 to-teal-400"
                              } text-white font-bold`}
                            >
                              {row.fullnames
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {row?.fullnames}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Email cell */}
                      <TableCell className="w-[350px]">
                        {" "}
                        {row?.EmailAddress}
                      </TableCell>

                      {/* Workflow  cell */}
                      <TableCell>
                        {editingRow === row?.id ? (
                          <Select
                            value={editedValues?.workflow_id || ""}
                            onValueChange={(value) =>
                              handleEditChange("workflow_id", value)
                            }
                          >
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select a workflow" />
                            </SelectTrigger>
                            <SelectContent>
                              {flows?.data?.map((flow: any) => (
                                <SelectItem
                                  value={flow?.flow_title}
                                  key={flow?.id}
                                >
                                  {flow?.flow_title?.toUpperCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row?.workflow_title
                        )}
                      </TableCell>

                      {/* Appraisal cell */}
                      <TableCell>
                        {editingRow === row.id ? (
                          <Select
                            value={editedValues?.question_id || ""}
                            onValueChange={(value) =>
                              handleEditChange("question_id", value)
                            }
                          >
                            <SelectTrigger className="w-[250px]">
                              <SelectValue placeholder="Select the Appraisal Question(s)" />
                            </SelectTrigger>
                            <SelectContent>
                              {question?.data?.map((questions: any) => (
                                <SelectItem
                                  value={questions?.form_title}
                                  key={questions?.id}
                                >
                                  {questions?.form_title?.toUpperCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row.question_title
                        )}
                      </TableCell>

                      <TableCell>
                        {editingRow === row.id ? (
                          <Select
                            value={editedValues?.role || ""}
                            onValueChange={(value) =>
                              handleEditChange("role", value)
                            }
                          >
                            <SelectTrigger className="w-[230px]">
                              <SelectValue placeholder="Select the role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="manager2">
                                Divisonal Head
                              </SelectItem>
                              <SelectItem value="manager3">
                                Group Head
                              </SelectItem>
                              <SelectItem value="admin">HR Admin</SelectItem>
                              <SelectItem value="manager4">
                                Appraisal Team
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : row.role === "manager" ? (
                          <Badge className="bg-yellow-500/70 text-black rounded-xl hover:bg-yellow-500/70">
                            {" "}
                            Manager
                          </Badge>
                        ) : row.role === "manager2" ? (
                          "Divisonal Head"
                        ) : row.role === "manager3" ? (
                          "Group Head"
                        ) : row.role === "admin" ? (
                          "HR Admin"
                        ) : row.role === "manager4" ? (
                          "Appraisal Team"
                        ) : (
                          "User"
                        )}
                      </TableCell>

                      {/* Actions cell */}
                      <TableCell className="text-right">
                        {editingRow === row.id ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={handleSaveRow}
                              variant="outline"
                            >
                              {buttonLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4 mr-1" />
                              )}
                              Save
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleCancelEdit}
                              variant="ghost"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => openEmployeeModal(row)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                                    title="Click to view employee details"
                                  >
                                    <Eye className="h-4 w-4 text-white" />
                                  </Button>
                                </TooltipTrigger>
                              </Tooltip>
                            </TooltipProvider>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditRow(row.id)}
                            >
                              <Edit2 className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteRow(row.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min(totalRows, 1 + (currentPage - 1) * rowsPerPage)}-
            {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} rows
          </div>

          <div className="flex items-center space-x-2">
            <Select
              value={String(rowsPerPage)}
              onValueChange={(value) => setRowsPerPage(Number(value))}
            >
              <SelectTrigger className="h-8 w-[80px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CSV Upload Dialog */}
      <Dialog open={csvUploadOpen} onOpenChange={setCsvUploadOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import CSV Data</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              IDs will be automatically generated. Need the correct format?{" "}
              <Button
                variant="link"
                className="h-auto p-0"
                onClick={() => {
                  setCsvUploadOpen(false);
                  handleDownloadTemplate();
                }}
              >
                Download a template
              </Button>
            </p>
          </DialogHeader>

          {csvErrors.length > 0 && (
            <div className="border border-red-300 bg-red-50 rounded-md p-4 mb-4">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                The following errors were found:
              </h3>
              <ul className="text-xs text-red-700 list-disc pl-5 space-y-1">
                {csvErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {uploadedData.length > 0 && (
            <div className="border rounded-md">
              <Table className="container w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Staff_ID</TableHead>
                    <TableHead>Fullname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Educational Qualification</TableHead>
                    <TableHead>Additional Qualification</TableHead>
                    <TableHead className="w-36">Last Date Promoted</TableHead>
                    <TableHead>
                      <TableHead>Date Confirmed</TableHead>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedData.slice(0, 5).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.staff_id}</TableCell>
                      <TableCell>{row?.fullnames}</TableCell>
                      <TableCell>{row.EmailAddress}</TableCell>
                      <TableCell>{row?.educational_qualification}</TableCell>
                      <TableCell>{row?.additional_qualification}</TableCell>
                      <TableCell>{row?.lastdatepromoted}</TableCell>
                      <TableCell>{row?.date_confirmed}</TableCell>
                    </TableRow>
                  ))}
                  {uploadedData.length > 5 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-sm text-muted-foreground"
                      >
                        + {uploadedData.length - 5} more rows
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setCsvUploadOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmUpload}
              disabled={uploadedData.length === 0 || csvErrors.length > 0}
            >
              Import {uploadedData.length} rows
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete All Confirmation Dialog */}
      <Dialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete All Data</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete all rows? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteAllDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAllRows}>
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast notifications */}
      <Toaster />
      <EmployeeDetailsModal
        employee={selectedEmployee}
        open={showEmployeeModal}
        onOpenChange={setShowEmployeeModal}
      />
    </>
  );
}
