import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalProps,
  ModalHeader,
  Divider,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface CustomModalprops extends ModalProps {
  children: ReactNode;
  modalWidth?: any;
  headertext?: any;
}
export default function CustomModal({
  isOpen,
  onClose,
  children,
  modalWidth,
  headertext,
}: CustomModalprops) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={modalWidth}>
        {headertext && (
          <ModalHeader
            color={'#4F4F4F'}
            fontFamily={'heading'}
            fontWeight={400}
            fontSize={'.9rem'}
          >
            {headertext}
          </ModalHeader>
        )}
        <Divider borderColor={'#EFF4FD'} />
        <ModalCloseButton />
        <ModalBody pt={'6'}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
