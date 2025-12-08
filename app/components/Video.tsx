"use client";
import React, { useMemo } from "react";
import YouTube from "react-youtube";
import UseCopy from "../hooks/useCopy";
import Swal from "sweetalert2";
import Image from "next/image";
import CoverSearch from "../assets/YouTube_social_dark.png"; // Adjust the path and filename as needed

interface YouTubeEvent {
  target: { playVideo: () => void };
  data?: number;
}

const Video = ({ select }: { select: string }) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // Set to 1 for autoplay (might be blocked by browsers)
      mute: 0, // Set to 1 to start muted (helps with autoplay restrictions)
      controls: 1, // Show player controls
      rel: 0, // Show related videos from same channel only
      modestbranding: 1, // Reduce YouTube branding
      showinfo: 0,
      fs: 1, // Allow fullscreen
    },
  };

  // Event handlers
  const onReady = (): void => {
    // Access to player in all event handlers via event.target
    console.log("Player is ready");
    // You can store the player instance if needed
    // const player = event.target;
  };

  const onPlay = (): void => {
    console.log("Video is playing");
  };

  const onPause = (): void => {
    console.log("Video is paused");
  };

  const onEnd = (): void => {
    console.log("Video ended");
  };

  const onError = (error: YouTubeEvent): void => {
    console.error("YouTube Player Error:", error);
    Swal.fire({
      icon: "error",
      title: "Playback Error",
      text: "An error occurred while trying to play the video. Please try again later.",
    });
  };

  const youtubeLink = useMemo(
    () => `https://www.youtube.com/watch?v=${select}`,
    [select]
  );

  const handleCopyLink = async () => {
    await UseCopy(youtubeLink);
  };

  return (
    <div className="flex flex-col items-center w-full mt-10">
      {select === "" ? (
        <div className="lg:w-[800px] max-md:w-[85%] border-6 border-white bg-[#282828]">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <Image
              src={CoverSearch}
              alt="thumbnail"
              fill
              sizes="(min-width:1024px) 800px, 85vw"
              style={{ objectFit: "cover" }}
              className=""
            />
          </div>
        </div>
      ) : (
        <>
          <div className="lg:w-[800px] max-md:w-[85%] border-6 border-white">
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <YouTube
                videoId={select}
                opts={opts}
                onReady={onReady}
                onPlay={onPlay}
                onPause={onPause}
                onEnd={onEnd}
                onError={onError}
                className="youtube-player absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-around gap-5 mt-5">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 cursor-pointer transition-all bg-blue-500 text-white hover:bg-white lg:text-3xl max-md:text-xl hover:text-blue-500 rounded"
            >
              Copy Link
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Video;
