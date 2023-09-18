import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults(props) {
  return (
    <div className="SearchResults">
      <h2 className="SearchResults-title">Search Results</h2>
      <div className="SearchResults-list">
        <TrackList
          tracks={props.searchResults}
          onAdd={props.onAdd}
          isRemoval={false}
        />
      </div>
    </div>
  );
}

export default SearchResults;




