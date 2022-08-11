import { LottieProps } from 'react-lottie';

import animationData from '@/assets/animations/spinner.json';

import { Lottie } from '../Lottie';

export const Spinner: React.FC<Omit<LottieProps, 'options'>> = ({
  ...props
}) => <Lottie animationData={JSON.stringify(animationData)} {...props} />;
