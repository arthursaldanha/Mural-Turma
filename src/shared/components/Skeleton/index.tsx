import { Wrapper } from './styles';

export interface SkeletonProps {
  type: 'rectangle' | 'circle';
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  type,
  width = '100%',
  height = '100px',
  margin = '0',
  borderRadius = '6px',
}) => {
  return (
    <Wrapper
      type={type}
      width={width}
      height={height}
      margin={margin}
      borderRadius={borderRadius}
    />
  );
};
