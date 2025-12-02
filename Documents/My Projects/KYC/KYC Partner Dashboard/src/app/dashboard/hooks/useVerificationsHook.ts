import { VerificationFilterState } from '@/app/dashboard/store/verifications/filter';
import { useRecoilState } from 'recoil';
import { useGetAllVerificationsApi } from '../api/get-all-verifications';
import React from 'react';
import { TabProps } from '../features/verifications/Tabs';
import { IAgentVerification } from '@/shared/interface/agent';
import { useGetPartnerMetricsApi } from '../api/get-partner-metrics';
import { useAuth } from '@/app/auth/hooks/useAuth';
// import { useGetAllVerificationsApi } from '../api/get-all-verifications';
// import { IVerification } from '@/shared/interface/verification';

export const useVerificationsHook = () => {
  const [filter, setFilter] = useRecoilState(VerificationFilterState);
  const { data, isLoading } = useGetAllVerificationsApi();
  const { data: GPMapi, isLoading: GPMloading } = useGetPartnerMetricsApi();
  const isPending = filter.status === 'accepted' || filter.status === 'created';
  const { permissionIsLoading, userHasPermission } = useAuth();

  const [sorting, setSorting] = React.useState([
    {
      id: 'name',
      desc: true,
    },
  ]);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const tabs: TabProps[] = [
    {
      label: 'Pending Verifications',
      isActive: isPending,
      onClick: () => setFilter({ ...filter, status: 'accepted', page: 1 }),
    },
    {
      label: 'Verifications in Progress',
      isActive: filter.status === 'inprogress',
      onClick: () => setFilter({ ...filter, status: 'inprogress', page: 1 }),
    },
    {
      label: 'Completed Verifications',
      isActive: filter.status === 'completed',
      onClick: () => setFilter({ ...filter, status: 'completed', page: 1 }),
    },
  ];
  const statusTabs = [
    {
      total: GPMapi?.data?.totalUnassignVerification,
      name: 'unassigned',
      onClick: () =>
        setFilter({
          ...filter,
          status: 'created',
          page: 1,
        }),
      isActive: filter.status === 'created',
    },
    {
      total: GPMapi?.data?.totalAssignedVerification,
      name: 'assigned',
      isActive: filter.status === 'accepted',

      onClick: () =>
        setFilter({
          ...filter,
          status: 'accepted',
          page: 1,
        }),
    },
  ];
  const arrayData: Array<Partial<IAgentVerification>> | undefined =
    data?.data?.addresses.map((item) => ({
      status: item?.status,
      _id: item?._id,
      date: item?.createdAt,
      name: `${item?.candidate?.firstName} ${item?.candidate?.lastName}`,
      agent: item.agent,
      candidate: item.candidate,
      createdAt: item.createdAt,
      category: item.category,
      isFlagged: item.isFlagged,
    }));

  return {
    filter,
    setFilter,
    userHasPermission,
    data,
    isLoading: isLoading || GPMloading || permissionIsLoading,
    arrayData,
    tabs,
    setPagination,
    pagination,
    statusTabs,
    sorting,
    setSorting,
    isPending,
  };
};
