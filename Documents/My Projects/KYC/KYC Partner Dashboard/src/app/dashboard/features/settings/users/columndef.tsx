import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import RowActions from './RowActions';
import Status from '@/components/elements/status/Status';
import { formatDate } from '@/utils/date-formater';
import { IGetAllUsersResponse } from '@/app/dashboard/api/get-al-users';

const columnHelper = createColumnHelper<IGetAllUsersResponse>();

export const columnDef = [
  columnHelper.display({
    cell: (props: any) => {
      return (
        <Box>{`${props.row.original?.user?.firstName} ${props.row.original?.user?.lastName}`}</Box>
      );
    },
    header: 'Name',
    id: 'name',
  }),
  columnHelper.accessor('user.email', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Email',
    id: 'email',
  }),
  columnHelper.accessor('role.name', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Role',
    id: 'role',
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => <Box>{formatDate(info.getValue() as string)}</Box>,
    header: 'Date added',
    id: 'date-added',
  }),
  columnHelper.accessor('status', {
    cell: (info) => (
      <Status maxW={'10rem'} px={'1rem'} name={info.getValue() as string} />
    ),
    header: 'Status',
    id: 'status',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props) => <RowActions row={props.row} />,
  }),
];
