import { Button, Divider, Flex, Text, chakra } from '@chakra-ui/react';
import React from 'react';

export default function RemoveModal({ onClose, row }: any) {
  return (
    <div onClick={onClose}>
      <Text fontFamily={'heading'} fontWeight={500}>
        <chakra.span fontStyle={'italic'} fontWeight={400}>
          {row?.original?.name}
        </chakra.span>{' '}
        will no longer be able to access your dashboard. Do you want to Proceed?
      </Text>
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
        >
          Cancel
        </Button>
        <Button
          onClick={() => onClose()}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'#D0021B'}
          _hover={{ bg: '#D0021B' }}
        >
          Remove user
        </Button>
      </Flex>
    </div>
  );
}
