// TrackList.js
import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList(props) {
  if (!props.tracks) {
    return null; // or some alternative content or handling
  }
  return (
    <div className="TrackList">
      {props.tracks.map(track => (
        <Track
          key={track.id} // Use key prop
          track={track}
          onAdd={props.onAdd} // Pass onAdd prop
          onRemove={props.onRemove} // Pass onRemove prop
          isRemoval={props.isRemoval} // Pass isRemoval prop
        />
      ))}
    </div>
  );
}

export default TrackList;



