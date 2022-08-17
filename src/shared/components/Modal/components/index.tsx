import React, { useRef, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';

import { ModalProps } from '@/shared/types';

import { Background, ModalWrapper } from './styles';

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  modalContent,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (modalRef && modalRef.current && modalRef.current === event.target) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [open]);

  const backgroundVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <Background
          variants={backgroundVariants}
          animate="animate"
          initial="initial"
          ref={modalRef}
          exit={{
            opacity: 0,
          }}
        >
          <ModalWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {modalContent}
          </ModalWrapper>
        </Background>
      )}
    </AnimatePresence>
  );
};
