const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/film", async (req, res) => {
  try {
    const film = await db.Film.create(req.body);
    res.status(201).json(film);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/films", async (req, res) => {
  try {
    const films = await db.Film.findAll();
    res.json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/film:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Film = await db.Film.findByPk(id);
    if (!Film) {
      return res.status(404).json({ message: "Film not found" });
    }

    await Film.update(data);
    res.json({ message: "Film updated successfully", Film });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/film/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const Film = await db.Film.findByPk(id);
    if (!Film) {
      return res.status(404).json({ message: "Film not found" });
    }

    await Film.destroy();
    res.json({ message: "Film deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // ✅
  }
});

// Jalankan server SETELAH database siap
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
