import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { datesFilter } from '@/data/datefilter';
import { useGetAllWithdrawalApi } from '../api/get-withdrawal';
import { useGetPartnerProfileApi } from '../api/get-partner-profile';
import {
  GetWithdrawalFilter,
  IGetWithdrawalFilter,
} from '../store/withdrawal/get-withdrawal-filter';
import { useGetBankApi } from '../api/get-all-banks';
import { useUpsertBankApi } from '../api/upsert-bank';
import { useDisclosure } from '@chakra-ui/react';
import { useWithdrawFundApi } from '../api/withdraw-fund';
import { useToast } from '@/hooks/useToast';
import { useVerifyAccountNumberApi } from '../api/verify-account-number';
import { useAuth } from '@/app/auth/hooks/useAuth';

export const useGetAllWithdrawalHook = () => {
  type DatesFilterType = (typeof datesFilter)[number];
  const { data: GBPapi, refetch: GBPrefetch } = useGetPartnerProfileApi();
  const { data: BANKSapi, isLoading: BANKloading } = useGetBankApi();
  const { mutateAsync: Upsertapi, isLoading: Upsertloading } =
    useUpsertBankApi();
  const { mutateAsync: WFapi, isLoading: WFloading } = useWithdrawFundApi();
  const { mutateAsync: Verifyapi } = useVerifyAccountNumberApi();
  const { data: Withdrawapi, isLoading: Withdrawloading } =
    useGetAllWithdrawalApi();
  const [dateRange, setDateRange] = useState<DatesFilterType>({
    name: '30 days',
    value: 30,
  });
  const toast = useToast();
  const { permissionIsLoading, userHasPermission } = useAuth();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const isNumeric = (str: any) => {
    return /^\d+$/.test(str);
  };

  const [payload, setPayload] = useState({
    bankCode: '',
    accountNumber: '',
  });

  const [accountName, setAccountName] = useState('');

  const [amount, setAmount] = useState('');

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

  const [filter, setFilter] = useRecoilState(GetWithdrawalFilter);
  const resetFilter = useResetRecoilState(GetWithdrawalFilter);

  const [tempFilter, setTempFilter] = useState<Partial<IGetWithdrawalFilter>>({
    status: filter.status,
    customEndDate: filter.customEndDate,
    customStartDate: filter.customStartDate,
  });

  const statusOptions = [
    { label: 'Successful', value: 'successful' },
    { label: 'Pending', value: 'pending' },
  ];

  const applyFilter = () => {
    setFilter({ ...filter, ...tempFilter, page: 1 });
  };

  const clearFilter = () => {
    resetFilter();
    setTempFilter({
      status: filter.status,
      customEndDate: filter.customEndDate,
      customStartDate: filter.customStartDate,
    });
  };

  const handleUpdateAccount = async () => {
    if (isNumeric(payload.bankCode)) {
      await Upsertapi({
        ...payload,
        bankCode: Number(payload?.bankCode),
      });
      await GBPrefetch();
    }
  };

  const handleVerifyAccount = async () => {
    setAccountName('');
    if (isNumeric(payload.accountNumber)) {
      const res = await Verifyapi({
        ...payload,
        bankCode: payload?.bankCode,
      });
      return setAccountName(res?.data ? res?.data?.accountName : '');
    }
    return toast({
      status: 'error',
      description: 'Invalid Account number',
    });
  };

  const handleWithdrawFund = async () => {
    const isGreater = Boolean(
      Number(amount) > Number(GBPapi?.data?.wallet?.withdrawable)
    );
    if (isNumeric(amount)) {
      if (isGreater) {
        return toast({
          status: 'error',
          description: 'The Amount should not be greater than your balance',
        });
      }
      await WFapi({
        amount: Number(amount),
      });
      await GBPrefetch();
      onClose();
    }
  };

  const handlePayload = (e: any) => {
    setPayload((prev) => ({
      ...prev,
      accountNumber: e?.target?.value,
    }));
  };

  useEffect(() => {
    if (payload.accountNumber?.length === 10) {
      handleVerifyAccount();
    }
  }, [payload.accountNumber]);

  return {
    permissionIsLoading,
    userHasPermission,
    GBPapi,
    BANKSapi: BANKSapi?.data?.map((item) => ({
      label: item.name,
      value: item.code,
    })),
    Withdrawapi,
    pagination,
    setPagination,
    Withdrawloading,
    sorting,
    setSorting,
    dateRange,
    setDateRange,
    datesFilter,
    filter,
    setFilter,
    tempFilter,
    setTempFilter,
    applyFilter,
    statusOptions,
    clearFilter,
    setPayload,
    handlePayload,
    handleUpdateAccount,
    payload,
    meta: Withdrawapi?.data?.meta,
    isBankDetailsLoading: BANKloading,
    Upsertloading,
    WFloading,
    isOpen,
    onClose,
    onOpen,
    setAmount,
    amount,
    handleWithdrawFund,
    accountName,
  };
};
