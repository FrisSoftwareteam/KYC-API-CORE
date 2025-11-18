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

// Mock data for the table
// const mockData: DataItem[] = [
//   {
//     id: 1,
//     fullnames: "John Doe",
//     EmailAddress: "john@example.com",
//     status: "active",
//     staff_id: "",
//     role: "User",
//   },
//   {
//     id: 2,
//     fullnames: "Jane Smith",
//     EmailAddress: "jane@example.com",
//     staff_id: "",
//     status: "inactive",
//     role: "Admin",
//   },
//   {
//     id: 3,
//     fullnames: "Alice Johnson",
//     EmailAddress: "alice@example.com",
//     status: "pending",
//     staff_id: "",
//     role: "Editor",
//   },
// ];

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
  status?: string;
  role?: string;
  [key: string]: any;
}

type SortDirection = "asc" | "desc" | null;

interface SortConfig {
  key: string;
  direction: SortDirection;
}

export default function DataTable3() {
  // Data state
  const [data, setData] = useState<DataItem[]>([]);
  const [originalData, setOriginalData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  // setOriginalData(dataUsers);

  // useEffect(() => {
  //   // Simulate API call
  //   // setData(dataUsers || []);
  //   setTimeout(() => {
  //     //console.log(dataUsers);
  //     console.log(data);
  //     // setData(mockData);
  //     // setData();dat

  //     //setOriginalData(data);
  //     // setTotalRows(mockData.length);
  //     setLoading(false);
  //   }, 500);
  // }, []);

  //console.log(mockData);
  // Apply filters, search, and sorting to data
  const filteredData = useCallback(() => {
    let result = [...originalData];

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter);
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
    const rowToEdit = data.find((item) => item.id === id);
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
      const updatedData = originalData.map((item) => {
        // if (item.id === editedValues.id) console.log();
        return item.id === editedValues.id ? editedValues : item;
      });

      await axios
        .patch(`/api/submit-userflow/${editedValues.id}`, {
          editedValues,
        })
        .then(async (res: any) => console.log(res)),
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
    const updatedData = originalData.filter((item) => item.id !== id);
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
        fullnames: "",
        EmailAddress: "",
        // status: "",
        //  workflow: row.workflow,
        staff_id: "",
        //  workflow_id: row.workflow_id,
        // workflow_title: row.workflow_title,
        // question_title: row.question_title,
        // question_id: row.question_id,
        // role: row.role,
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

        results.data.forEach((row: any, index: number) => {
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
            id: 0, // Temporary ID, will be replaced
            fullnames: row.fullnames,
            EmailAddress: row.EmailAddress,
            status: row.status,
            workflow: row.workflow,
            staff_id: row.staff_id,
            workflow_id: row.workflow_id,
            workflow_title: row.workflow_title,
            question_title: row.question_title,
            question_id: row.question_id,
            role: row.role,
          });
        });

        setCsvErrors(errors);
        setUploadedData(parsedData);
        setCsvUploadOpen(true);
      },
    });

    console.log(parsedData);
    // Reset file input
    event.target.value = "";
  };

  const confirmUpload = async () => {
    if (uploadedData.length > 0) {
      // Find the highest existing ID
      const highestId =
        originalData.length > 0
          ? Math.max(...originalData.map((item) => item.id))
          : 0;

      // Generate new IDs for uploaded data
      const dataWithIds = uploadedData.map((item, index) => ({
        ...item,
        id: highestId + index + 1,
      }));

      // Append uploaded data to existing data
      const newData = [...originalData, ...dataWithIds];

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

  const flows = useQuery({
    queryKey: ["flow2"],
    queryFn: async () => {
      try {
        return await fetch(`http://localhost:3000/operations/get-flows`)
          .then((res: any) => res.json())
          .then((data: any) => data);
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

  return (
    <>
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-start">
          <div className="flex flex-1 items-center gap-2 w-full sm:w-auto">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[300px]"
            />
          </div>
        </div>

        {/* Table */}
        <Card>
          <div className="rounded-md h-auto">
            <Table className="rounded-md">
              <TableHeader>
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
                    className="cursor-pointer w-[150px]"
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
                    className="cursor-pointer"
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
                    className="cursor-pointer w-[150px]"
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
                  data?.map((row) => {
                    // console.log(row);

                    return (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row?.id}</TableCell>

                        {/* Staff_id cell */}
                        <TableCell className="font-medium">
                          {row?.staff_id}
                        </TableCell>

                        {/* Name cell */}
                        <TableCell className="w-[90px]">
                          {row?.fullnames}
                        </TableCell>

                        {/* Email cell */}
                        <TableCell>{row.EmailAddress}</TableCell>

                        {/* Workflow  cell */}
                        <TableCell>
                          {editingRow === row.id ? (
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
                                <SelectItem value="users">User</SelectItem>
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
                                    <div className="flex items-center gap-1">
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button
                                            asChild
                                            variant="outline"
                                            size={"icon"}
                                            className=""
                                          >
                                            <Link
                                              href={``}
                                              // variant="outline"
                                              //W size={"icon"}
                                              className=""
                                            >
                                              <ScanEyeIcon className="h-4 w-4 text-lime-400" />
                                            </Link>
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[890px] bg-muted/10 ">
                                          <DialogHeader></DialogHeader>
                                          <div>
                                            <div className=" items-center ">
                                              <ReadEmployee cn={row.id} />
                                            </div>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View the Document</p>
                                  </TooltipContent>
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
              Showing {Math.min(totalRows, 1 + (currentPage - 1) * rowsPerPage)}
              -{Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows}{" "}
              rows
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
                  className="h-8 w-8"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="sr-only">First page</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
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
                  className="h-8 w-8"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                  <span className="sr-only">Last page</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Staff_ID</TableHead>
                    <TableHead>Fullname</TableHead>
                    <TableHead>Email</TableHead>
                    {/* <TableHead>Role</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedData.slice(0, 5).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.staff_id}</TableCell>
                      <TableCell>{row.fullnames}</TableCell>
                      <TableCell>{row.EmailAddress}</TableCell>
                      {/* <TableCell>
                        <Badge
                          className={
                            row.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : row.status === "inactive"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {row.status}
                        </Badge>
                      </TableCell> */}
                      {/* <TableCell>{row.role}</TableCell> */}
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
    </>
  );
}
