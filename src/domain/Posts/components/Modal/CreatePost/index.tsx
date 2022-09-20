import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import styled from 'styled-components';

import { Input } from '@/shared/components/Input';
import { Modal } from '@/shared/components/Modal';

interface IModalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

const Wrapper = styled.div`
  width: 585px;
`;

export const CreatePost = ({ isOpen, onClose }: IModalCreatePostProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper className="w-[585px] max-w-full p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange } }) => {
                return (
                  <>
                    <Input
                      type="text"
                      placeholder="Título da publicação"
                      autoComplete="off"
                      onChange={onChange}
                      error={!!errors?.title?.message}
                    />
                    {errors?.title && (
                      <div className="mt-2 ml-2 text-sm text-red-300 font-inter font-medium leading-4">
                        {errors?.title?.message}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>

          <div className="mb-4">
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange } }) => {
                return (
                  <>
                    <textarea
                      className="min-w-[304px] w-full min-h-[112px] placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none resize-none placeholder:font-inter scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                      placeholder="Mensagem"
                      onChange={onChange}
                    />
                    {errors?.content && (
                      <div className="mt-2 ml-2 text-sm text-red-300 font-inter font-medium leading-4">
                        {errors?.content?.message}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>
        </form>
      </Wrapper>
    </Modal>
  );
};
