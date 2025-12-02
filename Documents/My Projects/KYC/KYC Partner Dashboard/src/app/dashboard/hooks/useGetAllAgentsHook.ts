import { useState } from 'react';
import { useGetAllAgentApi } from '../api/get-all-agent';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  GetAgentsFilter,
  IGetAgentsFilter,
} from '../store/agent/get-agents-filter';
import { datesFilter } from '@/data/datefilter';

export const useGetAllAgentsHook = () => {
  type DatesFilterType = (typeof datesFilter)[number];
  const [dateRange, setDateRange] = useState<DatesFilterType>({
    name: '30 days',
    value: 30,
  });

  const { data: GAAapi, isLoading: GAAloading } = useGetAllAgentApi();
  const [sorting, setSorting] = useState([
    {
      id: 'name',
      desc: true,
    },
  ]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useRecoilState(GetAgentsFilter);
  const resetFilter = useResetRecoilState(GetAgentsFilter);
  const [tempFilter, setTempFilter] = useState<Partial<IGetAgentsFilter>>({
    status: filter.status,
    search: filter.search,
    customEndDate: filter.customEndDate,
    customStartDate: filter.customStartDate,
    email: filter.email,
    state: filter.state,
  });

  const handleInputChange = (event) => {
    setTempFilter({ ...tempFilter, search: event.target.value });
  };
  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const applyFilter = () => {
    setFilter({ ...filter, ...tempFilter, page: 1 });
  };

  const clearFilter = () => {
    resetFilter();
    setTempFilter({
      status: filter.status,
      search: filter.search,
      customEndDate: filter.customEndDate,
      customStartDate: filter.customStartDate,
      email: filter.email,
      state: filter.state,
    });
  };
  return {
    GAAapi,
    pagination,
    setPagination,
    GAAloading,
    sorting,
    setSorting,
    dateRange,
    setDateRange,
    datesFilter,
    handleInputChange,
    filter,
    setFilter,
    tempFilter,
    setTempFilter,
    applyFilter,
    statusOptions,
    clearFilter,
    meta: GAAapi?.data.meta,
  };
};
