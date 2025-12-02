import CustomInput from '@/components/input/CustomInput';
import CustomModal from '@/components/ui/CustomModal';
import {
  Flex,
  SimpleGrid,
  GridItem,
  Divider,
  Button,
  Text,
  Box,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import ChangePasswordModal from '../general/ChangePasswordModal';
import avatar from '@/assets/images/settings/avatar.png';

export default function Business() {
  const { isOpen, onClose, onOpen } = useDisclosure();

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
          Business information
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
                  }}
                  formControlProps={{
                    isRequired: true,
                    label: 'Business name',
                  }}
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  inputProps={{
                    name: 'phoneNumber',
                    type: 'text',
                    placeholder: '09000000112',
                  }}
                  formControlProps={{
                    isRequired: true,
                    label: 'Business phone number',
                  }}
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  inputProps={{
                    name: 'email',
                    type: 'email',
                    placeholder: 'adewale@gmail.com',
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
                    }}
                    formControlProps={{ isRequired: true, label: 'Email' }}
                  />
                </GridItem>
              </SimpleGrid>
            </Box>
          </Flex>
          <Divider mt={'3rem'} mb={'1.4rem'} borderColor={'#EFF4FD'} />
          <Flex
            gap={'1rem'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            mb={'2rem'}
            pr={'5rem'}
          >
            <Button
              color={'#4F4F4F'}
              fontSize={'.9rem'}
              minW={'11rem'}
              variant={'outline'}
              minH={'2.5rem'}
              fontWeight={500}
              fontFamily={'heading'}
              onClick={onOpen}
            >
              Change password{' '}
            </Button>
            <Button minH={'2.5rem'} fontSize={'.9rem'} minW={'8rem'}>
              Save changes{' '}
            </Button>
          </Flex>
        </Box>

        <CustomModal
          modalWidth={{ base: '90%', md: '30rem' }}
          isOpen={isOpen}
          onClose={onClose}
          headertext={'Change password'}
        >
          <ChangePasswordModal onClose={onClose} />
        </CustomModal>
      </Box>
    </div>
  );
}
