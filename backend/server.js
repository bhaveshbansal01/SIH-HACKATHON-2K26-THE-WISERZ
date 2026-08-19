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
// ===============================
// PROVIDERS / DOCTORS
// Supabase table: doctors
// ===============================

// GET ALL DOCTORS
app.get("/api/doctors", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase doctors error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data || []);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// GET SINGLE DOCTOR
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
        error: "Doctor not found",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// ADD DOCTOR
app.post("/api/doctors", async (req, res) => {
  try {
    const {
      name,
      specialty,
      hospital,
      location,
      status,
    } = req.body;

    if (
      !name ||
      !specialty ||
      !hospital ||
      !location
    ) {
      return res.status(400).json({
        error:
          "Name, specialty, hospital and location are required",
      });
    }

    const { data, error } = await supabase
      .from("doctors")
      .insert([
        {
          name: name.trim(),
          specialty: specialty.trim(),
          hospital: hospital.trim(),
          location: location.trim(),
          status: status || "Active",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase add doctor error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// UPDATE DOCTOR
app.put("/api/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      specialty,
      hospital,
      location,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("doctors")
      .update({
        name: name?.trim(),
        specialty: specialty?.trim(),
        hospital: hospital?.trim(),
        location: location?.trim(),
        status: status || "Active",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update doctor error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// DELETE DOCTOR
app.delete("/api/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("doctors")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete doctor error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// ===============================
// TREATMENTS
// Supabase table: treatments
// ===============================

// GET ALL TREATMENTS
app.get("/api/treatments", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("treatments")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase treatments error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data || []);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// GET SINGLE TREATMENT
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
        error: "Treatment not found",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// ADD TREATMENT
app.post("/api/treatments", async (req, res) => {
  try {
    const {
      name,
      category,
      hospital,
      location,
      status,
    } = req.body;

    if (!name || !category || !hospital || !location) {
      return res.status(400).json({
        error:
          "Name, category, hospital and location are required",
      });
    }

    const { data, error } = await supabase
      .from("treatments")
      .insert([
        {
          name: name.trim(),
          category: category.trim(),
          hospital: hospital.trim(),
          location: location.trim(),
          status: status || "Active",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase add treatment error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// UPDATE TREATMENT
app.put("/api/treatments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      hospital,
      location,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("treatments")
      .update({
        name: name?.trim(),
        category: category?.trim(),
        hospital: hospital?.trim(),
        location: location?.trim(),
        status: status || "Active",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update treatment error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// DELETE TREATMENT
app.delete("/api/treatments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("treatments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete treatment error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.json({
      message: "Treatment deleted successfully",
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});