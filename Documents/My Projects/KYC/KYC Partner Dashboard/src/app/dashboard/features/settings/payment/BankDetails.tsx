import { useGetAllWithdrawalHook } from '@/app/dashboard/hooks/useGetAllWithdrawalHook';
import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { Box, SimpleGrid, GridItem, Flex, Button } from '@chakra-ui/react';
import React from 'react';

type TBankDetatils = ReturnType<typeof useGetAllWithdrawalHook>;

export default function BankDetails({
  BANKSapi,
  setPayload,
  handlePayload,
  payload,
  Upsertloading,
  handleUpdateAccount,
  accountName,
}: TBankDetatils) {
  return (
    <Box
      px={'1.5rem'}
      pt={'1.3rem'}
      pb={'1rem'}
      minH={'10vh'}
      bg={'white'}
      rounded={'.4rem'}
      mb={'1rem'}
    >
      <SimpleGrid gap={'1.5rem'} row={2} columns={3}>
        <GridItem>
          <CustomSelect
            placeholder="Type  search..."
            options={BANKSapi || []}
            onChange={(val) => {
              setPayload((prev) => ({
                ...prev,
                bankCode: val.value,
              }));
            }}
            label="Bank Name"
          />
        </GridItem>
        <GridItem>
          <CustomInput
            inputProps={{
              name: 'number',
              type: 'text',
              placeholder: '0101020212',
              maxLength: 10,
              value: payload.accountNumber,
              onChange: handlePayload,
            }}
            formControlProps={{
              isRequired: true,
              label: 'Account number',
            }}
          />
        </GridItem>
        <GridItem>
          <CustomInput
            inputProps={{
              name: 'name',
              type: 'name',
              placeholder: 'John Doe',
              isReadOnly: true,
              value: accountName,
            }}
            formControlProps={{ isRequired: true, label: 'Account name' }}
          />
        </GridItem>
      </SimpleGrid>

      <Flex mt={'1rem'} justifyContent={'flex-end'}>
        <Button
          onClick={handleUpdateAccount}
          fontWeight={500}
          fontFamily={'heading'}
          isLoading={Upsertloading}
          // minH={'2.5rem'}
        >
          Update info
        </Button>
      </Flex>
    </Box>
  );
}
