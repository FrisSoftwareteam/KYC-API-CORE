'use client';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Flex,
  useDisclosure,
  Text,
  Icon,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Custompopover({
  children,
  actionlist,
}: {
  children: ReactNode;
  actionlist: any;
}) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        w={'15rem'}
        mr={'2rem'}
        rounded={'.5rem'}
        border="none !important"
        outline={'none !important'}
        _focusVisible={{
          boxShadow:
            '0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A', // Apply the specified box shadows
        }}
        boxShadow="0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A" // Apply the specified box shadows
      >
        <PopoverArrow />
        {actionlist.map((item: any, index: number) => {
          if (item.isLink) {
            return (
              <Link
                key={item.name}
                style={{ textDecoration: 'none' }}
                to={item.path}
              >
                <Flex
                  fontSize={'.81rem'}
                  alignItems={'center'}
                  gap={'.6rem'}
                  p={'.9rem'}
                  color={item.color}
                  _hover={{
                    bg: '#3855B30A',
                  }}
                  borderBottom={
                    index < actionlist.length ? '1px solid #EAEAEA' : 'none'
                  }
                >
                  {item?.icon && <Icon as={item.icon} />}
                  <Text fontSize={'.81rem'} fontFamily={'heading'}>
                    {item.name}
                  </Text>
                </Flex>
              </Link>
            );
          } else {
            return (
              <Flex
                key={item.name}
                cursor={'pointer'}
                alignItems={'center'}
                gap={'.6rem'}
                p={'.9rem'}
                py={'.7rem'}
                onClick={item.clickFn}
                color={item.color}
                _hover={{
                  bg: '#3855B30A',
                }}
                borderBottom={
                  index < actionlist.length ? '1px solid #EAEAEA' : 'none'
                }
              >
                {item?.icon && <Icon as={item.icon} />}
                <Text fontSize={'.81rem'}>{item.name}</Text>
              </Flex>
            );
          }
        })}
      </PopoverContent>
    </Popover>
  );
}
