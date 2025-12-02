import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  chakra,
  Stack,
  Text,
} from '@chakra-ui/react';
import PasswordInput from '@/components/input/PasswordInput';
import { useChangePasswordHook } from '@/app/dashboard/hooks/useChangePasswordHook';
export default function Password() {
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    submitform,
    isLoading,
  } = useChangePasswordHook();
  return (
    <Box
      pl={'1.5rem'}
      pt={'2.3rem'}
      minH={'80vh'}
      bg={'white'}
      rounded={'.4rem'}
    >
      <Text
        color={'#4F4F4F'}
        fontSize={'1.1rem'}
        fontWeight={500}
        fontFamily={'heading'}
      >
        Password
      </Text>
      <chakra.form onSubmit={submitform} maxW={'30rem'}>
        <Stack spacing={'1.3rem'}>
          <PasswordInput
            inputProps={{
              name: 'oldPassword',
              onChange: handleChange,
              value: values.oldPassword,
              isInvalid: Boolean(errors.oldPassword && touched.oldPassword),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Current password' }}
            errorMessage={errors.oldPassword}
            touched={touched.oldPassword}
          />
          <PasswordInput
            inputProps={{
              name: 'password',
              onChange: handleChange,
              value: values.password,
              isInvalid: Boolean(errors.password && touched.password),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'New password' }}
            errorMessage={errors.password}
            touched={touched.password}
          />
          <PasswordInput
            inputProps={{
              name: 'confirmPassword',
              onChange: handleChange,
              value: values.confirmPassword,
              isInvalid: Boolean(
                errors.confirmPassword && touched.confirmPassword
              ),
              onBlur: handleBlur,
            }}
            formControlProps={{
              isRequired: true,
              label: 'Re-enter New password',
            }}
            errorMessage={errors.confirmPassword}
            touched={touched.confirmPassword}
          />
        </Stack>
        <Divider mt={'3rem'} mb={'1.4rem'} borderColor={'#EFF4FD'} />
        <Flex
          gap={'1rem'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          mb={'2rem'}
          pr={'5rem'}
        >
          <Button
            minH={'2.5rem'}
            isLoading={isLoading}
            fontSize={'.9rem'}
            type="submit"
            minW={'8rem'}
          >
            Save changes{' '}
          </Button>
        </Flex>
      </chakra.form>
    </Box>
  );
}
