import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';

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
      {games.map(game => (
        <GameCard key={game._id} game={game} onVote={() => handleVote(game._id)} />
      ))}
    </div>
  );
}

function handleVote(gameId) {
  axios.post(`http://localhost:5000/api/games/vote/${gameId}`)
    .then(response => {
      alert('Thank you for voting!');
    })
    .catch(error => {
      console.error('Voting failed:', error);
      alert('Failed to submit your vote.');
    });
}

export default VotingPanel;
