"use client";

import { useQuery } from "@tanstack/react-query";

import { useUser } from "@clerk/nextjs";
import { DataTableUserResultLog } from "@/components/datatable/data-tableUserResultLog";
import { DatatableColumnUserResultLog } from "@/components/datatable/datatableColumnUserResultLog";
import { Loader2 } from "lucide-react";
import { DataTableUserResultLog2 } from "@/components/datatable/data-tableUserResultLog2";
import { DatatableColumnUserResultLog2 } from "@/components/datatable/datatableColumnUserResultLog2";

const UserResultLog2 = () => {
  const { user } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["dataResultLogs"],
    queryFn: async () => {
      try {
        return await fetch(`/api/get-all-answers`)
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // console.log(data);

  return (
    <div>
      {" "}
      {isLoading ? (
        <Loader2 className="h-10 w-10 flex item-center animate-spin" />
      ) : (
        <DataTableUserResultLog2 data={!data ? [] : data} columns={[]} />
      )}
    </div>
  );
};

export default UserResultLog2;
