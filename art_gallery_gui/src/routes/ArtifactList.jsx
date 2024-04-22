import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../HomepageComponents/Header'; 
import ArtifactCard from '../ArtifactsPage/ArtifactCard'; 
import { UserContext } from '../context/User.Context';
import TopicHeading from '../TopicHeading';

function ArtifactList({ isLoggedIn }) { 
  const [artifacts, setArtifacts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetchArtifacts();
  }, [searchQuery]);

  const fetchArtifacts = async () => {
    try {
      const port = process.env.API_PORT || 5106
      const response = await axios.get(`http://localhost:${port}/api/artifacts`, {
        auth: {
          username: currentUser.email,
          password: currentUser.password
        }
      });
      setArtifacts(response.data);
    } catch (error) {
      console.error('Error fetching artifacts:', error);
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredArtifacts = artifacts.filter((artifact) => { 
    const query = searchQuery.toLowerCase();
    const name = artifact.name.toLowerCase(); 
    const description = artifact.description ? artifact.description.toLowerCase() : ''; 
    const style = artifact.style ? artifact.style.toLowerCase() : ''; 

    return (
      name.includes(query) ||
      description.includes(query) || 
      style.includes(query)
    );
  });

  return (
    <div>
      <Header loggedIn={true} />
      <TopicHeading text='Featured Artifacts'/>
      <div className="card-container">
        {filteredArtifacts.map((artifact) => ( 
          <ArtifactCard key={artifact.id} name={artifact.name} description={artifact.description} style={artifact.style} artist={artifact.artist} imageId={artifact.imageId}/> 
        ))}
      </div>
    </div>
  );
}

export default ArtifactList;
