import { Fragment, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { Dialog, Transition } from '@headlessui/react';

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

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalContent: JSX.Element;
}

export const Modal = ({ isOpen, onClose, modalContent }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          variants={backgroundVariants}
          animate="animate"
          initial="initial"
          exit={{
            opacity: 0,
          }}
          open={isOpen}
          onClose={onClose}
        >
          <div className="fixed inset-0 bg-black/30" />

          <div className="w-full h-full fixed inset-0 flex justify-center items-center z-[99] sm:items-end">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-h-screen max-w-full bg-zinc-800 shadow-modalComponent rounded-lg flex overflow-hidden z-100 sm:w-full sm:rounded-t-lg sm:rounded-b-none"
            >
              {modalContent}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
