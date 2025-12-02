import {
  Box,
  Text,
  Button,
  Stack,
  Center,
  chakra,
  Flex,
} from '@chakra-ui/react';
import { Logo } from '@/components/Logo/Logo';
import { useForgetPasswordHook } from '../hooks/useForgotPassword';
import CustomInput from '@/components/input/CustomInput';
import { Link } from 'react-router-dom';

export function ForgetPassword() {
  const {
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleFormSubmit,
    isLoading,
  } = useForgetPasswordHook();

  return (
    <Center
      rounded={'6px'}
      flexDir={'column'}
      w={'33rem'}
      h={'22rem'}
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
          Forgot password
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
              placeholder: 'sample@example.com',
              value: values.email,
              onChange: handleChange,
              isInvalid: Boolean(errors.email && touched.email),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Email address' }}
          />
        </Stack>
        <Flex mt={'.7rem'} justifyContent={'end'} alignItems={'center'}>
          <Link to="/login">
            <Text
              color="blue.500"
              ml="auto"
              cursor="pointer"
              fontSize={'.8rem'}
            >
              Go back to Login
            </Text>
          </Link>
        </Flex>
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
