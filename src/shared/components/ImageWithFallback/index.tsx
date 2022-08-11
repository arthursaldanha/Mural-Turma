import { useEffect, useState } from 'react';

import Image, { ImageProps } from 'next/image';

interface IImageWithFallback extends ImageProps {
  fallback: string;
}

export const ImageWithFallback = ({
  src,
  fallback,
  ...rest
}: IImageWithFallback): JSX.Element => {
  const [imgSrc, set_imgSrc] = useState(src);

  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onLoadingComplete={result => {
        if (result.naturalWidth === 0) {
          set_imgSrc(fallback);
        }
      }}
      onError={() => {
        set_imgSrc(fallback);
      }}
    />
  );
};
