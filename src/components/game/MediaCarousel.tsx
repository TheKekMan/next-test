import React from "react";
import ImageGallery from "react-image-gallery";

import { IScreenshot } from "../../store/games/game.types";

const showVideo = (videoId) => (
  <iframe
    width="100%"
    height="530px"
    src={
      `https://www.youtube.com/embed/${videoId}` +
      "?autoplay=0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3"
    }
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);

const MediaCarousel = ({ screenshots, videos }) => {
  const items = videos.map((video) => ({
    thumbnail: `https://img.youtube.com/vi/${video.video_id}/0.jpg`,
    renderItem: showVideo.bind(this, video.video_id),
  }));
  items.push(
    ...screenshots.map((item: IScreenshot) => ({
      original: item.url.replace("thumb", "1080p"),
      thumbnail: item.url.replace("thumb", "screenshot_med"),
    }))
  );
  return (
    <ImageGallery
      items={items}
      showPlayButton={false}
      showNav={false}
      showFullscreenButton={false}
    />
  );
};

export default MediaCarousel;
