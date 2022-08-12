import React, { useState } from 'react';

import { InputProps } from '@/shared/types';
import { ErrorMessage } from '@hookform/error-message';

import * as S from './styles';

// export type FormInputProps<TFormValues extends FieldValues> = InputProps & {
//   label?: string;
//   name: Path<TFormValues>;
//   rules?: RegisterOptions;
//   // register?: UseFormRegister<TFormValues>;
//   // errors?: Partial<DeepMap<TFormValues, FieldErrors>>;
// } & Omit<InputProps, 'name'>;

// export const Input = <TFormValues extends Record<string, unknown>>({
//   name,
//   register,
//   rules,
//   errors,
//   startIcon,
//   endIcon,
//   ...props
// }: FormInputProps<TFormValues>): JSX.Element => {
//   const [isFocused, setIsFocused] = useState(false);
//   return (
//     <S.ContainerGeneral>
//       <S.ContainerInput>
//         {startIcon && (
//           <S.StartIcon isFocused={isFocused}>{startIcon}</S.StartIcon>
//         )}
//         {endIcon && <S.EndIcon isFocused={isFocused}>{endIcon}</S.EndIcon>}
//         <S.Input
//           data-testid="input"
//           name={name}
//           startIcon={startIcon}
//           endIcon={endIcon}
//           onBlur={() => setIsFocused(false)}
//           onFocus={() => setIsFocused(true)}
//           {...(register && register(name, rules))}
//           {...props}
//         />
//       </S.ContainerInput>
//       <ErrorMessage
//         errors={errors}
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         name={name as any}
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         render={({ message }: any) => (
//           <S.ErrorMessageValidation>{message}</S.ErrorMessageValidation>
//         )}
//       />
//     </S.ContainerGeneral>
//   );
// };

interface InputTeste extends InputProps {
  label?: string;
  name: string;
  register: any;
  errors: any;
}

export const Input: React.FC<InputTeste> = ({
  label = '',
  name,
  startIcon,
  endIcon,
  register,
  errors,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <S.ContainerGeneral>
      <S.ContainerInput>
        {startIcon && (
          <S.StartIcon isFocused={isFocused}>{startIcon}</S.StartIcon>
        )}
        {endIcon && <S.EndIcon isFocused={isFocused}>{endIcon}</S.EndIcon>}
        <S.Input
          name={name}
          startIcon={startIcon}
          endIcon={endIcon}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          ref={register}
          {...props}
        />
      </S.ContainerInput>
      <ErrorMessage
        errors={errors}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={name as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render={({ message }: any) => (
          <S.ErrorMessageValidation>{message}</S.ErrorMessageValidation>
        )}
      />
    </S.ContainerGeneral>
  );
};
