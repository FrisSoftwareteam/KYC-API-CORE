import { useAssignTaskApi } from '@/app/dashboard/api/assign-task';
import { useGetAgentPerformanceApi } from '@/app/dashboard/api/get-agent-performance';
import { useGetAvailableAgentsApi } from '@/app/dashboard/api/get-available-agent';
import { useGetVerificationByIdApi } from '@/app/dashboard/api/get-verification-by-id';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { IAgent } from '@/shared/interface/agent';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { BsX } from 'react-icons/bs';
import { FaInfo } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';
import { useParams } from 'react-router-dom';

export function ReassignAgent({ isOpen, onClose }) {
  const { id } = useParams();
  const performanceModal = useDisclosure();
  const assignModal = useDisclosure();
  const { data: GAapi, isLoading: GAloading } = useGetAvailableAgentsApi(
    id as string,
    { enabled: Boolean(id) }
  );
  const [selectedAgent, setSelectedAgent] = useState<IAgent | undefined>();

  if (GAloading) {
    return <LogoLoader h={'40rem'} w={'100%'} />;
  }

  const assignAgent = (agent: any) => {
    setSelectedAgent(agent);
    assignModal.onOpen();
  };
  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <HStack
            w={'full'}
            justifyContent={'space-between'}
            h={'80px'}
            px={'24px'}
            borderBottom={'1px'}
            borderColor={'#F5F7FA'}
          >
            <HStack>
              <BsX cursor={'pointer'} onClick={onClose} fontSize={'20px'} />
              <Text fontWeight={500} fontSize={'20px'}>
                Available Agents
              </Text>
            </HStack>
            <Button
              variant={'ghost'}
              borderColor={'#4F4F4F'}
              borderWidth={'1px'}
              color={'#4F4F4F'}
              fontSize={'13px'}
              fontWeight={500}
              _hover={{ bg: 'transparent' }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </HStack>
          <Box mx={'96px'} mt={'32px'} w={'526px'}>
            <Flex
              borderRadius={'.3rem'}
              alignItems={'center'}
              px={'2rem'}
              h={{ base: '2.5rem' }}
              bg={'#F1F1F1'}
              w={'full'}
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
                placeholder="Search for an agent"
                w={'20rem'}
                fontSize={{ base: '.8rem', md: '1rem' }}
              />
            </Flex>

            <VStack w={'full'} mt={'32px'}>
              {GAapi?.data?.map((item) => (
                <Box w={'full'} key={item.agent.id}>
                  <HStack
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    h={'65px'}
                    w={'full'}
                  >
                    <HStack alignItems={'flex-start'}>
                      <Avatar
                        name="Dan Abrahmov"
                        src={item?.agent?.imageUrl}
                        h={'32px'}
                        w={'32px'}
                      />
                      <Box>
                        <HStack>
                          <Text
                            fontWeight={500}
                            fontSize={'14px'}
                            color={'#181819E5'}
                            textTransform={'capitalize'}
                          >
                            {item?.agent?.user?.firstName?.toLowerCase()}{' '}
                            {item?.agent?.user?.lastName?.toLowerCase()}
                          </Text>
                          <Box
                            h={'10px'}
                            w={'10px'}
                            bg={
                              item?.presence === 'online'
                                ? '#56C568'
                                : '#DBDBDB'
                            }
                            borderRadius={'full'}
                          />
                        </HStack>
                        <Box
                          bg={'#DBDBDB'}
                          borderRadius={'2px'}
                          w={'fit-content'}
                          my={'4px'}
                          px={'2'}
                        >
                          <Text
                            fontWeight={500}
                            fontSize={'8.35px'}
                            color={'#4F4F4F'}
                          >
                            {item.distance} meters away
                          </Text>
                        </Box>
                        <Box
                          w={'fit-content'}
                          color={'#5B8BFF'}
                          fontSize={'14px'}
                          fontWeight={400}
                          textAlign={'left'}
                          cursor={'pointer'}
                          onClick={performanceModal.onOpen}
                        >
                          View performance
                        </Box>
                      </Box>
                    </HStack>
                    <Button
                      variant={'ghost'}
                      borderColor={'#4F4F4F'}
                      borderWidth={'1px'}
                      color={'#4F4F4F'}
                      fontSize={'13px'}
                      fontWeight={500}
                      _hover={{ bg: 'transparent' }}
                      onClick={() => assignAgent(item.agent)}
                    >
                      Assign
                    </Button>
                  </HStack>
                  {/* {i !== 20 - 1 && (
                    <Divider
                      my={'16px'}
                      borderBottomWidth={'1px'}
                      borderColor={'#F5F7FA'}
                    />
                  )} */}
                </Box>
              ))}
            </VStack>
          </Box>
          <Box mt={'44px'} mx={'96px'}></Box>
        </ModalContent>
      </Modal>

      <Performance
        performanceModal={performanceModal}
        id={selectedAgent?._id}
      />
      <Assign
        assignModal={assignModal}
        selectedAgent={selectedAgent}
        onClose={onClose}
      />
    </Fragment>
  );
}

