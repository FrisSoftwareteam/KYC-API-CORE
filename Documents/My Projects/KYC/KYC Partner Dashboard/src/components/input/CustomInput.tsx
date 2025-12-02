import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
  Text,
} from '@chakra-ui/react';

type CustomInputProps = {
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  inputProps?: InputProps;
  errorMessage?: string | undefined;
  warningMessage?: string | undefined;
  touched?: boolean | undefined;
};
export default function CustomInput(props: CustomInputProps) {
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
      <Input
        fontSize={'.8rem'}
        _placeholder={{ color: '#B6B6B6', fontSize: '.9rem' }}
        errorBorderColor="crimson"
        border={'1px solid #B6B6B6'}
        rounded={'.4rem'}
        {...props.inputProps}
      />
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
