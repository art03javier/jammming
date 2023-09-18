import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const [term, setTerm] = useState('');

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const search = () => {
    props.onSearch(term);
  };

  return (
    <div className="SearchBar">
      <input type="text"
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={search}>Search</button>
    </div>
  );
}

export default SearchBar;
