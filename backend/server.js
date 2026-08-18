require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.json({
    message: "MediIndia Care backend is running"
  });
});

// GET all hospitals
app.get("/api/hospitals", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("hospitals")
      .select("*");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: error.message
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message
    });
  }
});

// ADD a hospital
app.post("/api/hospitals", async (req, res) => {
  try {
    const { name, city, specialty, address, image } = req.body;

    if (!name || !city || !specialty) {
      return res.status(400).json({
        error: "Name, city and specialty are required"
      });
    }

    const { data, error } = await supabase
      .from("hospitals")
      .insert([
        {
          name,
          city,
          specialty,
          address: address || "",
          image: image || ""
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: error.message
      });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});