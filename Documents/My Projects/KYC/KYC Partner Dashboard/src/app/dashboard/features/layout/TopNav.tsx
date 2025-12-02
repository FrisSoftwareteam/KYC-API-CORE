import { Box, Flex, Input } from '@chakra-ui/react';
import React from 'react';
import { PiUserCircle } from 'react-icons/pi';
import { MdOutlineSearch } from 'react-icons/md';
import Custompopover from '@/components/ui/CustomPopover';
import NotificationBar from './NotificationBar';
import { IoMdNotificationsOutline } from 'react-icons/io';
export default function TopNav() {
  const actionlist = [
    {
      isLink: true,
      name: 'Profile settings',
      color: '#4F4F4F',
      path: '/settings',
    },
    {
      name: 'Log out',
      color: '#D0021B',

      clickFn: () => {
        window.localStorage.clear();
        window.location.replace('/login');
      },
    },
  ];
  return (
    <Flex
      h={'5rem'}
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'white'}
      px={'2rem'}
    >
      <Box>
        <Flex
          borderRadius={'.3rem'}
          alignItems={'center'}
          px={'2rem'}
          h={{ base: '2.5rem' }}
          bg={'#F1F1F1'}
          w={'28rem'}
        >
          <MdOutlineSearch size={'1.3rem'} />
          <Input
            bg={'transparent'}
            border={'none'}
            boxShadow={'none'}
            _placeholder={{
              color: '#BFBFBF',
              fontSize: '14px',
            }}
            outline={'none'}
            _focus={{
              boxShadow: 'none',
            }}
            placeholder="Search here..."
            w={'20rem'}
            fontSize={{ base: '.8rem', md: '1rem' }}
          />
        </Flex>
      </Box>
      <Flex fontSize={'1.2rem'} gap={'.6rem'}>
        <NotificationBar>
          <Box>
            <IoMdNotificationsOutline cursor={'pointer'} />
          </Box>
        </NotificationBar>
        <Custompopover actionlist={actionlist}>
          <Box>
            <PiUserCircle width={'1rem'} cursor={'pointer'} />
          </Box>
        </Custompopover>
      </Flex>
    </Flex>
  );
}
