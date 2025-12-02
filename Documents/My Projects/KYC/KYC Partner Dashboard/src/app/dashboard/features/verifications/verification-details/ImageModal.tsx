import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Box,
  Image,
} from '@chakra-ui/react';
export default function ImageModal({ src }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Box
        onClick={onOpen}
        w={'10rem'}
        h={'10rem'}
        overflowX={'hidden'}
        borderRadius={'.5rem'}
        cursor={'pointer'}
      >
        <Image
          src={src}
          alt="user-location"
          h={'100%'}
          w={'100%'}
          objectFit={'cover'}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={'60rem'} h={'30rem'}>
          <Image
            src={src}
            alt="user-location"
            h={'100%'}
            w={'100%'}
            objectFit={'cover'}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}
