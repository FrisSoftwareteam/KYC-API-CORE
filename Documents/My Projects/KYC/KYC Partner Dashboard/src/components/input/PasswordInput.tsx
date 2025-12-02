import {
  Box,
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { GoEyeClosed, GoEye } from 'react-icons/go';

type PasswordInputProps = {
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  inputProps?: InputProps;
  errorMessage?: string | undefined;
  touched?: boolean | undefined;
};
export default function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl {...props.formControlProps}>
      <FormLabel
        requiredIndicator={<abbr title="required field"></abbr>}
        fontFamily={'body'}
        fontWeight={'500'}
        fontSize={'15px'}
        mb={{ base: '6px' }}
        color={'#828282'}
        {...props.formLabelProps}
      >
        {props.formControlProps?.label}
      </FormLabel>
      <InputGroup>
        <Input
          fontSize={'.8rem'}
          _placeholder={{ color: '#B6B6B6', fontSize: '.9rem' }}
          errorBorderColor="crimson"
          border={'1px solid #B6B6B6'}
          rounded={'.4rem'}
          pr="0rem"
          type={show ? 'text' : 'password'}
          placeholder="Enter password"
          {...props.inputProps}
        />
        <InputRightElement h={'100%'} width={{ base: '3rem', md: '4.5rem' }}>
          <Box cursor={'pointer'} onClick={handleClick}>
            {!show ? (
              <GoEye fontSize={'1.3rem'} color="828282" />
            ) : (
              <GoEyeClosed fontSize={'1.3rem'} color="828282" />
            )}
          </Box>
        </InputRightElement>
      </InputGroup>
      {props?.errorMessage && props?.touched && (
        <Text fontSize={'12px'} color={'red'}>
          {props.errorMessage}
        </Text>
      )}
    </FormControl>
  );
}
