import React, { Component } from 'react';
import bgMusic from "../assets/mp3/bgMusic.mp3"

const AudioPlayer = () => {
    return (
        <div>
        <audio src={bgMusic} controls autoPlay/>
      </div>
    );
}

export default AudioPlayer;
