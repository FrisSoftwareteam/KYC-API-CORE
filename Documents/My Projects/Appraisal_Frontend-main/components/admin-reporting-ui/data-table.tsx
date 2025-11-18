"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GroupIcon as Organization,
  Search,
  GitBranchPlus,
  UserPlus,
  Users,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Combobox } from "./combobox";
import OptionListDialog from "./option-list-dialog";

interface DataTableProps {
  data: any[];
  headers: string[];
  emailField: string;
  onRowUpdate: (email: string, columnName: string, value: string) => void;
  onViewOrgChart: (email: string) => void;
  onViewHierarchicalChart: (email: string) => void;
  selectedEmail: string | null;
  showOrgChart: boolean;
  setShowOrgChart: (show: boolean) => void;
  showHierarchicalChart: boolean;
  setShowHierarchicalChart: (show: boolean) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
  isUpdatingDb: boolean;
  onEditNames: (email: string) => void;
  getAdditionalNames: (email: string) => string[];
  getAllOptions: (columnName: string) => string[];
  onCreateOption: (columnName: string, value: string) => void;
  onAddOptionsList?: (columnName: string, options: string[]) => void;
}

export default function DataTable({
  data,
  headers,
  emailField,
  onRowUpdate,
  onViewOrgChart,
  onViewHierarchicalChart,
  selectedEmail,
  showOrgChart,
  setShowOrgChart,
  showHierarchicalChart,
  setShowHierarchicalChart,
  searchTerm,
  onSearch,
  isUpdatingDb,
  onEditNames,
  getAdditionalNames,
  getAllOptions,
  onCreateOption,
  onAddOptionsList,
}: DataTableProps) {
  const [updatingCells, setUpdatingCells] = useState<Record<string, boolean>>(
    {}
  );
  const [showOptionListDialog, setShowOptionListDialog] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string>("");

  // Add a function to filter data based on search term
  const filteredData = data.filter((row) => {
    if (!searchTerm) return true;

    // Check if the search term matches the email or any additional names
    const emailMatch = headers.some((header) => {
      const value = row[header]?.toLowerCase() || "";
      return (
        header.toLowerCase().includes("email") &&
        value.includes(searchTerm.toLowerCase())
      );
    });

    // Check if the search term matches any additional names
    const additionalNamesMatch = row._additionalNames?.some((name: string) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return emailMatch || additionalNamesMatch;
  });

  const handleValueChange = (email: string, header: string, value: string) => {
    console.log(updatingCells);
    // Set this specific cell as updating
    const cellKey = `${email}-${header}`;
    setUpdatingCells((prev) => ({ ...prev, [cellKey]: true }));

    // Update the value
    onRowUpdate(email, header, value);
    console.log(email, header, value);

    // Clear the updating state after a delay
    setTimeout(() => {
      setUpdatingCells((prev) => ({ ...prev, [cellKey]: false }));
    }, 500);
  };

  const handleOpenOptionsList = (columnName: string) => {
    setActiveColumn(columnName);
    setShowOptionListDialog(true);
  };

  const handleAddOptionsList = (options: string[]) => {
    if (onAddOptionsList && activeColumn) {
      onAddOptionsList(activeColumn, options);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Filter by email or name..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredData.length} of {data.length} rows
            </div>
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead
                      key={header}
                      className={
                        header === emailField ? "font-bold bg-slate-50" : ""
                      }>
                      {header}
                      {header === emailField && " (Index)"}
                    </TableHead>
                  ))}
                  {/* <TableHead>Additional Names</TableHead> */}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => {
                  const email = row[emailField];
                  const additionalNames = getAdditionalNames(email);

                  return (
                    <TableRow
                      key={email}
                      className={email === selectedEmail ? "bg-blue-50" : ""}>
                      {headers.map((header) => {
                        const cellKey = `${email}-${header}`;
                        const isUpdating =
                          updatingCells[cellKey] || isUpdatingDb;
                        const options = getAllOptions(header);

                        return (
                          <TableCell
                            key={cellKey}
                            className={
                              header === emailField
                                ? "font-medium bg-slate-50"
                                : ""
                            }>
                            <div className="relative">
                              {header === emailField ? (
                                <div className="px-3 py-2 rounded-md border border-input bg-slate-50">
                                  {row[header] || ""}
                                </div>
                              ) : (
                                <>
                                  <Combobox
                                    options={options}
                                    value={(row[header] as string) || ""}
                                    onChange={(value) =>
                                      handleValueChange(email, header, value)
                                    }
                                    placeholder={`Select ${header}`}
                                    disabled={isUpdating}
                                    allowCreate={true}
                                    onCreateOption={(value) =>
                                      onCreateOption(header, value)
                                    }
                                    isUpdating={isUpdating}
                                    columnName={header}
                                    onAddOptionsList={() =>
                                      handleOpenOptionsList(header)
                                    }
                                  />

                                  {isUpdating && (
                                    <div className="absolute top-1 right-1">
                                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        );
                      })}

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewHierarchicalChart(email)}
                            className="flex items-center gap-2">
                            <GitBranchPlus className="h-4 w-4" />
                            Hierarchy
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <OptionListDialog
        isOpen={showOptionListDialog}
        onClose={() => setShowOptionListDialog(false)}
        columnName={activeColumn}
        onAddOptions={handleAddOptionsList}
      />
    </div>
  );
}
