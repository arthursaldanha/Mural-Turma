import { ReactNode } from 'react';

import { CloseCircle } from 'iconsax-react';

import { Modal as ModalComponent } from './components';

interface ModalProps {
  isShowCloseButton?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  backgroundColor?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isShowCloseButton = true,
  isOpen,
  onClose,
  children,
  backgroundColor,
}) => {
  const modalContent = (
    <div
      className="flex flex-col items-center flex-1"
      style={{ backgroundColor: backgroundColor || '' }}
    >
      {isShowCloseButton && (
        <header className="w-full bg-zinc-800 flex justify-end sm:shadow-modal">
          <CloseCircle
            onClick={onClose}
            className="text-grey-800 my-2 mr-4 cursor-pointer sm:my-2 sm:mx-4"
          />
        </header>
      )}

      {children}
    </div>
  );

  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      modalContent={modalContent}
    />
  );
};
