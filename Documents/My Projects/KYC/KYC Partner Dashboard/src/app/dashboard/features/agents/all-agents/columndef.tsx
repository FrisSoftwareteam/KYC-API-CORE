import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import Status from '@/components/elements/status/Status';
import { IAgent } from '@/shared/interface/agent';
import { Link } from 'react-router-dom';
import RowActions from './RowActions';
import { formatDate } from '@/utils/date-formater';

const columnHelper = createColumnHelper<IAgent>();

export const columnDef = [
  columnHelper.display({
    cell: (props) => {
      const isOnline = props.row.original?.realtimeStatus;
      return (
        <Link to={'/agents/' + props.row.original?._id}>
          <Box pos={'relative'}>
            <Box textTransform={'capitalize'}>
              {`${props.row.original?.user?.firstName?.toLowerCase()} ${props.row.original?.user?.lastName?.toLowerCase()}`}
            </Box>
            <Box
              pos={'absolute'}
              boxSize={'.3rem'}
              bg={isOnline === 'online' ? 'green.300' : 'red.400'}
              rounded={'100rem'}
              left={'-.4rem'}
              top={'.3rem'}
            ></Box>
          </Box>
        </Link>
      );
    },
    header: 'Agent name',
    id: 'agent-name',
  }),
  columnHelper.accessor('user.email', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Email address',
    id: 'email',
  }),
  columnHelper.display({
    cell: (props) => {
      return (
        <Box>{`${props.row.original?.user?.phoneNumber.countryCode} ${props.row.original?.user?.phoneNumber.number}`}</Box>
      );
    },
    header: 'Phone number',
    id: 'phone-number',
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
