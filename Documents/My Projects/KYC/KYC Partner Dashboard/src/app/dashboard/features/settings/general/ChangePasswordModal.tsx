import PasswordInput from '@/components/input/PasswordInput';
import { Button, Divider, Flex, Stack } from '@chakra-ui/react';

export default function ChangePasswordModal({ onClose }) {
  return (
    <Stack spacing={'1.3rem'}>
      <PasswordInput
        inputProps={{
          name: 'password',
        }}
        formControlProps={{ isRequired: true, label: 'Current password' }}
      />
      <PasswordInput
        inputProps={{
          name: 'password',
        }}
        formControlProps={{ isRequired: true, label: 'New password' }}
      />
      <PasswordInput
        inputProps={{
          name: 'password',
        }}
        formControlProps={{ isRequired: true, label: 'Re-enter New password' }}
      />

      <Divider my={'1.2rem'} borderColor={'#EFF4FD'} />

      <Flex
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        mb={'2rem'}
      >
        <Button
          color={'#4F4F4F'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          variant={'outline'}
          minH={'2.5rem'}
          fontWeight={500}
          fontFamily={'heading'}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          minH={'2.5rem'}
          onClick={onClose}
          fontSize={'.9rem'}
          maxW={'6rem'}
        >
          Update
        </Button>
      </Flex>
    </Stack>
  );
}
