import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import { IWithdrawal } from '@/shared/interface/withdrawal';
import Status from '@/components/elements/status/Status';
import { formatDate } from '@/utils/date-formater';

const columnHelper = createColumnHelper<IWithdrawal>();

export const columnDef = [
  columnHelper.accessor('type', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Transaction Type',
    id: 'type',
  }),
  columnHelper.accessor('formattedAmount', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Amount',
    id: 'amount',
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => <Box>{formatDate(info.getValue() as string)}</Box>,
    header: 'Date',
    id: 'date',
  }),
  columnHelper.accessor('status', {
    cell: (info) => (
      <Status maxW={'10rem'} px={'1rem'} name={info.getValue() as string} />
    ),
    header: 'Last Modified',
    id: 'last-modified',
  }),
];
