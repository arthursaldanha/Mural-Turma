import React from 'react';

import { TextProps } from '@/shared/types';

import { TextComponent } from './styles';

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return <TextComponent {...props}>{children}</TextComponent>;
};

export default Text;
