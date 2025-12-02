import React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import { Text, useBreakpointValue } from '@chakra-ui/react';

interface CustomSelectProps extends SelectProps {
  options: Array<any>;
  value?: any;
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  selectedOption?: any;
  setSelectedOption?: any;
  defaultValue?: any;
  controlStyle?: any;
}

export default function CustomSelect({
  options,
  onChange,
  placeholder,
  isDisabled,
  label,
  selectedOption,
  defaultValue,
  controlStyle,
  ...rest
}: CustomSelectProps) {
  // const [selectedValue, setSelectedValue] = useState(value);
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const handleSelectChange = (selectedOption: any) => {
    // setSelectedValue(selectedOption);
    onChange(selectedOption); // Pass value to parent component
  };

  return (
    <div>
      {label && (
        <Text
          fontFamily={'body'}
          fontWeight={'500'}
          fontSize={'14px'}
          mb={{ base: '6px' }}
          color={'#828282'}
        >
          {label}
        </Text>
      )}
      <Select
        id="select-custom"
        value={selectedOption}
        defaultValue={defaultValue}
        onChange={handleSelectChange}
        options={options}
        placeholder={placeholder || 'Select an option'}
        isDisabled={isDisabled || false}
        styles={{
          control: (base) => ({
            ...base,
            width: '100%',
            height: `${isDesktop ? '2.5rem' : '2.5rem'}`,
            borderRadius: `${isDesktop ? '.4rem' : '.4rem'}`,
            fontSize: `${isDesktop ? '.8rem' : '.8rem'}`,
            border: '1px solid #B6B6B6',
            ...controlStyle,
          }),
          option: (provided) => ({
            ...provided,
            fontSize: `${isDesktop ? '.8rem' : '.8rem'}`, // Adjust font size of options
          }),
          singleValue: (provided) => ({
            ...provided,
            fontSize: `${isDesktop ? '.8rem' : '.8rem'}`, // Adjust font size of single value label
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: `${isDesktop ? '.8rem' : '.8rem'}`, // Adjust font size of placeholder
          }),
          multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ...rest.styles?.multiValueLabel,
          }),
        }}
        {...rest}
      />
    </div>
  );
}
