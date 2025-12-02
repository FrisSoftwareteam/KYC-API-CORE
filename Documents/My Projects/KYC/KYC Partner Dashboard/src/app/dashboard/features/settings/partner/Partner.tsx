import CustomInput from '@/components/input/CustomInput';
import {
  Flex,
  SimpleGrid,
  GridItem,
  Divider,
  Text,
  Box,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import avatar from '@/assets/images/settings/avatar.png';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { useGetPartnerProfileApi } from '@/app/dashboard/api/get-partner-profile';

export default function Partner() {
  const { data: GBPapi, isLoading: GBPloading } = useGetPartnerProfileApi();

  if (GBPloading) {
    return <LogoLoader />;
  }
  return (
    <div>
      <Box
        pl={'1.5rem'}
        pt={'2.3rem'}
        minH={'80vh'}
        bg={'white'}
        rounded={'.4rem'}
        pb={'4rem'}
      >
        <Text
          color={'#4F4F4F'}
          fontSize={'1.1rem'}
          fontWeight={500}
          fontFamily={'heading'}
        >
          Partner information
        </Text>
        <Box maxW={'55rem'} mt={'2rem'}>
          <Flex gap={'1.5rem'}>
            <Box w={'10rem'} h={'100%'}>
              <Image src={avatar} h={'100%'} w={'100%'} objectFit={'contain'} />
            </Box>
            <SimpleGrid gap={'1.5rem'} row={2} columns={2}>
              <GridItem w={'20rem'}>
                <CustomInput
                  inputProps={{
                    name: 'name',
                    type: 'text',
                    placeholder: 'Merchant africa',
                    defaultValue: GBPapi?.data?.name,
                    isReadOnly: true,
                  }}
                  formControlProps={{
                    label: 'Partner name',
                  }}
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  inputProps={{
                    name: 'email',
                    type: 'email',
                    placeholder: 'adewale@gmail.com',
                    defaultValue: GBPapi?.data?.email,
                    isReadOnly: true,
                  }}
                  formControlProps={{ isRequired: true, label: 'Email' }}
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  inputProps={{
                    name: 'address',
                    type: 'text',
                    placeholder: '09000000112',
                    defaultValue: GBPapi?.data?.address,
                    isReadOnly: true,
                  }}
                  formControlProps={{ isRequired: true, label: 'Address' }}
                />
              </GridItem>
            </SimpleGrid>
          </Flex>
          <Divider mt={'3rem'} mb={'1.4rem'} borderColor={'#EFF4FD'} />

          {/* =====================CONTACT PERSON============= */}
          <Flex gap={'1.5rem'}>
            <Box w={'10rem'} h={'100%'}></Box>
            <Box>
              <Text
                mb={'2rem'}
                color={'#4F4F4F'}
                fontSize={'1.1rem'}
                fontWeight={500}
                fontFamily={'heading'}
              >
                Contact person
              </Text>

              <SimpleGrid gap={'1.5rem'} row={2} columns={2}>
                <GridItem w={'20rem'}>
                  <CustomInput
                    inputProps={{
                      name: 'name',
                      type: 'text',
                      placeholder: 'Adewale africa',
                      defaultValue: `${GBPapi?.data?.mainUser.firstName} ${GBPapi?.data?.mainUser.lastName}`,
                      isReadOnly: true,
                    }}
                    formControlProps={{
                      isRequired: true,
                      label: 'Full name',
                    }}
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    inputProps={{
                      name: 'phoneNumber',
                      type: 'text',
                      placeholder: '09000000112',
                      defaultValue: `${GBPapi?.data?.mainUser.phoneNumber.countryCode} ${GBPapi?.data?.mainUser.phoneNumber.number}`,
                      isReadOnly: true,
                    }}
                    formControlProps={{
                      isRequired: true,
                      label: 'Phone number',
                    }}
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    inputProps={{
                      name: 'email',
                      type: 'email',
                      placeholder: 'adewale@gmail.com',
                      defaultValue: GBPapi?.data?.mainUser.email,
                      isReadOnly: true,
                    }}
                    formControlProps={{ isRequired: true, label: 'Email' }}
                  />
                </GridItem>
              </SimpleGrid>
            </Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
}
