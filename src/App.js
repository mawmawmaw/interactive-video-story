import React, { useEffect, useRef, useState } from 'react'
import './App.css';

import orange from './videos/orange.mp4';
import red from './videos/red.mp4';
import yellow from './videos/yellow.mp4';
import purple from './videos/purple.mp4';
import pink from './videos/pink.mp4';
import blue from './videos/blue.mp4';
import green from './videos/green.mp4';

import storyTree from './videoStoryTree.json';

const App = () => {

  const video = useRef('video')

  const [currentVideoId, setCurrentVideoId] = useState(orange);
  const [isPlaying,setIsPlaying] = useState(false);
  const [optionsDisplayTime, setOptionsDisplayTime] = useState(0)
  const [nextVideoId, setNextVideoId] = useState('');
  const [counterId, setCounterId] = useState('');

  const handleWelcome = () =>{
    document.querySelector(".welcome-message").style.display = 'none';
    video.current.play();
    setIsPlaying(true);
    document.querySelector("#video").addEventListener("ended", ()=>{
      setIsPlaying(false);
    });
  }

  useEffect(()=>{
    if(!isPlaying && nextVideoId!==""){
      setCurrentVideoId(nextVideoId);
      setNextVideoId('');
      setIsPlaying(true);
    }
  },[isPlaying,nextVideoId])

  //eslint-disable-next-line
  useEffect(()=>{
    setOptionsDisplayTime(video.current.duration-10)
  });

  useEffect(()=>{
    if(isPlaying && optionsDisplayTime > 0){
      let id = setTimeout(()=>{
        document.querySelector(".options-container").animate([
          { transform: 'translateY(180px)' },
          { transform: 'translateY(0px)' }
        ],
          {
            duration: 1000,
            fill: 'forwards'
          }
        )
      },optionsDisplayTime*1000)
      setCounterId(id);
    }
  },[isPlaying,optionsDisplayTime]);

  const handleNextVideoFile = (id) => {
    switch(id){
      case 'orange':
        setNextVideoId(orange);
        break;
      case 'red':
        setNextVideoId(red);
        break;
      case 'yellow':
        setNextVideoId(yellow);
        break;
      case 'purple':
        setNextVideoId(purple);
        break;
      case 'pink':
        setNextVideoId(pink);
        break;
      case 'blue':
        setNextVideoId(blue);
        break;
      case 'green':
        setNextVideoId(green);
        break;
      default:
        setNextVideoId('');
    }    
  }

  const handleNextVideo = (e) => {
    clearTimeout(counterId);
    document.querySelectorAll(".option").forEach((o)=>{
      o.children[0].disabled = true;
    })
    document.querySelector(".options-container").animate([
      { transform: 'translateY(0px)' },
      { transform: 'translateY(180px)' }
    ],
      {
        duration: 1000,
        fill: 'forwards'
      }
    )
    console.log(e.target.value);
    handleNextVideoFile(e.target.value);
  }


  const showVideoOptions = () => {
    let videoOption = currentVideoId.split("/static/media/")[1].split(".")[0];
    let videoOptions = storyTree.videos.filter(v=>{
      return v.id===videoOption
    })[0].nextVideoOptions;

    console.log(videoOptions);
    console.log(storyTree.videos[0].id);

    document.querySelectorAll(".option").forEach((o)=>{
      o.children[0].disabled = false;
    })

    return videoOptions.map(v=>{
      return (
        <div key={v} className="option">
          <button value={v} onClick={handleNextVideo}>{v}</button>
        </div>
      )
    })
  }

  return (
    <div className="App">
        <div className="live-data">
            <div>current video: {currentVideoId}</div>
            <div>next video: {nextVideoId}</div>
            <div>optionsDisplayTime: {optionsDisplayTime}</div>
            <div>is playing: {isPlaying?1:0}</div>
        </div>
        <div className="welcome-message">
          <h1>Welcome to this interactive story</h1>
          <button onClick={handleWelcome}>Start</button>
        </div>
        <div className="video-container">
            <video ref={video} id="video" src={currentVideoId} autoPlay/>
        </div>
        <div className="options-container">
          {showVideoOptions()}
        </div>
    </div>
  );

}

export default App;
