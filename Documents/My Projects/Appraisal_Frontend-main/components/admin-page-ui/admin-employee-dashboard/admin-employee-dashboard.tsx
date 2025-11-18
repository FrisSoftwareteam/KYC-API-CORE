"use client";
import React from "react";
import { DataTable } from "@/components/datatable/data-table";
import { useQuery } from "@tanstack/react-query";
import { datatableColumnUser } from "@/components/datatable/datatableColumnUsers";
import DataTable2 from "@/components/datatable/data-table copy";

const AdminEmployeeDashboard = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["employee"],
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

  return (
    <div className="p-3 mb-4">
      {" "}
      {/* <DataTable
        columns={datatableColumnUser}
        data={data}
        loading={isLoading}
      /> */}
      <DataTable2 />
    </div>
  );
};

export default AdminEmployeeDashboard;
