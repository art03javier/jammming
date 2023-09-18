// Track.js
import React from 'react';
import './Track.css';

function Track(props) {
  const addTrack = () => {
    props.onAdd(props.track); // Invoke onAdd method
  };

  const removeTrack = () => {
    props.onRemove(props.track); // Invoke onRemove method
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {props.isRemoval ? (
        <button className="Track-action" onClick={removeTrack}>
          - {/* Show "-" button */}
        </button>
      ) : (
        <button className="Track-action" onClick={addTrack}>
          + {/* Show "+" button */}
        </button>
      )}
    </div>
  );
}

export default Track;









