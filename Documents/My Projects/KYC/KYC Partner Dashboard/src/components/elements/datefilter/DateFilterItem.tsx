import React from 'react';
import { Center } from '@chakra-ui/react';

interface DateFilterItemProps {
  item: string;
  isActive: boolean;
  onClick: () => void;
}

export default function DateFilterItem({
  item,
  isActive,
  onClick,
}: DateFilterItemProps) {
  return (
    <Center
      fontSize=".8rem"
      cursor="pointer"
      h="2rem"
      px=".6rem"
      rounded="4px"
      fontWeight={isActive ? 500 : 400}
      border={isActive ? '1px solid #11406F' : '1px solid #DDDDDD'}
      color={isActive ? 'primary.500' : '#828282'}
      onClick={onClick}
      lineHeight="20px"
      fontFamily={'heading'}
      borderColor={isActive ? 'primary.500' : '#DDDDDD'}
    >
      {item}
    </Center>
  );
}
