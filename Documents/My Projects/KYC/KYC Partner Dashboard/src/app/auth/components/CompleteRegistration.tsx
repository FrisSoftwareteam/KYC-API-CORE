import CustomInput from '@/components/input/CustomInput';
import { Logo } from '@/components/Logo/Logo';
import { Box, Button, Center, Stack, Text, chakra } from '@chakra-ui/react';
import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import PasswordInput from '@/components/input/PasswordInput';
import { useCompleteRegistrationHook } from '../hooks/useCompleteRegistrationHook';

export function CompleteRegistration() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const {
    values,
    handleFormSubmit,
    errors,
    handleChange,
    touched,
    handleBlur,
    isLoading,
  } = useCompleteRegistrationHook();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Center
      rounded={'6px'}
      flexDir={'column'}
      w={'33rem'}
      h={'auto'}
      py={'2rem'}
      bg={'white'}
    >
      <Center flexDir={'column'} w="17rem">
        <Box mb={'1.8rem'}>
          <Logo w={'6rem'} />
        </Box>

        <Text
          mb={'2rem'}
          fontWeight={500}
          color={'#4F4F4F'}
          fontSize={'1.1rem'}
        >
          Complete Registration{' '}
        </Text>
      </Center>

      <chakra.form w="17rem" onSubmit={handleFormSubmit}>
        <Stack spacing={'1.1rem'}>
          <CustomInput
            errorMessage={errors.firstName}
            touched={touched.firstName}
            inputProps={{
              name: 'firstName',
              placeholder: 'John',
              value: values.firstName,
              onChange: handleChange,
              isInvalid: Boolean(errors.firstName && touched.firstName),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'First name' }}
          />
          <CustomInput
            errorMessage={errors.lastName}
            touched={touched.lastName}
            inputProps={{
              name: 'lastName',
              placeholder: 'Smith',
              value: values.lastName,
              onChange: handleChange,
              isInvalid: Boolean(errors.lastName && touched.lastName),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Last name' }}
          />
          <CustomInput
            errorMessage={errors.email}
            touched={touched.email}
            inputProps={{
              name: 'email',
              type: 'email',
              placeholder: 'valerie@example.com',
              value: values.email,
              onChange: handleChange,
              isInvalid: Boolean(errors.email && touched.email),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Email address' }}
          />

          <CustomInput
            errorMessage={errors.phoneNumber}
            touched={touched.phoneNumber}
            inputProps={{
              name: 'phoneNumber',
              placeholder: 'Smith',
              value: values.phoneNumber,
              onChange: handleChange,
              isInvalid: Boolean(errors.phoneNumber && touched.phoneNumber),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Phone number' }}
          />
          <PasswordInput
            errorMessage={errors.password}
            touched={touched.password}
            inputProps={{
              name: 'password',
              onChange: handleChange,
              value: values.password,
              isInvalid: Boolean(errors.password && touched.password),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Password' }}
          />
          <PasswordInput
            errorMessage={errors.confirmPassword}
            touched={touched.confirmPassword}
            inputProps={{
              name: 'confirmPassword',
              onChange: handleChange,
              value: values.confirmPassword,
              isInvalid: Boolean(
                errors.confirmPassword && touched.confirmPassword
              ),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Confirm password' }}
          />
        </Stack>

        <Box mt={'1rem'}>
          <Button
            isLoading={isLoading}
            maxW={'5rem'}
            fontWeight={500}
            display={'block'}
            ml={'auto'}
            type="submit"
          >
            Proceed
          </Button>
        </Box>
      </chakra.form>
    </Center>
  );
}
