import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = Intl.NumberFormat(undefined, {
  notation: "compact",
});

/**
 * Renders a single video grid item.
 *
 * @param id - The ID of the video.
 * @param title - The title of the video.
 * @param channel - The channel information.
 * @param views - The number of views.
 * @param postedAt - The time when the video was posted.
 * @param duration - The duration of the video.
 * @param thumbnailUrl - The URL of the video thumbnail.
 * @param videoUrl - The URL of the video.
 */
export default function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      {/* Video Link */}
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        {/* Video Thumbnail */}
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover rounded-xl ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          } transition-[border-radius] duration-200`}
          alt=""
        />
        {/* Video Duration */}
        <div
          className="absolute bottom-1 right-1 bg-secondary-darker
          text-secondary text-sm px-0.5 rounded"
        >
          {formatDuration(duration)}
        </div>
        {/* Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200
            ${isVideoPlaying ? "opacity-100" : "opacity-0"} delay-200`}
        />
      </a>
      {/* Channel Info */}
      <div className="flex gap-2">
        {/* Channel Profile */}
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </a>
        <div className="flex flex-col">
          {/* Video Title */}
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          {/* Channel Name */}
          <a href={`/@${channel.id}}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          {/* View Count */}
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
