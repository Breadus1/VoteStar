import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GameDetails.css";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    console.log("Fetching details for game ID:", id);
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/games/${id}`
        );
        console.log("Game details:", response.data);
        setGame(response.data);
        setVotes(response.data.votes);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch game details:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleVote = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/games/vote/${id}`
      );
      console.log("Vote response:", response.data);
      setVotes(response.data.votes);
    } catch (error) {
      console.error("Failed to vote for game:", error);
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div>Failed to load game details. Please try again later.</div>;

  return (
    <div className="game-details">
      <img src={game.imageUrl} alt={game.name} className="game-details-image" />
      <h2>{game.name}</h2>
      <p>{game.description}</p>
      <p>Release Date: {game.releaseDate}</p>
      <p>Type: {game.type}</p>
      <a href={game.website} target="_blank" rel="noopener noreferrer">
        Visit Game Website
      </a>
      <div>
        <p>Votes: {votes}</p>
        <button onClick={handleVote}>Vote</button>
      </div>
    </div>
  );
}

export default GameDetails;
