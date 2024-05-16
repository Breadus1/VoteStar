import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VotingPanel.css';

function VotingPanel() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h2>Vote on Your Favorite Games!</h2>
      <div className="games-container">
        {games.map(game => (
          <div key={game._id} className="game-card">
            <img src={game.imageUrl} alt={game.name} className="game-image" />
            <h3>{game.name}</h3>
            <Link to={`/game/${game._id}`}>
              <button>Więcej</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotingPanel;
