import React from 'react'
import "./queue.css"

export default function Queue({ tracks, setCurrentIndex }) {
  return (
    <div className="queue-container">
      <div className="queue">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={index + "key"}
              className="queue-item"
              onClick={() => setCurrentIndex(index)}
            >
              <p className="track-name">{track?.Title}</p>
              <p>0:{track.DurationInSeconds}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
