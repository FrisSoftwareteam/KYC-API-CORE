"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Search,
  Edit,
  Save,
  X,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/pagination/pagination";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

// Mock data
const generateData = (count: number) => {
  const statuses = ["active", "pending", "archived", "inactive"];
  const types = ["personal", "business", "enterprise", "government"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    type: types[Math.floor(Math.random() * types.length)],
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(),
  }));
};

// Column definition
type Column = {
  id: string;
  label: string;
  sortable: boolean;
  filterable: boolean;
  renderCell: (
    row: any,
    isEditing: boolean,
    handleChange: (id: number, field: string, value: any) => void
  ) => React.ReactNode;
};

export default function DataTableEdit() {
  // Data state
  const [data, setData] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState(0);

  // Editing state
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<any>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting state
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtering state
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data: dataUser = [], isLoading } = useQuery({
    queryKey: ["appraisal-logs"],
    queryFn: async () => {
      try {
        return await fetch("/api/get-users")
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(dataUser);

  // Load initial data
  useEffect(() => {
    const mockData = generateData(100);
    setData(mockData);
    setTotalRows(mockData.length);
  }, []);

  // Column definitions
  const columns: Column[] = [
    {
      id: "id",
      label: "ID",
      sortable: true,
      filterable: false,
      renderCell: (row) => row.id,
    },
    {
      id: "fullnames",
      label: "Name",
      sortable: true,
      filterable: true,
      renderCell: (row, isEditing, handleChange) => <>{row.fullnames}</>,
    },
    {
      id: "EmailAddress",
      label: "Email",
      sortable: true,
      filterable: true,
      renderCell: (row, isEditing, handleChange) =>
        isEditing ? (
          <Input
            value={editedRow.email}
            onChange={(e) =>
              handleChange(row.id, "EmailAddress", e.target.value)
            }
          />
        ) : (
          row.EmailAddress
        ),
    },
    {
      id: "",
      label: "Appriasal",
      sortable: false,
      filterable: false,
      renderCell: (row, isEditing, handleChange) =>
        isEditing ? (
          <Select
            value={editedRow.status}
            onValueChange={(value) => handleChange(row.id, "status", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge
            variant={
              row.status === "active"
                ? "default"
                : row.status === "pending"
                ? "outline"
                : row.status === "archived"
                ? "secondary"
                : "destructive"
            }
          >
            {row.status}
          </Badge>
        ),
    },
    {
      id: "type",
      label: "Type",
      sortable: true,
      filterable: true,
      renderCell: (row, isEditing, handleChange) =>
        isEditing ? (
          <Select
            value={editedRow.type}
            onValueChange={(value) => handleChange(row.id, "type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="government">Government</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          row.type
        ),
    },
    {
      id: "actions",
      label: "Actions",
      sortable: false,
      filterable: false,
      renderCell: (row, isEditing) =>
        isEditing ? (
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => handleSaveRow(row.id)}
            >
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditRow(row.id)}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
        ),
    },
  ];

  // Handle edit row
  const handleEditRow = (id: number) => {
    const rowToEdit = data.find((row) => row.id === id);
    if (rowToEdit) {
      setEditingRowId(id);
      setEditedRow({ ...rowToEdit });
    }
  };

  // Handle save row
  const handleSaveRow = (id: number) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...editedRow } : row))
    );
    setEditingRowId(null);
    setEditedRow(null);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditedRow(null);
  };

  // Handle change in edited row
  const handleChange = (id: number, field: string, value: any) => {
    setEditedRow((prev: any) => ({ ...prev, [field]: value }));
  };

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle filter
  const handleFilter = (field: string, value: string) => {
    if (value === "all") {
      const newFilters = { ...filters };
      delete newFilters[field];
      setFilters(newFilters);
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number.parseInt(value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Filter, sort, and paginate data
  const processedData = useMemo(() => {
    // Apply filters
    let result = [...dataUser];

    // Apply search
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(lowercasedSearch)
        )
      );
    }

    // Apply column filters
    Object.entries(filters).forEach(([field, value]) => {
      result = result.filter(
        (row) => String(row[field]).toLowerCase() === value.toLowerCase()
      );
    });

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortDirection === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
          ? 1
          : -1;
      });
    }

    return result;
  }, [dataUser, searchTerm, filters, sortField, sortDirection]);

  // Get unique values for filters
  const getUniqueValues = (field: string) => {
    const values = new Set(data.map((row) => row[field]));
    return Array.from(values);
  };

  // Calculate pagination
  const totalFilteredRows = processedData.length;
  const totalPages = Math.ceil(totalFilteredRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalFilteredRows);
  const currentData = processedData.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning or end
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, maxVisiblePages - 1);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - maxVisiblePages + 2);
      }

      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push("ellipsis-start");
      }

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <Card className="w-full border-none">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Search and rows per page */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.id} className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {column.sortable ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 -ml-2 font-medium"
                            onClick={() => handleSort(column.id)}
                          >
                            {column.label}
                            <ArrowUpDown
                              className={`ml-1 h-4 w-4 ${
                                sortField === column.id
                                  ? "opacity-100"
                                  : "opacity-50"
                              }`}
                            />
                          </Button>
                        ) : (
                          column.label
                        )}

                        {column.filterable && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Filter className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem
                                onClick={() => handleFilter(column.id, "all")}
                              >
                                All
                              </DropdownMenuItem>
                              {getUniqueValues(column.id).map((value) => (
                                <DropdownMenuItem
                                  key={String(value)}
                                  onClick={() =>
                                    handleFilter(column.id, String(value))
                                  }
                                >
                                  {String(value)}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((row) => (
                    <TableRow
                      key={row.id}
                      className={row.id % 2 === 0 ? "bg-muted/50" : ""}
                    >
                      {columns.map((column) => (
                        <TableCell key={`${row.id}-${column.id}`}>
                          {column.renderCell(
                            row,
                            editingRowId === row.id,
                            handleChange
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-row grid-rows-1 sm:flex-row justify-between items-center gap-2">
            <div className="text-sm text-muted-foreground flex-row">
              {startIndex + 1}-{endIndex} of {totalFilteredRows} rows
              {totalFilteredRows !== totalRows &&
                ` (filtered from ${totalRows} total rows)`}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>

                {getPageNumbers().map((page, index) =>
                  page === "ellipsis-start" || page === "ellipsis-end" ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        className="cursor-pointer"
                        onClick={() => handlePageChange(Number(page))}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="flex ">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Rows per page:
                </span>
                <Select
                  value={rowsPerPage.toString()}
                  onValueChange={handleRowsPerPageChange}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
