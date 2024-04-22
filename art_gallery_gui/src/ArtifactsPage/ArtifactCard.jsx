import './artifactcard.css'; 
import { useState, useEffect, useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import axios from 'axios';
import placeholderImage from './image_placeholder.png';
import { UserContext } from '../context/User.Context';

function ArtifactCard(props) { 
  const { imageId, name, description, style, artist } = props;
  const [imageUrl, setImageUrl] = useState('');

  const { currentUser } = useContext(UserContext);

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
    <Card className={`artifact-card ${isExpanded ? 'expanded' : ''}`} onClick={cardClicked}> {/* Change class name to 'artifact-card' */}
      
      {isExpanded ? (
          <Image src={imageUrl} alt="Image" width='450' height='400' />
        ) : (
          <Image src={imageUrl} alt="Image" width='350' height='300' />
        )}
      <Card.Content>
        {isExpanded ? (
          <Card.Header id='artifactName'>{name}</Card.Header>
        ) : (
          <Card.Header id='artifactName'>{truncateText(name, 20)}</Card.Header>
        )}

        {isExpanded ? (
          <Card.Description id="artifactBio">{description}</Card.Description>
        ) : (
          <Card.Description id="artifactBio">{truncateText(description, 50)}</Card.Description>
        )}

        <Card.Meta className='artifact-meta'>
          <span>Style: {style}</span>
          <span>Artist: {artist}</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default ArtifactCard;
