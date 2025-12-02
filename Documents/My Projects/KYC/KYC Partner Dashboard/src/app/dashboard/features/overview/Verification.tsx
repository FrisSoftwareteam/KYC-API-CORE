import CustomTable from '@/components/table/CustomTable';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { assignedcolumnDef } from '../verifications/columndef';
import { useVerificationsHook } from '../../hooks/useVerificationsHook';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { Permissions } from '@/data/permission';

const Verification = () => {
  const [sorting, setSorting] = React.useState([
    {
      id: 'name',
      desc: true,
    },
  ]);

  const { isLoading, arrayData, userHasPermission } = useVerificationsHook();

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  if (isLoading) {
    return <LogoLoader h={'40rem'} w={'100%'} />;
  }

  return (
    <Box bg={'white'} mt={5}>
      <CustomTable
        sorting={sorting}
        pagination={pagination}
        setSorting={setSorting}
        setPagination={setPagination}
        columnDef={assignedcolumnDef(
          userHasPermission(Permissions.CAN_VIEW_AGENTS_TASK)
        )}
        data={arrayData}
        filter={{
          tableName: 'recent verifications',
        }}
      />
    </Box>
  );
};

export default Verification;
