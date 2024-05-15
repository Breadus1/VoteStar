import React from 'react';

function GameCard({ game, onVote }) {
  return (
    <div>
      <img src={game.imageUrl} alt={game.name} style={{ width: '100px', height: '100px' }} />
      <h3>{game.name}</h3>
      <p>{game.description}</p>
      <button onClick={onVote}>Vote</button>
    </div>
  );
}

export default GameCard;
