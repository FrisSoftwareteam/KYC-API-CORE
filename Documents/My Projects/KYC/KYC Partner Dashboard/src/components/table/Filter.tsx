import { Flex, Input, InputProps, Text } from '@chakra-ui/react';
interface FilterProps {
  inputProps?: InputProps;
  name: string;
}
export default function Filter({ name, inputProps }: FilterProps) {
  return (
    <Flex
      py={'1.5rem'}
      px={'2rem'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Text fontFamily={'heading'} fontWeight={600} fontSize={'1.2rem'}>
        {name}
      </Text>
      <Flex>
        <Input {...inputProps} placeholder="Search" w={'20rem'} />
      </Flex>
    </Flex>
  );
}
