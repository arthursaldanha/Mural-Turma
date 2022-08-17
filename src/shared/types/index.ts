import {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

export interface FlexboxProps extends HTMLAttributes<HTMLDivElement> {
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'start'
    | 'end';
  alignContent?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  alignSelf?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end';
}

export interface ContainerProps extends FlexboxProps {
  backgroundColor?: string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  padding?: string;
  margin?: string;
  borderRadius?: string;
  columnGap?: string;
  rowGap?: string;
}

interface Input {
  errorMessage?: string;
  sucessMessage?: string;
  alertMessage?: string;
  infoMessage?: string;
}

export interface InputProps
  extends Input,
    InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  // startIcon?: React.ReactNode | React.Component;
  startIcon?: any;
  // endIcon?: React.ReactNode | React.Component;
  endIcon?: any;
}

export interface TextProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?:
    | 'small'
    | 'xsmall'
    | 'xxsmall'
    | 'xxxsmall'
    | 'xxxsmall'
    | 'xxxxsmall'
    | 'medium'
    | 'xmedium'
    | 'xxmedium'
    | 'xxxmedium'
    | 'xxxxmedium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | 'xxxlarge'
    | 'xxxxlarge';
  fontFamily?: 'Inter' | 'Lexend' | 'OpenSans';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  textAlign?:
    | 'start'
    | 'end'
    | 'center'
    | 'justify'
    | 'left'
    | 'right'
    | 'unset'
    | 'initial'
    | 'inhetir';
  children: ReactNode | string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  modalContent: JSX.Element;
}
export type ModalContainerProps = HTMLAttributes<HTMLDivElement>;
export type TextAreaProps = Input & TextareaHTMLAttributes<HTMLTextAreaElement>;
