import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ReassignAgent } from './ReassignAgent';
import { IAgentVerification } from '@/shared/interface/agent';
import VerificationInfo from './VerificationInfo';
import { useAuth } from '@/app/auth/hooks/useAuth';
import { Permissions } from '@/data/permission';

export function CandidtateInfo(data: Partial<IAgentVerification>) {
  const { candidate, category, formatAddress, status, agent } = data;
  const { userHasPermission } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const viewVerification = useDisclosure();
  const agentAssigned =
    status === 'failed' || (status === 'verified' && Boolean(agent));
  const canReplace =
    Boolean(agent) && status !== 'failed' && status !== 'verified';

  return (
    <Box>
      <Text fontSize={'20px'} fontWeight={700}>
        Candidate Info
      </Text>
      <VStack w={'full'} mt={'24px'} gap={'18px'}>
        <NameAndValue
          name={'Candidate’s name'}
          value={`
        ${candidate?.firstName?.toLowerCase()}
         ${candidate?.lastName?.toLowerCase()}`}
        />
        <NameAndValue name={'Verification type'} value={category} />
        <NameAndValue name={'Address'} value={formatAddress} />
        <NameAndValue name={'Phone number'} value={candidate?.phoneNumber} />
        {/* <NameAndValue name={'Date'} value={'7th, Aug 2027'} /> */}
      </VStack>

      <Divider my={'40px'} />

      <HStack
        w={'full'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Text fontSize={'20px'} fontWeight={700}>
          Agent Info
        </Text>
        {userHasPermission(Permissions.CAN_REASSIGN_TASK) && !agentAssigned && (
          <Button
            variant={'ghost'}
            borderColor={'#4F4F4F'}
            borderWidth={'1px'}
            color={'#4F4F4F'}
            fontSize={'13px'}
            fontWeight={500}
            _hover={{ bg: 'transparent' }}
            onClick={onOpen}
          >
            {canReplace ? 'Replace' : 'Assign'} agent
          </Button>
        )}
      </HStack>

      {agent && (
        <VStack w={'full'} mt={'24px'} gap={'18px'}>
          <NameAndValue
            name={'Name'}
            value={`
        ${agent?.user?.firstName?.toLowerCase()}
         ${agent?.user?.lastName?.toLowerCase()}`}
          />
          <NameAndValue
            name={'Phone number'}
            value={`
        ${agent?.user?.phoneNumber?.countryCode}
         ${agent?.user?.phoneNumber?.number}`}
          />
          <NameAndValue name={'Email Address'} value={agent?.user?.email} />
        </VStack>
      )}
      <Divider my={'40px'} />

      <HStack
        w={'full'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Text fontSize={'20px'} fontWeight={700}>
          Verification Info{' '}
        </Text>
      </HStack>

      <VStack w={'full'} mt={'24px'} gap={'18px'}>
        <NameAndValue name={'Completion time'} value={`4hrs 46mins 44 secs`} />
        <HStack
          w={'full'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          <Text color={'#4F4F4F'} fontWeight={400} fontSize={'14px'} w={'full'}>
            {'Information submitted'}
          </Text>
          <Text
            textAlign={'right'}
            fontWeight={500}
            fontSize={'14px'}
            color={'#5B8BFF'}
            w={'full'}
            cursor={'pointer'}
            onClick={viewVerification.onOpen}
          >
            {'View details'}
          </Text>
        </HStack>
      </VStack>

      <ReassignAgent isOpen={isOpen} onClose={onClose} />
      <VerificationInfo
        data={data}
        isOpen={viewVerification.isOpen}
        onClose={viewVerification.onClose}
      />
    </Box>
  );
}

function NameAndValue({ name, value }) {
  return (
    <HStack
      w={'full'}
      justifyContent={'space-between'}
      alignItems={'flex-start'}
    >
      <Text color={'#4F4F4F'} fontWeight={400} fontSize={'14px'} w={'full'}>
        {name}
      </Text>
      <Text
        textAlign={'right'}
        lineHeight={'20px'}
        fontWeight={500}
        fontSize={'14px'}
        color={'#333333'}
        w={'full'}
      >
        {value}
      </Text>
    </HStack>
  );
}
