# MediIndia Care

## Smart Healthcare Discovery & Consultation Platform

### Smart India Hackathon 2026 — THE WISERZ

MediIndia Care is a healthcare discovery and consultation platform designed to simplify access to healthcare services in India.

The platform helps patients discover hospitals, doctors and treatments, explore treatment information, compare healthcare options and submit consultation requests through a unified platform.

---

## Problem Statement

Patients looking for healthcare services often face difficulty finding reliable and organized information about hospitals, doctors, treatments and treatment costs.

Healthcare information is often scattered across different platforms, making it difficult for patients to compare options and make informed decisions, especially when seeking treatment outside their home city.

MediIndia Care addresses this problem by bringing healthcare discovery, treatment information and consultation requests together in one platform.

---

## Our Solution

MediIndia Care provides a centralized healthcare platform where users can:

- Discover hospitals and healthcare providers
- Browse doctors and their specializations
- Explore available treatments
- View treatment descriptions
- View estimated treatment costs
- View treatment duration
- Search and filter healthcare services
- Get treatment recommendations
- Submit consultation requests
- Access healthcare information through a responsive interface

The platform is connected to a real backend and Supabase database, allowing healthcare and appointment data to be dynamically retrieved and stored.

---

# Key Features

## 1. Patient-Facing Application

The platform provides a clean and responsive interface for patients to explore healthcare services.

Users can:

- Browse hospitals
- Browse doctors
- Explore treatments
- Search healthcare services
- View details
- Request consultations

---

## 2. Hospital Discovery

Users can browse hospitals available through the platform.

Hospital information includes:

- Hospital name
- City
- Specialty
- Address
- Hospital details

Hospital information is retrieved from the backend rather than being hardcoded into the application.

---

## 3. Doctor / Healthcare Provider Listing

Users can explore healthcare providers and doctors.

Provider information includes:

- Doctor name
- Specialization
- Associated hospital
- Experience

Doctor information is retrieved through the backend API.

---

## 4. Treatment & Service Information

Users can explore healthcare treatments and services.

Treatment information includes:

- Treatment name
- Medical specialty
- Description
- Estimated cost
- Duration

This allows patients to understand available healthcare options before requesting a consultation.

---

## 5. Search & Filtering

MediIndia Care provides healthcare discovery through search and filtering.

Users can search for:

- Treatments
- Hospitals
- Healthcare providers

The platform also supports filtering based on available healthcare information.

---

## 6. Smart Treatment Recommendation

The platform includes a lightweight treatment recommendation system.

The system analyzes the user's described healthcare concern and compares keywords against:

- Treatment name
- Medical specialty
- Treatment description

Matching treatments are assigned scores and ranked to provide relevant recommendations.

### Recommendation Flow

```text
User Healthcare Concern
          ↓
Text Processing
          ↓
Keyword Extraction
          ↓
Treatment Data Matching
          ↓
Score Calculation
          ↓
Ranking
          ↓
Treatment Recommendations
