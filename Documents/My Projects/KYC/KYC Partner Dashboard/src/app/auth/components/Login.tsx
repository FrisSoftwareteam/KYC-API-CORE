import { Logo } from '@/components/Logo/Logo';
import CustomInput from '@/components/input/CustomInput';
import PasswordInput from '@/components/input/PasswordInput';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Stack,
  Text,
  chakra,
  Flex,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useLoginHook } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

export function Login() {
  const {
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleFormSubmit,
    isLoading,
  } = useLoginHook();
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
          Welcome back
        </Text>
        <Center
          rounded={'4px'}
          py={'.5rem'}
          gap={'1rem'}
          border="1px solid #56575829"
          w={'100%'}
          cursor={'pointer'}
        >
          <FcGoogle fontSize={'1.2rem'} />
          <Text color={'#4F4F4F'} fontWeight={500}>
            Login with Google
          </Text>
        </Center>

        <Center mb={'.5rem'} gap={'.5rem'} w={'100%'} py={'1rem'}>
          <Box bg={'#D4D4D4'} h={'1px'} w={'100%'}></Box>
          <Text color={'#B6B6B6'} fontFamily={'heading'} fontWeight={500}>
            OR
          </Text>
          <Box bg={'#D4D4D4'} h={'1px'} w={'100%'}></Box>
        </Center>
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

        <Flex
          mt={'.7rem'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Checkbox size={{ base: 'sm', md: 'sm' }} colorScheme="primary">
            Keep me logged in
          </Checkbox>
          <Link to="/forgot-password">
            <Text
              color="blue.500"
              ml="auto"
              cursor="pointer"
              fontSize={'.8rem'}
            >
              Forgot Password?
            </Text>
          </Link>
        </Flex>

        <Box mt={'1rem'}>
          <Button
            isLoading={isLoading}
            minW={'100%'}
            maxW={'100%'}
            fontWeight={500}
            display={'block'}
            ml={'auto'}
            type="submit"
            minH={'2.4rem'}
          >
            Login
          </Button>
        </Box>
      </chakra.form>
    </Center>
  );
}
