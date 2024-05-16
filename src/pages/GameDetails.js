import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GameDetails.css';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    console.log('Fetching details for game ID:', id); 
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/games/${id}`);
        console.log('Game details:', response.data); 
        setGame(response.data);
      } catch (error) {
        console.error('Failed to fetch game details:', error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div className="game-details">
      <img src={game.imageUrl} alt={game.name} className="game-details-image" />
      <h2>{game.name}</h2>
      <p>{game.description}</p>
      <p>Release Date: {game.releaseDate}</p>
      <p>Type: {game.type}</p>
      <a href={game.website} target="_blank" rel="noopener noreferrer">Visit Game Website</a>
    </div>
  );
}

export default GameDetails;
