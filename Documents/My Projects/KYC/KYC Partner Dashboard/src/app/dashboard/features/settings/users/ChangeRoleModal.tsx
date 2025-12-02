import CustomSelect from '@/components/input/CustomSelect';
import { roleOptions } from '@/data/options/role';
import { Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

export default function ChangeRoleModal({ onClose }: any) {
  const roles = {
    Administrator: `Role description... pretium lacinia vitae ut urna.
     Maecenas ac porta odio, quis facilisis lacus. Nunc porta, eros quis faucibus.`,
    User: `Role description... pretium lacinia vitae ut urna.
     Maecenas ac porta odio, quis facilisis lacus. Nunc porta, eros quis faucibus.`,
  };
  return (
    <div>
      <Box mt={'.3rem'}>
        <CustomSelect
          placeholder="Type  search..."
          options={roleOptions}
          onChange={(val) => {
            return val;
          }}
          defaultValue={roleOptions[0]}
          label="Select role"
        />
      </Box>
      <Stack spacing={'1.5rem'} mt={'1.5rem'}>
        {Object.entries(roles).map(([key, value], index) => {
          return (
            <Flex key={index} alignItems={'flex-start'}>
              <Text
                color={'#333333'}
                fontWeight={500}
                fontFamily={'heading'}
                fontSize={'.8rem'}
                minW={'8rem'}
              >
                {key}:
              </Text>
              <Text
                fontWeight={400}
                color={'#7C7C7C'}
                fontFamily={'heading'}
                fontSize={'.8rem'}
              >
                {value}
              </Text>
            </Flex>
          );
        })}
      </Stack>
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
          maxW={'6rem'}
        >
          Update
        </Button>
      </Flex>
    </div>
  );
}
