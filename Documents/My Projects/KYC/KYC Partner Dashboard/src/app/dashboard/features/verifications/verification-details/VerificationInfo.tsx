import { IAgentVerification } from '@/shared/interface/agent';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  HStack,
  Text,
  Box,
  Button,
  Flex,
  UnorderedList,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { BsX } from 'react-icons/bs';
import ImageModal from './ImageModal';

export default function VerificationInfo({
  isOpen,
  onClose,
  data,
}: {
  data: Partial<IAgentVerification>;
  onClose: any;
  isOpen: boolean;
}) {
  const { images, notes, agentReports, signature } = data;
  const comment: Array<string> = notes || [];

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent pb={'3rem'}>
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
                Information submitted{' '}
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

          {/* =================================== */}
          <Box ml={'7rem'} mt={'3rem'}>
            {agentReports?.videoUrl && (
              <Box>
                <Text
                  mb={'.5rem'}
                  fontFamily={'heading'}
                  fontWeight={500}
                  color={'#4F4F4F'}
                >
                  Video
                </Text>
                <div>
                  <video controls style={{ height: '400px', width: '500px' }}>
                    <source src={agentReports.videoUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </video>
                </div>
              </Box>
            )}
            <Divider my={'2rem'} borderColor={'#F0EDFF'} />

            {/* =============================== */}
            {images && (
              <Box>
                <Text
                  mb={'.5rem'}
                  fontFamily={'heading'}
                  fontWeight={500}
                  color={'#4F4F4F'}
                >
                  Images{' '}
                </Text>
                <Flex alignItems={'center'} flexWrap={'wrap'} gap={'1.5rem'}>
                  {images?.length > 0 ? (
                    images?.map((item, index) => (
                      <ImageModal key={item + '' + index} src={item} />
                    ))
                  ) : (
                    <Text opacity={0.5} fontSize={'.9rem'}>
                      There are no images
                    </Text>
                  )}
                </Flex>
              </Box>
            )}
            <Divider my={'2rem'} borderColor={'#F0EDFF'} />

            {/* =============================== */}
            {agentReports?.audioUrl && (
              <Box>
                <Text
                  mb={'.5rem'}
                  fontFamily={'heading'}
                  fontWeight={500}
                  color={'#4F4F4F'}
                >
                  Voice Comment
                </Text>
                <div>
                  <audio controls>
                    <source src={agentReports.audioUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </Box>
            )}
            <Divider my={'2rem'} borderColor={'#F0EDFF'} />

            {/* =============================== */}
            {comment.length > 0 && (
              <Box>
                <Text
                  mb={'.5rem'}
                  fontFamily={'heading'}
                  fontWeight={500}
                  color={'#4F4F4F'}
                >
                  Comment by agent
                </Text>
                <UnorderedList>
                  {comment
                    .filter((item) => Boolean(item))
                    .map((item, index) => (
                      <ListItem
                        fontFamily={'heading'}
                        color={'#828282'}
                        key={item + '' + index}
                      >
                        {item}
                      </ListItem>
                    ))}
                </UnorderedList>
              </Box>
            )}

            <Divider my={'2rem'} borderColor={'#F0EDFF'} />

            {signature && (
              <Box>
                <Text
                  mb={'.5rem'}
                  fontFamily={'heading'}
                  fontWeight={500}
                  color={'#4F4F4F'}
                >
                  Signature
                </Text>
                <ImageModal src={signature} />
              </Box>
            )}
          </Box>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
