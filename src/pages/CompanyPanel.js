import React, { useState } from "react";
import axios from "axios";

function CompanyPanel() {
  const [company, setCompany] = useState({
    name: "",
    website: "",
    email: "",
    password: "",
  });
  const [game, setGame] = useState({
    name: "",
    website: "",
    type: "",
    releaseDate: "",
    description: "",
    image: null,
  });

  const handleCompanyChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleGameChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setGame({ ...game, image: files[0] });
    } else {
      setGame({ ...game, [name]: value });
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/companies",
        company
      );
      console.log("Company registered:", response.data);
    } catch (error) {
      console.error("Failed to register company:", error);
    }
  };

  const handleGameSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(game).forEach(([key, value]) => formData.append(key, value));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/games",
        formData
      );
      console.log("Game added:", response.data);
    } catch (error) {
      console.error("Failed to add game:", error);
    }
  };

  return (
    <div>
      <h2>Company Registration</h2>
      <form onSubmit={handleCompanySubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleCompanyChange}
            required
          />
        </label>
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={company.website}
            onChange={handleCompanyChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={company.email}
            onChange={handleCompanyChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={company.password}
            onChange={handleCompanyChange}
            required
          />
        </label>
        <button type="submit">Register Company</button>
      </form>

      <h2>Add a Game</h2>
      <form onSubmit={handleGameSubmit}>
        <label>
          Game Name:
          <input
            type="text"
            name="name"
            value={game.name}
            onChange={handleGameChange}
            required
          />
        </label>
        <label>
          Game Website:
          <input
            type="text"
            name="website"
            value={game.website}
            onChange={handleGameChange}
            required
          />
        </label>
        <label>
          Game Type:
          <input
            type="text"
            name="type"
            value={game.type}
            onChange={handleGameChange}
            required
          />
        </label>
        <label>
          Release Date:
          <input
            type="date"
            name="releaseDate"
            value={game.releaseDate}
            onChange={handleGameChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={game.description}
            onChange={handleGameChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleGameChange}
            required
          />
        </label>
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default CompanyPanel;
