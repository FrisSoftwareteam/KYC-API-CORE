"use client";

import { useQuery } from "@tanstack/react-query";

import { datatableColumnManagerLog } from "@/components/datatable/datatableColumnManagerLog";
import { DataTableManager } from "@/components/datatable/data-tableManager";

import { useUser } from "@clerk/nextjs";
import { datatableColumnManagerLog2 } from "@/components/datatable/datatableColumnManagerLog2";
import { datatableColumnManagerLog3 } from "@/components/datatable/datatableColumnManagerLog3";

const ManagerPendingLog3 = () => {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["manager-logs3"],
    queryFn: async () => {
      try {
        return await fetch(`/api/get-all-answered-group-head`)
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(data);
  return (
    <div>
      {" "}
      <DataTableManager
        data={!data ? [] : data}
        columns={datatableColumnManagerLog3}
      />{" "}
    </div>
  );
};

export default ManagerPendingLog3;
