import { ReactNode } from 'react';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: boolean;
}

export const Input: React.FC<IInput> = ({
  startIcon,
  endIcon,
  error,
  ...restProps
}) => {
  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span>{startIcon}</span>
          </div>
        )}
        <input
          className={`block w-full ${startIcon ? 'pl-9' : 'pl-2.5'} ${
            endIcon ? 'pr-11' : 'pr-2.5'
          } rounded-md bg-zinc-800 ${
            error
              ? 'focus:border-red-300 focus:ring-red-300'
              : 'focus:border-green-500 focus:ring-green-500'
          } placeholder:font-inter placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent focus:ring-1 focus:outline-none focus:ring-offset-zinc-900 sm:text-sm`}
          {...restProps}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span>{endIcon}</span>
          </div>
        )}
      </div>
    </div>
  );
};
