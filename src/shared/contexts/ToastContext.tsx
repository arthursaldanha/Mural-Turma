import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { IToastProps, Toast } from '../components/Toast';

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastContextData {
  isStarted: boolean;
  onShowToast: () => void;
  setProps: Dispatch<SetStateAction<IToastProps>>;
}

const ToastContext = createContext({} as ToastContextData);

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [props, setProps] = useState<IToastProps>({} as IToastProps);

  const onShowToast = useCallback(() => {
    setIsStarted(true);

    setTimeout(() => {
      setIsStarted(false);
      setProps({} as IToastProps);
    }, 6000);
  }, []);

  const value = useMemo(() => {
    return {
      isStarted,
      onShowToast,
      setProps,
    };
  }, [isStarted, onShowToast, setProps]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {isStarted && <Toast {...props} />}
    </ToastContext.Provider>
  );
};
