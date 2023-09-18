// App.js
import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
//import TrackList from './components/TrackList/TrackList';


// Import the Spotify module
import Spotify from './utilities/Spotify'

// Define a custom hook to reset the playlist name state
function useResetPlaylistName(playlistTracks) {
  const [playlistName, setPlaylistName] = useState('My Playlist'); // State for playlist name

  // Use useEffect hook to reset the playlist name state whenever the playlist tracks state changes
  useEffect(() => {
    setPlaylistName('My Playlist'); // Reset the playlist name to the default value
    console.log('Playlist name reset to default'); // Add a console log message
  }, [playlistTracks]); // Run the effect only when the playlistTracks state changes

  return [playlistName, setPlaylistName]; // Return the state and the setter function
}

function App() {
  const [searchResults, setSearchResults] = useState([]); // State for search results data
  const [playlistTracks, setPlaylistTracks] = useState([]); // State for playlist tracks data
  const [addedTrackIds, setAddedTrackIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState(null); // State for save error

  // Use the custom hook to reset the playlist name state
  const [playlistName, setPlaylistName] = useResetPlaylistName(playlistTracks);

  // Define a useRef hook to store a reference to an abort controller
  const abortControllerRef = useRef(null);

  // Define the onSearch function
  const handleSearch = (searchTerm) => {
    // Check if there is an existing abort controller and cancel it
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      console.log('Previous API call aborted'); // Add a console log message
    }

    // Create a new abort controller and store it in the ref
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Use a setTimeout function to delay the API call by 500 milliseconds
    setTimeout(() => {
      Spotify.search(searchTerm, signal).then((searchResults) => {
        // Update the state with the search results
        setSearchResults(searchResults);
        console.log('Search results updated'); // Add a console log message
      }).catch(error => {
        // Handle errors, display an error message to the user
        if (error.name === 'AbortError') {
          console.log('API call aborted by user'); // Add a console log message
        } else {
          console.error('Error fetching search results:', error); // Add a console log message
          // You can add error handling and user feedback here if needed
        }
      });
    }, 500); // Delay the API call by 500 milliseconds

  };
  
  useEffect(() => {
    // Simulate fetching data asynchronously (replace with actual API calls)
    setTimeout(() => {
      const fetchedData = [
        // Actual data fetched from API
      ];
      setSearchResults(fetchedData); // Update searchResults state
      setLoading(false); // Set loading to false when data is fetched
      console.log('Data fetched'); // Add a console log message
    }, 2000); // Simulate a 2-second delay
  }, []);
  
  // Memoized functions for handling search and playlist functionality
  const handleAddTrack = useCallback((track) => {
    // Check if the track ID is not already in the addedTrackIds array
    if (!addedTrackIds.includes(track?.id)) {
      // Logic to add the selected track to the playlist
      const updatedPlaylist = [...playlistTracks, track];
      setPlaylistTracks(updatedPlaylist);
  
      // Update the addedTrackIds state
      setAddedTrackIds([...addedTrackIds, track?.id]);

      // Use the filter method to create a new array of search results that does not include the track
      const updatedSearchResults = searchResults.filter(
        (t) => t.id !== track?.id
      );
      // Update the searchResults state with the new array
      setSearchResults(updatedSearchResults);

      console.log('Track added to playlist'); // Add a console log message
    }
  }, [addedTrackIds, playlistTracks, searchResults, setPlaylistName ]); // Include setPlaylistName in the dependency array

  const handleRemoveTrack = useCallback((track) => {
    // Logic to remove the selected track from the playlist
    const updatedPlaylist = playlistTracks.filter((t) => t.id !== track?.id);
    setPlaylistTracks(updatedPlaylist);

    // Update the addedTrackIds state by removing the track ID
    setAddedTrackIds(addedTrackIds.filter((id) => id !== track?.id));

    // Use the spread operator to create a new array of search results that includes the track
    const updatedSearchResults = [...searchResults, track];
    // Update the searchResults state with the new array
    setSearchResults(updatedSearchResults);

    console.log('Track removed from playlist'); // Add a console log message
  }, [addedTrackIds, playlistTracks, searchResults, setPlaylistName ]); // Include setPlaylistName in the dependency array

  const handleChangePlaylistName = useCallback((newName) => {
    // Logic to change the playlist name
    setPlaylistName(newName);
    console.log('Playlist name changed'); // Add a console log message
  }, []);

   // Updated function to save the playlist
  const handleSavePlaylist = useCallback(() => {
    if (!Spotify.isLoggedIn()) {
      // If the user is not logged in, redirect to Spotify authorization
      Spotify.getAccessToken();
      return;
    }

    if (playlistTracks.length === 0) {
      // Check if the playlist is empty, and display an error
      setSaveError("Playlist is empty. Add tracks before saving.");
      return;
    }

    if (playlistName === "My Playlist") {
      // Check if the playlist name is still the default name
      setSaveError("Please change the playlist name before saving.");
      return;
    }

    // Clear any previous save errors
    setSaveError(null);

    Spotify.savePlaylist(playlistName, playlistTracks.map(track => track.uri))
      .then(() => {
        // Clear the playlist or provide feedback to the user
        setPlaylistName('My Playlist');
        setPlaylistTracks([]);
        // You can add more user feedback here if needed
      })
      .catch(error => {
        // Handle errors, display an error message to the user
        console.error('Error saving playlist:', error);
        // You can add error handling and user feedback here if needed
      });
  }, [playlistName, playlistTracks]);


  return (
    <div
      className="App">
      <h1>Jammming</h1>
      <div className="App-search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="App-content">
        <div className="App-search-results">
          <SearchResults
            searchResults={searchResults}
            onAdd={handleAddTrack}
            isRemoval={false}
          />
        </div>
        <div className="App-playlist">
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={handleRemoveTrack}
            onNameChange={handleChangePlaylistName}
            onSave={handleSavePlaylist}
            isRemoval={true}
          />
          {saveError && <div className="error-message">{saveError}</div>}
        </div>
      </div>
    </div>
  );
  
}

export default App;
