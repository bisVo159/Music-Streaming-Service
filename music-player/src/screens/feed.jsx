import React, { useEffect ,useState} from 'react'
import '../shared/globalStyle.css'
import './library.css'
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Feed() {
  const [songs, setSongs] = useState(null)

  useEffect(()=>{
    axios.get("http://localhost:5000/api/songs").then(function (response) {
      console.log(response.data.data)
      setSongs(response.data.data);
    })
    .catch(error => console.error(error));
  },[])

  const navigate = useNavigate();
  const playSong = (id) => {
    navigate("/player", { state: { id: id }});
    localStorage.setItem("page", "home");
  };
  return (
    <div className='screen-container'>
    <div className='library-body'>
          {
                songs?songs.map((song,index)=>
                   (
                   <div key={index}
                    className='playlist-card'
                    onClick={() => playSong(song.SongID)}
                    >
                        <img
                            src={song.url}
                            className="playlist-image"
                            alt="Playlist-Art"
                          />
                        <p className="playlist-title">{song.Title}</p>
                        <p className="playlist-subtitle">Album: {song.Album}</p>
                        <p className="playlist-subtitle">Singer: {song.thumbnail}</p>
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

  </div>)
}
