import React, { useState, useEffect } from 'react';
import axios from '../../axios.js';

function Row({ title, fetchURL}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      const request = await axios.get(fetchURL);
      console.log(request);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}

export default Row;
