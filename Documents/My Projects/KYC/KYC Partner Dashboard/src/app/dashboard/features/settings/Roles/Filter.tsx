import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { roleOptions } from '@/data/options/role';
import { Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';

export default function Filter() {
  const px = '1.4rem';

  return (
    <Box>
      <Text
        pt={'1.8rem'}
        pb={'.8rem'}
        px={px}
        fontFamily={'heading'}
        color={'#4F4F4F'}
        fontSize={'.7rem'}
      >
        Filters
      </Text>

      <Divider borderColor={'#E5E9EC'} />
      <Stack spacing={'1.2rem'} px={px} py={'1.5rem'}>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Name
          </Text>
          <Box mt={'.3rem'}>
            <CustomInput
              inputProps={{
                type: 'text',
                placeholder: 'Adewale',
              }}
              formControlProps={{ isRequired: true }}
            />
          </Box>
        </Box>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Email
          </Text>
          <Box mt={'.3rem'}>
            <CustomInput
              inputProps={{
                type: 'email',
                placeholder: 'test@gmail.com',
              }}
              formControlProps={{ isRequired: true }}
            />
          </Box>
        </Box>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Role
          </Text>
          <Box mt={'.3rem'}>
            <CustomSelect
              placeholder="Type  search..."
              options={roleOptions}
              onChange={(val) => {
                return val;
              }}
              defaultValue={roleOptions[0]}
            />
          </Box>
        </Box>
      </Stack>
      <Divider borderColor={'#E5E9EC'} />
      <Flex
        px={px}
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        py={'1.5rem'}
      >
        <Button
          color={'#4F4F4F'}
          fontSize={'.8rem'}
          maxW={'6rem'}
          variant={'outline'}
        >
          Clear filter
        </Button>
        <Button fontSize={'.8rem'} maxW={'6rem'}>
          Apply filter
        </Button>
      </Flex>
    </Box>
  );
}
