import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import Status from '@/components/elements/status/Status';
import { IAgentVerification } from '@/shared/interface/agent';
import { formatNumber } from '@/utils/add-comma';
import { formatDate } from '@/utils/date-formater';

const columnHelper = createColumnHelper<IAgentVerification>();

export const columnDef = [
  columnHelper.display({
    cell: (props) => {
      return (
        <Box>{`${props.row.original?.candidate?.firstName}
         ${props.row.original?.candidate?.lastName}`}</Box>
      );
    },
    header: `Candidate's name`,
    id: 'candidate-name',
  }),
  columnHelper.accessor('category', {
    cell: (info) => (
      <Box textTransform={'capitalize'}>{info.getValue().toLowerCase()}</Box>
    ),
    header: 'Verification Type',
    id: 'verification-type',
  }),
  columnHelper.accessor('cost', {
    cell: (info) => <Box>₦{formatNumber(info.getValue())}</Box>,
    header: 'Price',
    id: 'price',
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => (
      <Box>{formatDate(info.row.original?.timelines?.acceptedAt)}</Box>
    ),
    header: 'Date assigned',
    id: 'date-assigned',
  }),
  columnHelper.accessor('status', {
    cell: (info) => <Status name={info.getValue()} />,
    header: 'Status',
    id: 'status',
  }),
];
