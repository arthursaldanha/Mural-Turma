import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Background = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;

  @media screen and (max-width: 480px) {
    align-items: flex-end;
  }
`;

export const ModalWrapper = styled(motion.div)`
  background-color: #fff;
  max-width: 100%;
  max-height: 100vh;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  display: flex;
  border-radius: 8px;
  z-index: 100;
  overflow: hidden;
  @media screen and (max-width: 480px) {
    width: 100%;
    border-radius: 8px 8px 0px 0px;
  }
`;
