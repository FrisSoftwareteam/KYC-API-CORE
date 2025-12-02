import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Flex,
  useDisclosure,
  Text,
  Divider,
  Stack,
  Box,
  Spinner,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { GoDotFill } from 'react-icons/go';
import { useNotificationHook } from '../../hooks/useNotificationHook';
import { formatDate } from '@/utils/date-formater';

function NotItem({ isRead, title, text, date }: any) {
  return (
    <Flex alignItems={'flex-start'}>
      <Box pt={'.21rem'} minW={'1rem'}>
        <GoDotFill
          fontSize={'.5rem'}
          color={isRead ? 'transparent' : '#FF5805'}
        />
      </Box>
      <Stack spacing={'.5rem'}>
        <Text
          lineHeight={'14px'}
          fontWeight={isRead ? 500 : 700}
          fontSize={'.75rem'}
          fontFamily={'heading'}
          color={isRead ? '#4F4F4F' : '#333333'}
        >
          {title}
        </Text>
        <Text
          fontSize={'.75rem'}
          color={isRead ? '#828282' : '#4F4F4F'}
          fontWeight={400}
        >
          {text}
        </Text>
        <Text color={'#828282'} fontSize={'.75rem'}>
          {date}
        </Text>
      </Stack>
    </Flex>
  );
}

export default function NotificationBar({ children }: { children: ReactNode }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const px = '1.8rem';

  const { notifications, isLoading, error, handleMarkAllAsRead } =
    useNotificationHook();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Failed to load notifications.</Text>;

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
        w={'25rem'}
        mr={'2rem'}
        rounded={'.5rem'}
        border="none !important"
        outline={'none !important'}
        _focusVisible={{
          boxShadow:
            '0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A',
        }}
        boxShadow="0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A"
      >
        <PopoverArrow />
        <Flex
          pt={'1.8rem'}
          pb={'.8rem'}
          px={px}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text
            fontFamily={'heading'}
            fontSize={'1.5rem'}
            fontWeight={500}
            color={'#4F4F4F'}
          >
            Notifications
          </Text>
          <Text
            cursor={'pointer'}
            fontSize={'.8rem'}
            fontWeight={400}
            color={'#5B8BFF'}
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </Text>
        </Flex>
        <Divider borderColor={'#D9D9D9'} />
        <Stack
          py={'.8rem'}
          px={px}
          spacing={'.8rem'}
          maxH="30rem"
          overflowY="auto"
        >
          {notifications?.map((item) => (
            <Stack key={item._id} spacing={'.8rem'}>
              <NotItem
                isRead={item.isRead}
                title={item.title}
                text={item.text}
                date={formatDate(item.createdAt) || 'Unknown Date'}
              />
              <Divider borderColor={'#D9D9D9'} />
            </Stack>
          ))}
        </Stack>
      </PopoverContent>
    </Popover>
  );
}
