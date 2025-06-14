import React from "react";
import { BaseElementProps } from "./types";

const VideoElement: React.FC<BaseElementProps> = ({
  styles,
  eventHandlers,
}) => {
  return (
    <div className="w-full" style={styles} {...eventHandlers}>
      <video
        className="w-full h-auto rounded-lg"
        controls
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' fill='%23333'%3E%3Crect width='400' height='225'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='white'%3E▶ Video%3C/text%3E%3C/svg%3E"
      >
        <source src="/placeholder-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoElement;
