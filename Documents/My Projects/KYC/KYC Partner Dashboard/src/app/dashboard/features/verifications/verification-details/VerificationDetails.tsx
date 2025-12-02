import Status from '@/components/elements/status/Status';
import VslMap from '@/components/map/VslMap';
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import { CandidtateInfo } from './CandidtateInfo';
import { Link, useParams } from 'react-router-dom';
import { useGetVerificationByIdApi } from '@/app/dashboard/api/get-verification-by-id';
import { LogoLoader } from '@/components/elements/loader/Loader';
import SingleLocationMap from '@/components/map/SingleLocationMap';
import { useGetAgentLocationApi } from '@/app/dashboard/api/get-agent-location';
import Custompopover from '@/components/ui/CustomPopover';
import CustomModal from '@/components/ui/CustomModal';
import UnFlagModal from './UnFlagModal';

export function VerificationDetails() {
  const { id } = useParams();
  const unFlagDisclosure = useDisclosure();
  const { data: GVapi, isLoading: GVloading } = useGetVerificationByIdApi(
    id as string,
    {
      enabled: Boolean(id),
    }
  );

  const { data: GALapi } = useGetAgentLocationApi(
    String(GVapi?.data?.agent?._id),
    { enabled: Boolean(GVapi?.data?.agent?._id) }
  );
  if (GVloading) {
    return <LogoLoader h={'40rem'} w={'100%'} />;
  }

  // console.log('data is ', GVapi?.data);
  const showCompletedMap =
    GVapi?.data.status === 'verified' || GVapi?.data.status === 'failed';
  const showUnassignedMap = GVapi?.data.status === 'created';
  const showAssignedMap = GVapi?.data.status === 'accepted';
  // console.log('data is ', GVapi);

  // console.log('agent location is ', GALapi);
  const actionlist = [
    {
      isLink: false,
      name: 'Unflag Verification',
      color: '#4F4F4F',
      clickFn: () => unFlagDisclosure.onOpen(),
    },
  ];
  return (
    <Box>
      <HStack
        h={'64px'}
        bg={'#FFFFFF'}
        px={'24px'}
        gap={'20px'}
        borderTop={'1px'}
        borderColor={'#F1F1F1'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Flex gap={'20px'} alignItems={'center'}>
          <Text textTransform={'capitalize'} fontWeight={500} fontSize={'20px'}>
            {GVapi?.data.candidate?.firstName?.toLowerCase()}{' '}
            {GVapi?.data.candidate?.lastName?.toLowerCase()}
          </Text>
          <Status name={GVapi?.data.status} px={'.5rem'} />
          {GVapi?.data.isFlagged && <Status name={'Flagged'} px={'.5rem'} />}
        </Flex>

        {GVapi?.data.isFlagged && (
          <Box>
            <Custompopover actionlist={actionlist}>
              <Button
                minW={'9rem'}
                border="1px solid #4F4F4F"
                fontWeight={500}
                fontFamily={'heading'}
                color={'#4F4F4F'}
                variant={'outline'}
                fontSize={'.8rem'}
                h={'2rem'}
                minH={'.1rem'}
              >
                Verification options
              </Button>
            </Custompopover>
          </Box>
        )}
      </HStack>

      <Box ml={'24px'} mt={'32px'}>
        <Link to={'/verifications'}>
          <Button
            fontWeight={400}
            fontSize={'.8rem'}
            minH={'.1rem'}
            h={'2rem'}
            maxW={'8.5rem'}
            leftIcon={<BsArrowLeft />}
            variant={'ghost'}
            _hover={{ bg: 'transparent' }}
          >
            Back to verifcations
          </Button>
        </Link>

        <HStack
          mt={'32px'}
          w={'full'}
          bg={'#FFFFFF'}
          h={'auto'}
          alignItems={'flex-start'}
        >
          <Box w={'35%'} minH={'70vh'} px={'24px'} py={'36px'}>
            <CandidtateInfo {...GVapi?.data} />
          </Box>
          {showCompletedMap && (
            <Box w={'65%'}>
              <VslMap
                position={{
                  lat: Number(GVapi?.data.position?.latitude),
                  lng: Number(GVapi?.data.position?.longitude),
                }}
                submissionLocation={{
                  lat: Number(GVapi?.data.submissionLocation?.latitude),
                  lng: Number(GVapi?.data.submissionLocation?.longitude),
                }}
              />
            </Box>
          )}

          {showUnassignedMap && (
            <SingleLocationMap
              position={{
                lat: Number(GVapi.data?.position?.latitude),
                lng: Number(GVapi.data?.position?.longitude),
              }}
              label="Address"
            />
          )}
          {showAssignedMap && GALapi?.data.position.latitude && (
            // <SingleLocationMap
            //   position={{
            //     lat: Number(GALapi.data?.position?.latitude),
            //     lng: Number(GALapi.data?.position?.longitude),
            //   }}
            //   label="Agent location"
            // />

            <Box w={'65%'}>
              <VslMap
                position={{
                  lat: Number(GALapi.data?.position?.latitude),
                  lng: Number(GALapi.data?.position?.longitude),
                }}
                submissionLocation={{
                  lat: Number(GVapi?.data.position?.latitude),
                  lng: Number(GVapi?.data.position?.longitude),
                }}
              />
            </Box>
          )}
        </HStack>
      </Box>

      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={unFlagDisclosure.isOpen}
        onClose={unFlagDisclosure.onClose}
        headertext={'Unflag Verification'}
      >
        <UnFlagModal onClose={unFlagDisclosure.onClose} row={GVapi?.data} />
      </CustomModal>
    </Box>
  );
}
