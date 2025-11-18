"use client";
import React from "react";
import { DataTable } from "../datatable/data-table";
import { datatableColumn } from "../datatable/datatableColumn";
import { useQuery } from "@tanstack/react-query";

const Admindatatable = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["dataForm"],
    queryFn: async () => {
      try {
        return await fetch("/api/get-form")
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="p-4">
      {" "}
      <DataTable columns={datatableColumn} data={data} loading={isLoading} />
    </div>
  );
};

export default Admindatatable;
