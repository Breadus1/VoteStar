import React from 'react';

function GameCard({ game, onVote }) {
  return (
    <div className="game-card">
      <img src={game.imageUrl} alt={game.name} className="game-image" />
      <h3>{game.name}</h3>
      <button onClick={onVote}>Vote</button>
    </div>
  );
}

export default GameCard;
