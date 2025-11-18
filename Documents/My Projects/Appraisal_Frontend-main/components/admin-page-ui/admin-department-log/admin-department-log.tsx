"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";

import { datatableColumnDepart } from "@/components/datatable/datatableColumnDepartment";
import { DataTableDepartment } from "@/components/datatable/data-tableDepartment";

const AdminDepartmentLog = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["department-log"],
    queryFn: async () => {
      try {
        return await fetch("/api/get-department")
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="p-3 mb-4">
      {" "}
      <DataTableDepartment
        columns={datatableColumnDepart}
        data={data}
        loading={isLoading}
      />
    </div>
  );
};

export default AdminDepartmentLog;
