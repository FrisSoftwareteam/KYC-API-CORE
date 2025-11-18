"use client";

import { useQuery } from "@tanstack/react-query";

import { datatableColumnManagerLog } from "@/components/datatable/datatableColumnManagerLog";
import { DataTableManager } from "@/components/datatable/data-tableManager";

import { useUser } from "@clerk/nextjs";
import { datatableColumnManagerLog2 } from "@/components/datatable/datatableColumnManagerLog2";
import { useGetUserProfile } from "@/zustand/store";

const ManagerPendingLog2 = () => {
  const { profile, getUserData, isloading, page, role } = useGetUserProfile();
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["manager-logs2"],
    queryFn: async () => {
      try {
        return await fetch(`/api/manager-pending/${profile?.email}`)
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
        columns={datatableColumnManagerLog2}
      />{" "}
    </div>
  );
};

export default ManagerPendingLog2;
