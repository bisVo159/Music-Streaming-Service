import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
// import apiClient from "../spotify";
import SongCard from "../components/songCard";
import Queue from "../components/queue";
import AudioPLayer from "../components/audioPlayer";
// import Widgets from "../components/widgets";
import axios from "axios";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      if(window.localStorage.getItem("page")==="playlist"){
        axios
        .get("http://localhost:5000/api/playlistSongs/" + location.state?.id )
        .then((res) => {
          console.log(res.data.data)
          const ids=res.data.data.map((id)=>id.SongID )
          console.log("ids -> ",ids)
          axios
          .get(`http://localhost:5000/api/songs`)
          .then((res)=>{
            console.log('response', res.data.data)
            let data=res.data.data.filter(data=>ids.includes(data.SongID))
            console.log("data -> ",data)
            console.log("currentTrack -> ",data[0])
            setTracks(data);
            setCurrentTrack(data[currentIndex]);
            setLoading(false);
          })
        });
      }
      else{
        axios
        .get("http://localhost:5000/api/songs/" + location.state?.id )
        .then((res) => {
          console.log("song page ",res.data.data)
          setCurrentTrack(res.data.data);
          axios
          .get(`http://localhost:5000/api/songs`)
          .then((res)=>{
            console.log('response', res.data.data)
            console.log("data -> ",res.data.data)
            setTracks(res.data.data);
            setLoading(false);
          })  
        })
        .catch(error => {
          if (error.response) {
            // The request was made, but the server responded with a status code that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        })
        ;
      }
    
    }
  }, [location.state]);

  useEffect(() => {
    if (tracks.length > 0)
    setCurrentTrack(tracks[currentIndex]);
  }, [currentIndex]);

  // console.log(location)
  return (
    <div className='screen-container'>
    {
      loading?(
        <p>Loading</p>
      ):(<div className='screen-container'>
             <div className="left-player-body">
        <AudioPLayer
            currentTrack={currentTrack}
            total={tracks}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />

        {/* <Widgets artistID={currentTrack?.album?.artists[0]?.id} /> */}
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
        </div>
      )
    }
    </div>
  )
}
