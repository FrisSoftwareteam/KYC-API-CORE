import CustomInput from '@/components/input/CustomInput';
import {
  Box,
  Button,
  Divider,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import avatar from '@/assets/images/settings/avatar.png';
import { useGetUserProfileApi } from '@/app/dashboard/api/get-user-profile';
import { LogoLoader } from '@/components/elements/loader/Loader';
export default function Profile() {
  const { data: GUPapi, isLoading: GUPloading } = useGetUserProfileApi();
  if (GUPloading) {
    return <LogoLoader h={'40rem'} w={'100%'} />;
  }

  return (
    <Box
      pl={'1.5rem'}
      pt={'2.3rem'}
      minH={'80vh'}
      bg={'white'}
      rounded={'.4rem'}
    >
      <Text
        color={'#4F4F4F'}
        fontSize={'1.1rem'}
        fontWeight={500}
        fontFamily={'heading'}
      >
        Personal information
      </Text>
      <Box maxW={'55rem'} mt={'2rem'}>
        <Box w={'10rem'} h={'100%'}>
          <Image src={avatar} h={'100%'} w={'100%'} objectFit={'contain'} />
        </Box>
        <SimpleGrid gap={'1.5rem'} row={2} columns={2} mt={'2rem'} w={'40rem'}>
          <GridItem w={'18rem'}>
            <CustomInput
              inputProps={{
                name: 'firstName',
                type: 'text',
                placeholder: 'Adewale',
                isReadOnly: true,
                value: GUPapi?.data?.user?.firstName,
              }}
              formControlProps={{ isRequired: true, label: 'First name' }}
            />
          </GridItem>
          <GridItem w={'18rem'}>
            <CustomInput
              inputProps={{
                name: 'lasttName',
                type: 'text',
                placeholder: 'John',
                isReadOnly: true,
                value: GUPapi?.data?.user?.lastName,
              }}
              formControlProps={{ isRequired: true, label: 'Last name' }}
            />
          </GridItem>
          <GridItem w={'18rem'}>
            <CustomInput
              inputProps={{
                name: 'email',
                type: 'email',
                placeholder: 'adewale@gmail.com',
                isReadOnly: true,
                value: GUPapi?.data?.user?.email,
              }}
              formControlProps={{ isRequired: true, label: 'Email' }}
            />
          </GridItem>
          <GridItem w={'18rem'}>
            <CustomInput
              inputProps={{
                name: 'phoneNumber',
                type: 'text',
                placeholder: '0903790112',
                isReadOnly: true,
                value: `${GUPapi?.data?.user?.phoneNumber.countryCode}${GUPapi?.data?.user?.phoneNumber.number} `,
              }}
              formControlProps={{ isRequired: true, label: 'Phone number' }}
            />
          </GridItem>
        </SimpleGrid>

        <Divider mt={'3rem'} mb={'1.4rem'} borderColor={'#EFF4FD'} />

        <Button minH={'2.5rem'} fontSize={'.9rem'} minW={'8rem'}>
          Save changes{' '}
        </Button>
      </Box>
    </Box>
  );
}
