"use client";

import { useQuery } from "@tanstack/react-query";

import { DatatableColumnFlow } from "@/components/datatable/datatableColumnFlow";
import { DataTableFlow } from "@/components/datatable/data-tableFlow";

const AdminFlowLog = () => {
  const { data } = useQuery({
    queryKey: ["dataFlow"],
    queryFn: async () => {
      try {
        return await fetch(`/api/get-flows`)
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      {" "}
      <DataTableFlow
        data={!data ? [] : data}
        columns={DatatableColumnFlow}
      />{" "}
    </div>
  );
};

export default AdminFlowLog;
