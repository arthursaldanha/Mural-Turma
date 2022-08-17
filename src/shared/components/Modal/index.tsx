import { ReactNode } from 'react';

import { CloseCircle } from 'iconsax-react';

import { Modal as ModalComponent } from './components';
import { Wrapper } from './styles';

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
    <Wrapper backgroundColor={backgroundColor}>
      {isShowCloseButton && (
        <header>
          <CloseCircle onClick={onClose} />
        </header>
      )}

      {children}
    </Wrapper>
  );

  return (
    <ModalComponent
      open={isOpen}
      onClose={onClose}
      modalContent={modalContent}
    />
  );
};
