import './artistcard.css';
import { useState, useEffect, useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import axios from 'axios';
import placeholderImage from './profile_placeholder.jpg';
import { UserContext } from '../context/User.Context';

function ArtistCard(props) {
  const { imageId, name, bio, style, contributions } = props;
  const [imageUrl, setImageUrl] = useState('');

  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    if (imageId) {
      fetchImage();
    } else {
      setImageUrl(placeholderImage);
    }
  }, [imageId]);

  const username = currentUser.email;
  const password = currentUser.password;
  const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

  const requestConfig = {
    headers: {
        'Authorization': basicAuthHeader,
    },
    responseType: 'arraybuffer'
  };

  const fetchImage = async () => {
    try {
      const port = process.env.API_PORT || 5106
      const response = await axios.get(`http://localhost:${port}/api/images/${imageId}`, requestConfig);
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      setImageUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageUrl(placeholderImage);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const cardClicked = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Card className={`artist-card ${isExpanded ? 'expanded' : ''}`} onClick={cardClicked}>
      
      {isExpanded ? (
          <Image src={imageUrl} alt="Image" width='300' height='300' />
        ) : (
          <Image src={imageUrl} alt="Image" width='200' height='200' />
        )}
      <Card.Content>
        {isExpanded ? (
          <Card.Header id='artistName'>{name}</Card.Header>
        ) : (
          <Card.Header id='artistName'>{truncateText(name, 20)}</Card.Header>
        )}

        {isExpanded ? (
          <Card.Description id="artistBio">{bio}</Card.Description>
        ) : (
          <Card.Description id="artistBio">{truncateText(bio, 50)}</Card.Description>
        )}

        <Card.Meta className='artist-meta'>
          <span>Style: {style}</span>
          <span>Contributions: {contributions}</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default ArtistCard;
