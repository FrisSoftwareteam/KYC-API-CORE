"use client";
import React from "react";
import { DataTable } from "@/components/datatable/data-table";
import { useQuery } from "@tanstack/react-query";
import { datatableColumnUser } from "@/components/datatable/datatableColumnUsers";
import DataTable2 from "@/components/datatable/data-table copy";
import DataTable3 from "@/components/datatable/data-table2";

const AdminEmployeeDashboard2 = () => {
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
    <div className="p-1 mb-4">
      {" "}
      {/* <DataTable
        columns={datatableColumnUser}
        data={data}
        loading={isLoading}
      /> */}
      <DataTable3 />
    </div>
  );
};

export default AdminEmployeeDashboard2;
