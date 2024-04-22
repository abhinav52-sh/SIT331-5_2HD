import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../HomepageComponents/Header'; 
import ArtistCard from '../ArtistsPage/ArtistCard'; 
import { UserContext } from '../context/User.Context'
import Heading from '../TopicHeading'

function ArtistList({isloggedIn}) {
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    fetchArtists();
  }, [searchQuery]);

  const fetchArtists = async () => {
    try {
      const port = process.env.API_PORT || 5106
      const response = await axios.get(`http://localhost:${port}/api/artists`,{auth: {
        username: currentUser.email,
        password: currentUser.password
    }});
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredArtists = artists.filter((artist) => {
    const query = searchQuery.toLowerCase();
    const name = artist.name.toLowerCase();
    const bio = artist.bio ? artist.bio.toLowerCase() : '';
    const style = artist.style ? artist.style.toLowerCase() : '';

    return (
      name.includes(query) ||
      bio.includes(query) ||
      style.includes(query)
    );
  });

  return (
    <div>
      <Header loggedIn={true} />
      <Heading text='Featured Artists'/>
      <div className="card-container">
        {filteredArtists.map((artist) => (
          <ArtistCard key={artist.id} name={artist.name} bio={artist.bio} style={artist.style} contributions={artist.contributions} imageId={artist.imageId}/>
        ))}
      </div>
    </div>
  );
}

export default ArtistList;
