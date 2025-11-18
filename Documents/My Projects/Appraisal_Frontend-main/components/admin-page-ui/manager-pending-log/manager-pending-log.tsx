"use client";

import { useQuery } from "@tanstack/react-query";

import { datatableColumnManagerLog } from "@/components/datatable/datatableColumnManagerLog";
import { DataTableManager } from "@/components/datatable/data-tableManager";
import { useGetUserProfile } from "@/zustand/store";

import { useUser } from "@clerk/nextjs";

const ManagerPendingLog = () => {
  const { user } = useUser();
  const { profile, getUserData, isloading, page, role } = useGetUserProfile();

  const { data } = useQuery({
    queryKey: ["manager-logs"],
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

  //console.log(data);
  return (
    <div>
      {" "}
      <DataTableManager
        data={!data ? [] : data}
        columns={datatableColumnManagerLog}
      />{" "}
    </div>
  );
};

export default ManagerPendingLog;
