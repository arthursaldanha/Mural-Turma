import { IloadingButton } from '@develop-fapp/ui-kit-fapp/dist/types';

const animationLoadOptions = (
  isLoading: boolean | undefined,
  isSuccess: boolean | undefined,
  isError: boolean | undefined,
  side: 'left' | 'right' = 'left',
): IloadingButton => {
  const typeAnimation = isSuccess ? 'success' : isError ? 'error' : 'loading';

  return {
    play: isLoading || isSuccess || isError || false,
    side,
    typeAnimation,
  };
};

export { animationLoadOptions };
