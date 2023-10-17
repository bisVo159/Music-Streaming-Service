import React from "react";
import "./albumInfo.css";

export default function AlbumInfo({ album }) {
  console.log(album)
  // const artists = [];
  // album?.artists?.forEach((element) => {
  //   artists.push(element.name);
  // });

  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="marquee">
          <p>{album?.Title + " - " + album?.thumbnail}</p>
        </div>
      </div>
      <div className="album-info">
        <p>{`${album?.Title} is an ${album?.Album} by ${album?.thumbnail} with 3 track(s)`}</p>
      </div>
      <div className="album-release">
        <p>Release Date: {album?.ReleaseYear}</p>
      </div>
    </div>
  );
}