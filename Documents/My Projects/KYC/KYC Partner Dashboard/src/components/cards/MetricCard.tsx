import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react';
import { HiOutlineArrowDown, HiOutlineArrowUp } from 'react-icons/hi2';

export default function MetricCard({
  icon,
  name,
  value,
  percentage,
  rate,
  iconColor,
  iconBg,
  isAgent = false,
}: any) {
  return (
    <Box
      p={'1.2rem'}
      bg={'#FFFFFF'}
      rounded={'.3rem'}
      border="1px solid #EFF4FD"
    >
      <Center
        mb={'1.5rem'}
        h={'2.3rem'}
        w={'2.3rem'}
        rounded={'100%'}
        bg={iconBg}
      >
        <Icon fontSize={'1.3rem'} color={iconColor} as={icon} />
      </Center>
      <Text
        color={'#828282'}
        fontSize={'.8rem'}
        fontWeight={500}
        fontFamily={'heading'}
        textTransform={'uppercase'}
        mb={isAgent ? '1rem' : '.3rem'}
      >
        {name}
      </Text>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text
          fontFamily={'heading'}
          color={'#4F4F4F'}
          fontSize={'1.4rem'}
          fontWeight={500}
        >
          {value}
        </Text>
        {rate && (
          <Flex
            fontSize={'1.2rem'}
            color={rate === 'increase' ? '#10B759' : '#FF3366'}
            alignItems={'center'}
          >
            <Text fontSize={'1.2rem'}>{percentage}</Text>
            {rate === 'increase' ? (
              <HiOutlineArrowUp />
            ) : (
              <HiOutlineArrowDown />
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
