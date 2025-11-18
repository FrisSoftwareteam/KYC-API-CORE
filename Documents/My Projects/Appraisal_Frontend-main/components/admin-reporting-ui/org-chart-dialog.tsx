"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { HierarchicalOrgChart } from "./hierarchical-org-chart";

interface OrgChartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  selectedRow: number;
  headers: string[];
}

export default function OrgChartDialog({
  isOpen,
  onClose,
  data,
  selectedRow,
  headers,
}: OrgChartDialogProps) {
  const [mappings, setMappings] = useState<Record<string, string>>({
    email: "",
    supervisor: "",
    departmentHead: "",
    divisionalHead: "",
    appraisalCommittee: "",
  });

  // Try to auto-detect column mappings based on header names
  useEffect(() => {
    const autoMappings: Record<string, string> = {
      email: "",
      supervisor: "",
      departmentHead: "",
      divisionalHead: "",
      groupHead: "",
      appraisalCommittee: "",
    };

    headers.forEach((header) => {
      const headerLower = header.toLowerCase();
      if (headerLower.includes("email") || headerLower.includes("user")) {
        autoMappings.email = header;
      } else if (
        headerLower.includes("supervisor") ||
        headerLower.includes("manager")
      ) {
        autoMappings.supervisor = header;
      } else if (
        headerLower.includes("department") ||
        headerLower.includes("dept")
      ) {
        autoMappings.departmentHead = header;
      } else if (
        headerLower.includes("division") ||
        headerLower.includes("div")
      ) {
        autoMappings.divisionalHead = header;
      } else if (
        headerLower.includes("group") ||
        headerLower.includes("group_head")
      ) {
        autoMappings.groupHead = header;
      } else if (
        headerLower.includes("committee") ||
        headerLower.includes("appraisal")
      ) {
        autoMappings.appraisalCommittee = header;
      }
    });

    setMappings(autoMappings);
  }, [headers]);

  const handleMappingChange = (role: string, header: string) => {
    setMappings((prev) => ({
      ...prev,
      [role]: header,
    }));
  };

  const selectedRowData = data[selectedRow] || {};

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Organizational Reporting Structure</DialogTitle>
        </DialogHeader>

        {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div>
            <Label htmlFor="email-mapping">Email/User</Label>
            <Select
              value={mappings.email}
              onValueChange={(value) => handleMappingChange("email", value)}
            >
              <SelectTrigger id="email-mapping">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_applicable">Not applicable</SelectItem>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="supervisor-mapping">Supervisor</Label>
            <Select
              value={mappings.supervisor}
              onValueChange={(value) =>
                handleMappingChange("supervisor", value)
              }
            >
              <SelectTrigger id="supervisor-mapping">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_applicable">Not applicable</SelectItem>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="department-mapping">Department Head</Label>
            <Select
              value={mappings.departmentHead}
              onValueChange={(value) =>
                handleMappingChange("departmentHead", value)
              }
            >
              <SelectTrigger id="department-mapping">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_applicable">Not applicable</SelectItem>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="division-mapping">Divisional Head</Label>
            <Select
              value={mappings.divisionalHead}
              onValueChange={(value) =>
                handleMappingChange("divisionalHead", value)
              }
            >
              <SelectTrigger id="division-mapping">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_applicable">Not applicable</SelectItem>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="committee-mapping">Appraisal Committee</Label>
            <Select
              value={mappings.appraisalCommittee}
              onValueChange={(value) =>
                handleMappingChange("appraisalCommittee", value)
              }
            >
              <SelectTrigger id="committee-mapping">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_applicable">Not applicable</SelectItem>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div> */}

        <div className="border rounded-lg p-4 bg-slate-50">
          <HierarchicalOrgChart data={selectedRowData} mappings={mappings} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
