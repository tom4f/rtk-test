import React from 'react';
import { isOpenSelector } from '@/store/courses';
import { Video } from './';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

type VideoContainerProps = {
  id: string;
  index: number;
  description: string;
  title: string;
  thumbnail?: string;
};

export const VideoContainer: React.FC<VideoContainerProps> = ({
  id,
  description,
  title,
}) => {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const isOpen = useAppSelector((state) => isOpenSelector(state, slug, id));

  return (
    <>
      <Video id={id} isOpen={isOpen} description={description} title={title} />
    </>
  );
};
