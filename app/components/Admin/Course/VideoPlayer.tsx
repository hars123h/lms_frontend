"use client";
import React, { FC, useRef, useState } from "react";

import ReactPlayer from "react-player";

type Props = {};

const VideoPlayer: FC<Props> = () => {
  const player = useRef<ReactPlayer>(null);

  
  return (
    <>
      <ReactPlayer
        ref={player}
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        controls
        width="640"
        height="360"
      />
     
     
    </>
  );
};

export default VideoPlayer;
