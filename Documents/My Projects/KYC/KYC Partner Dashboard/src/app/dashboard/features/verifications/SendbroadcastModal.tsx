import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSendBroadcastApi } from '../../api/send-broadcast';
import CustomSelect from '@/components/input/CustomSelect';
import { stateOptions } from '@/data/options/state';

export default function SendbroadcastModal({ onClose }: any) {
  const [state, setState] = useState('');
  const { mutateAsync, isLoading } = useSendBroadcastApi();
  const sendbroadcast = async () => {
    await mutateAsync(state);
    onClose();
  };
  return (
    <div>
      <Box mb={'1rem'}>
        <Stack>
          <Box>
            <CustomSelect
              required={true}
              placeholder="Type  search..."
              options={stateOptions || []}
              onChange={(val) => {
                setState(val.value);
              }}
              label="Select the state you want to send a broadcast to"
              defaultValue={state}
            />
          </Box>
        </Stack>
      </Box>
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
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          type="submit"
          onClick={sendbroadcast}
          isDisabled={!state}
        >
          Send
        </Button>
      </Flex>
    </div>
  );
}
