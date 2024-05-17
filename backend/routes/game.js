const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  console.log("POST /api/games/");
  const { name, website, type, releaseDate, description, company } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  try {
    const game = new Game({
      name,
      website,
      type,
      releaseDate,
      description,
      imageUrl,
      company,
    });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  console.log("GET /api/games/");
  try {
    const games = await Game.find().populate("company", "name");
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  console.log(`GET /api/games/${req.params.id}`);
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      console.log("Game not found");
      return res.status(404).json({ message: "Game not found" });
    }
    console.log("Game details:", game);
    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/vote/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    game.votes += 1;
    await game.save();
    res.status(200).json({ message: "Vote counted", votes: game.votes });
  } catch (error) {
    console.error("Error voting for game:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