function Performance({ performanceModal, id }: any) {
  const { data, isLoading } = useGetAgentPerformanceApi(id, {
    enabled: Boolean(id),
  });
  return (
    <Modal
      isOpen={performanceModal.isOpen}
      onClose={performanceModal.onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent w={'383px'} h={'367px'}>
        <HStack justifyContent={'flex-end'} mt={'24px'} px={'24px'}>
          <BsX
            fontSize={'20px'}
            cursor={'pointer'}
            onClick={performanceModal.onClose}
          />
        </HStack>
        <Box>
          <VStack
            justifyContent={'center'}
            borderBottom={'1px'}
            borderColor={'#EFF4FD'}
            pb={'12px'}
          >
            <Center h={'35px'} w={'35px'} bg={'#B6B6B6'} borderRadius={'full'}>
              <FaInfo color={'#FFFFFF'} />
            </Center>
            <Text color={'#4F4F4F'} fontSize={'16px'} fontWeight={400}>
              Performance
            </Text>
          </VStack>

          <VStack justifyContent={'center'} pb={'12px'} mt={'22px'}>
            <Text color={'#000000'} fontSize={'16px'} fontWeight={400}>
              Completed verifications
            </Text>
            <Text color={'#000000'} fontSize={'16px'} fontWeight={500}>
              {isLoading ? '...' : data?.data.totalCompletedVerifications}
            </Text>
          </VStack>

          <VStack
            justifyContent={'center'}
            borderBottom={'1px'}
            borderColor={'#EFF4FD'}
            pb={'12px'}
          >
            <Text color={'#000000'} fontSize={'16px'} fontWeight={400}>
              Pending verifications
            </Text>
            <Text color={'#000000'} fontSize={'16px'} fontWeight={500}>
              {isLoading ? '...' : data?.data.totalPendingVerification}
            </Text>
          </VStack>
          <Center mt={'22px'}>
            <Button
              variant={'ghost'}
              borderColor={'#4F4F4F'}
              borderWidth={'1px'}
              color={'#4F4F4F'}
              fontSize={'13px'}
              fontWeight={500}
              _hover={{ bg: 'transparent' }}
              onClick={performanceModal.onClose}
            >
              Got it
            </Button>
          </Center>
        </Box>
      </ModalContent>
    </Modal>
  );
}

function Assign({ assignModal, selectedAgent, onClose }: any) {
  const { id: verificationid } = useParams();
  const { mutateAsync, isLoading } = useAssignTaskApi();
  const { data: GVapi } = useGetVerificationByIdApi(verificationid as string);
  const { refetch } = useGetVerificationByIdApi(verificationid as string, {
    enabled: Boolean(verificationid),
  });

  // console.log('selected agent is ', selectedAgent);
  // console.log('task  agent is ', GVapi);

  const assigntTask = async () => {
    if (!selectedAgent) {
      return;
    }
    const data = {
      agent: selectedAgent?.id,
      task: String(GVapi?.data?.task),
    };
    await mutateAsync(data);
    await refetch();
    assignModal.onClose();
    onClose();
  };
  return (
    <Modal
      isOpen={assignModal.isOpen}
      onClose={assignModal.onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent w={'383px'} h={'300px'}>
        <HStack
          justifyContent={'justify-between'}
          px={'24px'}
          w={'full'}
          borderBottom={'1px'}
          borderColor={'#EFF4FD'}
          py={'24px'}
        >
          <Text w={'full'} color={'#4F4F4F'} fontSize={'16px'} fontWeight={400}>
            Assign Verification
          </Text>
          <Box>
            <BsX
              fontSize={'20px'}
              cursor={'pointer'}
              onClick={assignModal.onClose}
            />
          </Box>
        </HStack>
        <Box px={'24px'}>
          <VStack
            justifyContent={'center'}
            borderBottom={'1px'}
            borderColor={'#EFF4FD'}
            pb={'24px'}
            mt={'22px'}
          >
            <Text
              color={'#4A526AFD'}
              fontSize={'16px'}
              fontWeight={400}
              lineHeight={'24px'}
              textTransform={'capitalize'}
            >
              You’re about to assign{' '}
              <b>
                {GVapi?.data?.candidate?.firstName?.toLowerCase()}{' '}
                {GVapi?.data?.candidate?.lastName?.toLowerCase()}
                ’s{' '}
              </b>{' '}
              verification to Agent{' '}
              {selectedAgent?.user?.firstName?.toLowerCase()}{' '}
              {selectedAgent?.user?.lastName?.toLowerCase()}
            </Text>
            <Text
              color={'#4A526AFD'}
              fontSize={'16px'}
              fontWeight={400}
              lineHeight={'24px'}
            >
              Are you sure you’d like to continue with the assignment?
            </Text>
          </VStack>

          <HStack justifyContent={'flex-end'} mt={'22px'}>
            <Button
              variant={'ghost'}
              borderColor={'#4F4F4F'}
              borderWidth={'1px'}
              color={'#4F4F4F'}
              fontSize={'13px'}
              fontWeight={500}
              _hover={{ bg: 'transparent' }}
              onClick={assignModal.onClose}
            >
              No, Cancel
            </Button>
            <Button
              variant={'solid'}
              borderColor={'#4F4F4F'}
              borderWidth={'1px'}
              color={'#ffffff'}
              fontSize={'13px'}
              bg={'#001F78'}
              fontWeight={500}
              _hover={{ bg: 'transparent' }}
              onClick={assigntTask}
              isLoading={isLoading}
            >
              Yes, Continue
            </Button>
          </HStack>
        </Box>
      </ModalContent>
    </Modal>
  );
}
