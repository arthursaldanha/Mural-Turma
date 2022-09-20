import React from 'react';

interface IAvatar {
  image: string;
}

export const Avatar = ({ image }: IAvatar) => {
  return (
    <span className="inline-block relative">
      <img className="h-8 w-8 rounded-full" src={image} alt="" />
      <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
    </span>
  );
};
