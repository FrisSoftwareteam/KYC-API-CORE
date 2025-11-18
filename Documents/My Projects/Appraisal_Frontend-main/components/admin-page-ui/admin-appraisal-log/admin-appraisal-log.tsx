import { DataTableAppraisal } from "@/components/datatable/data-tableAppraisal";
import { datatableColumnAppraisal } from "@/components/datatable/datatableColumnAppraisalColumn";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdminAppraisalLog = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["appraisal-logs"],
    queryFn: async () => {
      try {
        return await fetch("/api/get-admin-appraisal-log")
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <DataTableAppraisal
        columns={datatableColumnAppraisal}
        data={data}
        loading={isLoading}
      />
    </div>
  );
};

export default AdminAppraisalLog;
