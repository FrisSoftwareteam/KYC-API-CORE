import { useAddAgentHook } from '@/app/dashboard/hooks/useAddAgent';
import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { stateOptions } from '@/data/options/state';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import React from 'react';

export default function AddAgentModal({ onClose }: any) {
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    submitform,
    isLoading,
    setFieldValue,
  } = useAddAgentHook({ onClose });

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
          <Box mt={'.3rem'}>
            <CustomSelect
              placeholder="Type  search..."
              options={stateOptions}
              onChange={(val) => {
                setFieldValue('state', val.value);
              }}
              label="State"
            />
          </Box>
        </Stack>
      </Box>

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
          Add agent
        </Button>
      </Flex>
    </form>
  );
}
