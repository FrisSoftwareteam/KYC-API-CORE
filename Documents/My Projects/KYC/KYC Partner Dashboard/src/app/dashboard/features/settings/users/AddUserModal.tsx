import { useInviteUserHook } from '@/app/dashboard/hooks/useInviteUserHook';
import { LogoLoader } from '@/components/elements/loader/Loader';
import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import {
  Stack,
  Flex,
  Divider,
  Button,
  Box,
  Text,
  Center,
} from '@chakra-ui/react';
import React from 'react';

export default function AddUserModal({ onClose }: any) {
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    submitform,
    isLoading,
    setFieldValue,
    GRloading,
    roleOptions,
    roles,
  } = useInviteUserHook({ onClose });

  if (GRloading) {
    return (
      <Center>
        <LogoLoader w={'10rem'} h={'30rem'} />
      </Center>
    );
  }
  return (
    <form onSubmit={submitform}>
      <Box mb={'1rem'}>
        <Stack>
          <CustomInput
            inputProps={{
              name: 'firstName',
              type: 'text',
              placeholder: 'Eketi',
              value: values.firstName,
              onChange: handleChange,
              isInvalid: Boolean(errors.firstName && touched.firstName),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'First name' }}
            errorMessage={errors.firstName}
            touched={touched.firstName}
          />
          <CustomInput
            inputProps={{
              name: 'lastName',
              type: 'text',
              placeholder: 'James',
              value: values.lastName,
              onChange: handleChange,
              isInvalid: Boolean(errors?.lastName && touched?.lastName),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Last name' }}
            errorMessage={errors?.lastName}
            touched={touched?.lastName}
          />
          <CustomInput
            inputProps={{
              name: 'email',
              type: 'email',
              placeholder: 'valerie@example.com',
              value: values?.email,
              onChange: handleChange,
              isInvalid: Boolean(errors?.email && touched?.email),
              onBlur: handleBlur,
            }}
            formControlProps={{
              isRequired: true,
              label: 'Email address',
            }}
            errorMessage={errors?.email}
            touched={touched?.email}
          />
          <CustomInput
            inputProps={{
              name: 'phoneNumber',
              type: 'text',
              placeholder: '08090908899',
              value: values?.phoneNumber,
              onChange: handleChange,
              isInvalid: Boolean(errors?.phoneNumber && touched?.phoneNumber),
              onBlur: handleBlur,
            }}
            formControlProps={{ isRequired: true, label: 'Phone number' }}
            errorMessage={errors?.phoneNumber}
            touched={touched?.phoneNumber}
          />
          <Box>
            <CustomSelect
              required={true}
              placeholder="Type  search..."
              options={roleOptions || []}
              onChange={(val) => {
                setFieldValue('role', val.value);
              }}
              label="Select role"
            />
          </Box>
        </Stack>
      </Box>

      <Stack spacing={'1.5rem'} mt={'1.5rem'}>
        {roles?.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          return (
            <Flex key={index} alignItems={'flex-start'}>
              <Text
                color={'#333333'}
                fontWeight={500}
                fontFamily={'heading'}
                fontSize={'.8rem'}
                minW={'8rem'}
              >
                {key}:
              </Text>
              <Text
                fontWeight={400}
                color={'#7C7C7C'}
                fontFamily={'heading'}
                fontSize={'.8rem'}
              >
                {value}
              </Text>
            </Flex>
          );
        })}
      </Stack>
      <Divider mt={'1rem'} borderColor={'#EFF4FD'} />
      <Flex
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        py={'2rem'}
      >
        <Button
          color={'#4F4F4F'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          variant={'outline'}
          minH={'2.5rem'}
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          type="submit"
        >
          Add user
        </Button>
      </Flex>
    </form>
  );
}
