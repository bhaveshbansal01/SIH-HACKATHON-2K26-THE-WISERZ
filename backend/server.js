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

app.get("/api/appointments", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("id", { ascending: false });

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

app.get("/api/doctors", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("doctors")
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

app.get("/api/treatments", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("treatments")
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

app.get("/api/treatments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("treatments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return res.status(404).json({
        error: "Treatment not found"
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

app.get("/api/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return res.status(404).json({
        error: "Doctor not found"
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

app.get("/api/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("hospitals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return res.status(404).json({
        error: "Hospital not found"
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

app.post("/api/appointments", async (req, res) => {
  try {
    const {
      patient_name,
      doctor_name,
      date,
      hospital_name,
      treatment_name,
      patient_email,
      patient_phone
    } = req.body;

    // Required field validation
    if (
      !patient_name ||
      !doctor_name ||
      !date ||
      !hospital_name ||
      !treatment_name ||
      !patient_email ||
      !patient_phone
    ) {
      return res.status(400).json({
        error: "All appointment details are required"
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(patient_email)) {
      return res.status(400).json({
        error: "Please enter a valid email"
      });
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(patient_phone)) {
      return res.status(400).json({
        error: "Please enter a valid 10-digit phone number"
      });
    }

    // Save appointment to Supabase
    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          patient_name,
          doctor_name,
          date,
          hospital_name,
          treatment_name,
          patient_email,
          patient_phone,
          status: "Pending"
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