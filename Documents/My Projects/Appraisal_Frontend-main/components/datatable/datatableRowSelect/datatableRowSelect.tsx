"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@mantine/core";

import { useSwitchMode } from "@/zustand/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const DatatableRowSelect = ({ role, id }: any) => {
  const { isSwitch, switchState } = useSwitchMode();
  const [tableData, setTableData] = useState(role);
  //   const [shows, setShow] = useState(show);

  const { mutate } = useMutation({
    mutationFn: (newFlow) =>
      axios
        .post(`/api/update-roles/${id}`, {
          newFlow,
        })
        .then(() => {}),
  });

  const updateStatus = (newStatus: any) => {
    toast("Roles Updated !");
    mutate(newStatus);
    setTableData(newStatus);
    switchState(false);
  };
  return (
    <div>
      {!isSwitch ? (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            <Badge
              color={
                tableData === "admin"
                  ? "lime"
                  : tableData === "user"
                  ? "blue"
                  : tableData === "manager"
                  ? "dark"
                  : tableData === "appraisal"
                  ? "orange"
                  : "gray"
              }
            >
              {tableData}
            </Badge>
          </span>
        </div>
      ) : (
        <>
          <Select
            value={tableData}
            onValueChange={(value: any) => updateStatus(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="appraisal">Appraisal Team</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
};

export default DatatableRowSelect;
