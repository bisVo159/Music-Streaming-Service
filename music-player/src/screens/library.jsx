import React, { useEffect ,useState} from 'react'
import '../shared/globalStyle.css'
// import apiClient from '../spotify'
import './library.css'
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Library() {
  const [playlists, setPlaylists] = useState(null)

useEffect(()=>{
  axios.get("http://localhost:5000/api/playlists").then(function (response) {
    console.log(response.data.data)
    setPlaylists(response.data.data);
  })
  .catch(error => console.error(error));
},[])

const navigate = useNavigate();
const playPlaylist = (id) => {
  navigate("/player", {
                                           state: { id: id } 
                                          });
  localStorage.setItem("page", "playlist");
};
  return (
    <div className='screen-container'>
      <div className='library-body'>
            {
                  playlists?playlists.map((playlist,index)=>
                     (
                     <div key={index}
                      className='playlist-card'
                      onClick={() => playPlaylist(playlist.PlaylistID)}
                      >
                          <img
                              src={playlist.url}
                              className="playlist-image"
                              alt="Playlist-Art"
                            />
                          <p className="playlist-title">{playlist.Title}</p>
                          <p className="playlist-subtitle">{playlist.totalSongs} Songs</p>
                          <div className="playlist-fade">
                                  <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                                    <AiFillPlayCircle />
                                  </IconContext.Provider>
                          </div>
                      </div>
                     )
                  ):<p className='loading'>Loading....</p>
            }
      </div>

    </div>
  )
}
