const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/film", async (req, res) => {
  try {
    const komik = await db.Komik.create(req.body);
    res.status(201).json(komik);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/films", async (req, res) => {
  try {
    const komiks = await db.Komik.findAll();
    res.json(komiks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/film:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      return res.status(404).json({ message: "Komik not found" });
    }

    await Komik.update(data);
    res.json({ message: "Komik updated successfully", Komik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/film/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      return res.status(404).json({ message: "Komik not found" });
    }

    await Komik.destroy();
    res.json({ message: "Komik deleted successfully" });
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
