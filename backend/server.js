require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// SUPABASE
// ===============================

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ===============================
// ROOT
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "MediIndia Care backend is running",
  });
});

// =====================================================
// HOSPITALS
// Supabase table: hospitals
// =====================================================

// ===============================
// GET ALL HOSPITALS
// GET /api/hospitals
// ===============================

app.get("/api/hospitals", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("hospitals")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase hospitals error:", error);

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

// ===============================
// GET SINGLE HOSPITAL
// GET /api/hospitals/:id
// ===============================

app.get("/api/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Fetching hospital with ID:", id);

    const { data, error } = await supabase
      .from("hospitals")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase hospital details error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        error: "Hospital not found",
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

// ===============================
// ADD HOSPITAL
// POST /api/hospitals
// ===============================

app.post("/api/hospitals", async (req, res) => {
  try {
    const {
      name,
      city,
      specialty,
      address,
      image,
    } = req.body;

    if (!name || !city || !specialty) {
      return res.status(400).json({
        error: "Name, city and specialty are required",
      });
    }

    const { data, error } = await supabase
      .from("hospitals")
      .insert([
        {
          name: name.trim(),
          city: city.trim(),
          specialty: specialty.trim(),
          address: address ? address.trim() : "",
          image: image ? image.trim() : "",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase add hospital error:", error);

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

// ===============================
// UPDATE HOSPITAL
// PUT /api/hospitals/:id
// ===============================

app.put("/api/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      city,
      specialty,
      address,
      image,
    } = req.body;

    if (!name || !city || !specialty) {
      return res.status(400).json({
        error: "Name, city and specialty are required",
      });
    }

    const { data, error } = await supabase
      .from("hospitals")
      .update({
        name: name.trim(),
        city: city.trim(),
        specialty: specialty.trim(),
        address: address ? address.trim() : "",
        image: image ? image.trim() : "",
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase update hospital error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        error: "Hospital not found",
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

// ===============================
// DELETE HOSPITAL
// DELETE /api/hospitals/:id
// ===============================

app.delete("/api/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("hospitals")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase delete hospital error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Hospital not found",
      });
    }

    res.json({
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// =====================================================
// APPOINTMENTS
// Supabase table: appointments
// =====================================================

// ===============================
// GET ALL APPOINTMENTS
// GET /api/appointments
// ===============================

app.get("/api/appointments", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Supabase appointments error:", error);

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

// ===============================
// CREATE APPOINTMENT
// POST /api/appointments
// ===============================

app.post("/api/appointments", async (req, res) => {
  try {
    const {
      patient_name,
      doctor_name,
      date,
      hospital_name,
      treatment_name,
      patient_email,
      patient_phone,
    } = req.body;

    // Required fields
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
        error: "All appointment details are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(patient_email.trim())) {
      return res.status(400).json({
        error: "Please enter a valid email address",
      });
    }

    // 10-digit phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(patient_phone.trim())) {
      return res.status(400).json({
        error: "Please enter a valid 10-digit phone number",
      });
    }

    // Appointment date validation
    const appointmentDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);

    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({
        error: "Please enter a valid appointment date",
      });
    }

    if (appointmentDate < today) {
      return res.status(400).json({
        error: "Appointment date cannot be in the past",
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          patient_name: patient_name.trim(),
          doctor_name: doctor_name.trim(),
          date,
          hospital_name: hospital_name.trim(),
          treatment_name: treatment_name.trim(),
          patient_email: patient_email.trim().toLowerCase(),
          patient_phone: patient_phone.trim(),
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase appointment error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    console.log("Appointment created successfully:", data);

    // Return actual Supabase appointment record + ID
    return res.status(201).json(data);

  } catch (error) {
    console.error("Appointment server error:", error);

    return res.status(500).json({
      error: error.message || "Failed to create appointment",
    });
  }
});

// =====================================================
// DOCTORS / PROVIDERS
// Supabase table: doctors
// =====================================================

// ===============================
// GET ALL DOCTORS
// ===============================

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

// ===============================
// GET SINGLE DOCTOR
// ===============================

app.get("/api/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase doctor error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data) {
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

// ===============================
// ADD DOCTOR
// ===============================

app.post("/api/doctors", async (req, res) => {
  try {
    const {
      name,
      specialty,
      hospital,
      location,
      status,
    } = req.body;

    if (!name || !specialty || !hospital || !location) {
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

// ===============================
// UPDATE DOCTOR
// ===============================

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

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (specialty !== undefined) {
      updateData.specialty = specialty.trim();
    }

    if (hospital !== undefined) {
      updateData.hospital = hospital.trim();
    }

    if (location !== undefined) {
      updateData.location = location.trim();
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    const { data, error } = await supabase
      .from("doctors")
      .update(updateData)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase update doctor error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data) {
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

// ===============================
// DELETE DOCTOR
// ===============================

app.delete("/api/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("doctors")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase delete doctor error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Doctor not found",
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

// =====================================================
// TREATMENTS
// Supabase table: treatments
// =====================================================

// ===============================
// GET ALL TREATMENTS
// ===============================

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

// ===============================
// GET SINGLE TREATMENT
// ===============================

app.get("/api/treatments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("treatments")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase treatment error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data) {
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

// ===============================
// ADD TREATMENT
// ===============================

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

// ===============================
// UPDATE TREATMENT
// ===============================

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

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (category !== undefined) {
      updateData.category = category.trim();
    }

    if (hospital !== undefined) {
      updateData.hospital = hospital.trim();
    }

    if (location !== undefined) {
      updateData.location = location.trim();
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    const { data, error } = await supabase
      .from("treatments")
      .update(updateData)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase update treatment error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data) {
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

// ===============================
// DELETE TREATMENT
// ===============================

app.delete("/api/treatments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("treatments")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase delete treatment error:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Treatment not found",
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

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `MediIndia Care backend running on http://localhost:${PORT}`
  );
});