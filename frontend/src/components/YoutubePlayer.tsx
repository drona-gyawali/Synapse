import React from 'react';
import { getYoutubeId } from '../utils/utils';

interface YoutubePlayerProps {
  videoUrl: string;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoUrl }) => {
  const videoId = getYoutubeId(videoUrl);
  if (!videoId)
    return (
      <a className="text-blue-600 underline" href={videoUrl}>
        Links is not responding.. click here?{' '}
      </a>
    );
  return (
    <>
      <iframe
        className="pt-4 rounded-xl"
        width="369"
        height="350"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </>
  );
};
