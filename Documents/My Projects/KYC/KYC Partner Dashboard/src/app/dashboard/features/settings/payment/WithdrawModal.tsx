import { useGetAllWithdrawalHook } from '@/app/dashboard/hooks/useGetAllWithdrawalHook';
import CustomInput from '@/components/input/CustomInput';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';

type TWithdrawModal = ReturnType<typeof useGetAllWithdrawalHook>;

export default function WithdrawModal({
  WFloading,
  amount,
  setAmount,
  handleWithdrawFund,
}: TWithdrawModal) {
  return (
    <Box>
      <Box mb={'1rem'}>
        <Stack>
          <CustomInput
            inputProps={{
              name: 'Amount',
              type: 'number',
              placeholder: '00.0',
              value: amount,
              onChange: (e) => setAmount(e?.target?.value),
            }}
            formControlProps={{ isRequired: true, label: 'Amount' }}
          />
        </Stack>
      </Box>

      <Flex
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        py={'2rem'}
      >
        <Button
          isLoading={WFloading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          type="submit"
          onClick={handleWithdrawFund}
        >
          Withdraw
        </Button>
      </Flex>
    </Box>
  );
}
