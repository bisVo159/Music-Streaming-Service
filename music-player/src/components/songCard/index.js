import React from "react";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";
import "./songCard.css";

export default function SongCard({ album }) {
  console.log("songCard -",album)
  return (
    <div className="songCard-body flex">
      <AlbumImage url={album?.url} />
      <AlbumInfo album={album} />
    </div>
  );
}