import { Box, Text, Button, Stack, Center, chakra } from '@chakra-ui/react';
import CustomInput from '@/components/input/CustomInput';
import PasswordInput from '@/components/input/PasswordInput';
import { Logo } from '@/components/Logo/Logo';
import { useResetPasswordHook } from '../hooks/useResetPassword';

export function ResetPassword() {
  const {
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleFormSubmit,
    isLoading,
  } = useResetPasswordHook();

  return (
    <Center
      rounded={'6px'}
      flexDir={'column'}
      w={'33rem'}
      h={'36rem'}
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
          Reset password
        </Text>
      </Center>

      <chakra.form w="17rem" onSubmit={handleFormSubmit}>
        <Stack spacing={'1.1rem'}>
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
              isReadOnly: true,
            }}
            formControlProps={{ isRequired: true, label: 'Email address' }}
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
            Submit
          </Button>
        </Box>
      </chakra.form>
    </Center>
  );
}
