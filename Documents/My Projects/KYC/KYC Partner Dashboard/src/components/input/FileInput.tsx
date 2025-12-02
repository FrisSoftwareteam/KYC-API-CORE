import {
  FormControlProps,
  FormLabelProps,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { SlCloudUpload } from 'react-icons/sl';
type CustomIFilenputProps = {
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  inputProps?: InputProps;
  errorMessage?: string | undefined;
  warningMessage?: string | undefined;
  accept?: string | undefined;
  touched?: boolean | undefined;
};
export default function FileInput(props: CustomIFilenputProps) {
  const inputRef = useRef<any>(null);
  const [fileName, setFileName] = useState('');

  const onChange = (e) => {
    setFileName(e.target.files[0]?.name);
  };

  return (
    <FormControl {...props.formControlProps}>
      <FormLabel
        requiredIndicator={<abbr title="required field"></abbr>}
        fontFamily={'body'}
        fontWeight={'500'}
        fontSize={'14px'}
        mb={{ base: '6px' }}
        color={'#828282'}
        {...props.formLabelProps}
      >
        {props.formControlProps?.label}
      </FormLabel>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={SlCloudUpload} />}
        />
        <input
          type="file"
          accept={'*'}
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={onChange}
        ></input>

        <Input
          fontSize={'.8rem'}
          _placeholder={{ color: '#B6B6B6', fontSize: '.9rem' }}
          errorBorderColor="crimson"
          border={'1px solid #B6B6B6'}
          rounded={'.4rem'}
          cursor={'pointer'}
          value={fileName}
          onClick={() => inputRef.current.click()}
          {...props.inputProps}
        />
      </InputGroup>

      {props?.errorMessage && props?.touched && (
        <Text fontSize={'12px'} color={'red'}>
          {props.errorMessage}
        </Text>
      )}
      {props?.warningMessage && (
        <Text fontSize={'12px'} color={'primary.800'}>
          {props.warningMessage}
        </Text>
      )}
    </FormControl>
  );
}
