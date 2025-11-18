"use client";
// import { DataTable } from "@/components/datatable/data-table";
import { DataTableReporting } from "@/components/datatable/data-tableReporting";
import { datatableColumnReporting } from "@/components/datatable/datatableColumnReporting";
// import { datatableColumnUser } from "@/components/datatable/datatableColumnUsers";
import { useQuery } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import React from "react";

const ReportingChain = () => {
  const { data = [] } = useQuery({
    queryKey: ["reporting"],
    queryFn: async () => {
      try {
        return await fetch("/api/get-reports")
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="p-2 m-3">
      <DataTableReporting columns={datatableColumnReporting} data={data} />
    </div>
  );
};

export default ReportingChain;
