import ReactLottie, {
  LottieProps as ReactLottieProps,
  Options,
} from 'react-lottie';

interface LottieProps extends Omit<ReactLottieProps, 'options'> {
  animationData: string;
  autoplay?: boolean;
  loop?: boolean;
}

export const Lottie: React.FC<LottieProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  ...rest
}) => {
  const defaultOptions: Options = {
    animationData: JSON.parse(animationData),
    autoplay,
    loop,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <ReactLottie options={defaultOptions} {...rest} />;
};
