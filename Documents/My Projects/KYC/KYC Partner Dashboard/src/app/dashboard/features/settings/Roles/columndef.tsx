import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import { Iroles } from '@/shared/interface/roles';

const columnHelper = createColumnHelper<Iroles>();

export const columnDef = [
  columnHelper.accessor('name', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Role Name',
    id: 'role-name',
  }),
  columnHelper.accessor('users', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Number of Users',
    id: 'number-users',
  }),
  columnHelper.accessor('date', {
    cell: (info) => <Box>{info.getValue().toISOString()}</Box>,
    header: 'Last Modified',
    id: 'last-modified',
  }),
];
