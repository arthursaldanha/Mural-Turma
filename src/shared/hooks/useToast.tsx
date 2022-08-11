import { IToastProps } from '../components/Toast';
import { useToastContext } from '../contexts/ToastContext';

export const useToast = () => {
  const { onShowToast, setProps } = useToastContext();

  const toast = ({ ...props }: IToastProps) => {
    onShowToast();
    setProps(props);
  };

  const defaultErrorToast = () => {
    onShowToast();
    setProps({
      type: 'error',
      title: 'Erro',
      subTitle: 'Ocorreu um problema com o servidor!',
    });
  };

  return { toast, defaultErrorToast };
};
