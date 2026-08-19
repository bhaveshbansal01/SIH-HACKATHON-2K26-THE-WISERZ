"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Appointment = {
  id: number;
  patient_name: string;
  doctor_name: string;
  date: string;
  status: string;
  hospital_name?: string;
  treatment_name?: string;
  patient_email?: string;
  patient_phone?: string;
};

type StatsData = {
  providers: number;
  treatments: number;
  appointments: number;
  hospitals: number;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [stats, setStats] = useState<StatsData>({
    providers: 0,
    treatments: 0,
    appointments: 0,
    hospitals: 0,
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // NAVIGATION
  // =========================

  const goToDashboard = () => {
    setActiveMenu("Dashboard");
    router.push("/admin");
  };

  const goToProviders = () => {
    setActiveMenu("Providers");
    router.push("/admin/providers");
  };

  const goToTreatments = () => {
  setActiveMenu("Treatments");
  router.push("/treatments");
};

  const goToHospitals = () => {
    setActiveMenu("Hospitals");
    router.push("/hospitals");
  };

  const goToAppointments = () => {
    setActiveMenu("Appointments");
    router.push("/appointment");
  };

  const goToWebsite = () => {
    router.push("/");
  };

  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          doctorsResponse,
          treatmentsResponse,
          appointmentsResponse,
          hospitalsResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/api/doctors`),
          fetch(`${API_URL}/api/treatments`),
          fetch(`${API_URL}/api/appointments`),
          fetch(`${API_URL}/api/hospitals`),
        ]);

        if (
          !doctorsResponse.ok ||
          !treatmentsResponse.ok ||
          !appointmentsResponse.ok ||
          !hospitalsResponse.ok
        ) {
          throw new Error("Failed to load dashboard data.");
        }

        const doctors = await doctorsResponse.json();
        const treatments = await treatmentsResponse.json();
        const appointmentData = await appointmentsResponse.json();
        const hospitals = await hospitalsResponse.json();

        const appointmentList = Array.isArray(appointmentData)
          ? appointmentData
          : appointmentData
            ? [appointmentData]
            : [];

        setStats({
          providers: Array.isArray(doctors)
            ? doctors.length
            : 0,

          treatments: Array.isArray(treatments)
            ? treatments.length
            : 0,

          appointments: appointmentList.length,

          hospitals: Array.isArray(hospitals)
            ? hospitals.length
            : 0,
        });

        setAppointments(appointmentList);
      } catch (err) {
        console.error(
          "Admin dashboard error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =========================
  // STATS
  // =========================

  const statCards = [
    {
      title: "Total Providers",
      value: stats.providers,
      icon: "👨‍⚕️",
      description: "Registered providers",
      onClick: goToProviders,
    },

    {
      title: "Total Treatments",
      value: stats.treatments,
      icon: "💊",
      description: "Available treatments",
      onClick: goToTreatments,
    },

    {
      title: "Appointments",
      value: stats.appointments,
      icon: "📅",
      description: "Total appointments",
      onClick: goToAppointments,
    },

    {
      title: "Hospitals",
      value: stats.hospitals,
      icon: "🏥",
      description: "Registered hospitals",
      onClick: goToHospitals,
    },
  ];

  return (
    <div style={styles.container}>

      {/* ================= SIDEBAR ================= */}

      <aside style={styles.sidebar}>

        <div style={styles.logo}>

          <div style={styles.logoIcon}>
            M
          </div>

          <div>

            <h2 style={styles.logoText}>
              MedIndia
            </h2>

            <p style={styles.logoSubtext}>
              Admin Panel
            </p>

          </div>

        </div>

        <nav style={styles.nav}>

          {/* Dashboard */}

          <button
            onClick={goToDashboard}
            style={{
              ...styles.navButton,

              ...(activeMenu === "Dashboard"
                ? styles.activeNavButton
                : {}),
            }}
          >
            <span>📊</span>
            Dashboard
          </button>

          {/* Providers */}

          <button
            onClick={goToProviders}
            style={{
              ...styles.navButton,

              ...(activeMenu === "Providers"
                ? styles.activeNavButton
                : {}),
            }}
          >
            <span>👨‍⚕️</span>
            Providers
          </button>

          {/* Treatments */}

          <button
            onClick={goToTreatments}
            style={{
              ...styles.navButton,

              ...(activeMenu === "Treatments"
                ? styles.activeNavButton
                : {}),
            }}
          >
            <span>💊</span>
            Treatments
          </button>

          {/* Hospitals */}

          <button
            onClick={goToHospitals}
            style={{
              ...styles.navButton,

              ...(activeMenu === "Hospitals"
                ? styles.activeNavButton
                : {}),
            }}
          >
            <span>🏥</span>
            Hospitals
          </button>

          {/* Appointments */}

          <button
            onClick={goToAppointments}
            style={{
              ...styles.navButton,

              ...(activeMenu === "Appointments"
                ? styles.activeNavButton
                : {}),
            }}
          >
            <span>📅</span>
            Appointments
          </button>

        </nav>

        {/* Back to Website */}

        <div style={styles.sidebarBottom}>

          <button
            style={styles.backButton}
            onClick={goToWebsite}
          >
            ← Back to Website
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main style={styles.main}>

        {/* HEADER */}

        <header style={styles.header}>

          <div>

            <p style={styles.smallText}>
              Welcome back, Admin
            </p>

            <h1 style={styles.heading}>
              Admin Dashboard
            </h1>

          </div>

          <div style={styles.adminProfile}>

            <div style={styles.avatar}>
              A
            </div>

            <div>

              <strong>
                Administrator
              </strong>

              <p style={styles.profileRole}>
                System Admin
              </p>

            </div>

          </div>

        </header>

        {/* ERROR */}

        {error && (

          <div style={styles.errorBox}>

            <strong>
              Dashboard Error
            </strong>

            <p style={styles.errorText}>
              {error}
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              style={styles.retryButton}
            >
              Retry
            </button>

          </div>

        )}

        {/* ================= STATS ================= */}

        <section style={styles.statsGrid}>

          {statCards.map((stat) => (

            <button
              key={stat.title}
              onClick={stat.onClick}
              style={styles.statCard}
            >

              <div style={styles.statTop}>

                <div style={styles.statTextArea}>

                  <p style={styles.statTitle}>
                    {stat.title}
                  </p>

                  <h2 style={styles.statValue}>
                    {loading
                      ? "..."
                      : stat.value}
                  </h2>

                </div>

                <div style={styles.statIcon}>
                  {stat.icon}
                </div>

              </div>

              <p style={styles.statDescription}>
                {stat.description}
              </p>

            </button>

          ))}

        </section>

        {/* ================= QUICK ACTIONS + STATUS ================= */}

        <section style={styles.contentGrid}>

          {/* QUICK ACTIONS */}

          <div style={styles.card}>

            <div style={styles.cardHeader}>

              <div>

                <h2 style={styles.cardTitle}>
                  Quick Actions
                </h2>

                <p style={styles.cardSubtitle}>
                  Manage the healthcare platform
                </p>

              </div>

            </div>

            <div style={styles.actionsGrid}>

              {/* Providers */}

              <button
                style={styles.actionButton}
                onClick={goToProviders}
              >

                <span style={styles.actionIcon}>
                  👨‍⚕️
                </span>

                <span style={styles.actionText}>

                  <strong>
                    Manage Providers
                  </strong>

                  <small>
                    View and manage providers
                  </small>

                </span>

              </button>

              {/* Treatments */}

              <button
                style={styles.actionButton}
                onClick={goToTreatments}
              >

                <span style={styles.actionIcon}>
                  💊
                </span>

                <span style={styles.actionText}>

                  <strong>
                    Manage Treatments
                  </strong>

                  <small>
                    View available treatments
                  </small>

                </span>

              </button>

              {/* Hospitals */}

              <button
                style={styles.actionButton}
                onClick={goToHospitals}
              >

                <span style={styles.actionIcon}>
                  🏥
                </span>

                <span style={styles.actionText}>

                  <strong>
                    Manage Hospitals
                  </strong>

                  <small>
                    View hospital information
                  </small>

                </span>

              </button>

              {/* Appointments */}

              <button
                style={styles.actionButton}
                onClick={goToAppointments}
              >

                <span style={styles.actionIcon}>
                  📅
                </span>

                <span style={styles.actionText}>

                  <strong>
                    Appointments
                  </strong>

                  <small>
                    Monitor appointments
                  </small>

                </span>

              </button>

            </div>

          </div>

          {/* SYSTEM STATUS */}

          <div style={styles.card}>

            <h2 style={styles.cardTitle}>
              System Status
            </h2>

            <p style={styles.cardSubtitle}>
              Current platform status
            </p>

            <div style={styles.statusItem}>

              <span>
                Website
              </span>

              <span style={styles.online}>
                ● Online
              </span>

            </div>

            <div style={styles.statusItem}>

              <span>
                Database
              </span>

              <span style={styles.online}>
                ● Connected
              </span>

            </div>

            <div style={styles.statusItem}>

              <span>
                Appointments
              </span>

              <span style={styles.online}>
                ● Active
              </span>

            </div>

            <div style={styles.statusItem}>

              <span>
                System
              </span>

              <span style={styles.online}>
                ● Healthy
              </span>

            </div>

          </div>

        </section>

        {/* ================= RECENT APPOINTMENTS ================= */}

        <section style={styles.card}>

          <div style={styles.cardHeader}>

            <div>

              <h2 style={styles.cardTitle}>
                Recent Appointments
              </h2>

              <p style={styles.cardSubtitle}>
                Latest appointments received from patients
              </p>

            </div>

            <button
              onClick={goToAppointments}
              style={styles.viewAllButton}
            >
              View All
            </button>

          </div>

          {/* Loading */}

          {loading && (

            <div style={styles.loadingBox}>

              <p style={styles.loadingText}>
                Loading appointments...
              </p>

            </div>

          )}

          {/* Empty */}

          {!loading &&
            !error &&
            appointments.length === 0 && (

              <div style={styles.emptyBox}>

                <div style={styles.emptyIcon}>
                  📅
                </div>

                <h3 style={styles.emptyTitle}>
                  No appointments found
                </h3>

                <p style={styles.emptyText}>
                  New patient appointments will appear here.
                </p>

                <button
                  onClick={goToAppointments}
                  style={styles.emptyButton}
                >
                  Book Consultation
                </button>

              </div>

            )}

          {/* Appointments */}

          {!loading &&
            !error &&
            appointments.length > 0 && (

              <div style={styles.tableWrapper}>

                <table style={styles.table}>

                  <thead>

                    <tr>

                      <th style={styles.tableHeader}>
                        Patient
                      </th>

                      <th style={styles.tableHeader}>
                        Hospital
                      </th>

                      <th style={styles.tableHeader}>
                        Doctor
                      </th>

                      <th style={styles.tableHeader}>
                        Treatment
                      </th>

                      <th style={styles.tableHeader}>
                        Date
                      </th>

                      <th style={styles.tableHeader}>
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {appointments
                      .slice()
                      .reverse()
                      .slice(0, 5)
                      .map((appointment) => (

                        <tr
                          key={appointment.id}
                        >

                          <td style={styles.tableCell}>

                            <strong>
                              {appointment.patient_name}
                            </strong>

                            {appointment.patient_email && (

                              <small
                                style={styles.patientEmail}
                              >
                                {appointment.patient_email}
                              </small>

                            )}

                          </td>

                          <td style={styles.tableCell}>
                            {appointment.hospital_name ||
                              "-"}
                          </td>

                          <td style={styles.tableCell}>
                            {appointment.doctor_name ||
                              "-"}
                          </td>

                          <td style={styles.tableCell}>
                            {appointment.treatment_name ||
                              "-"}
                          </td>

                          <td style={styles.tableCell}>
                            {appointment.date || "-"}
                          </td>

                          <td style={styles.tableCell}>

                            <span
                              style={
                                appointment.status
                                  ?.toLowerCase() ===
                                "confirmed"
                                  ? styles.confirmedStatus
                                  : styles.pendingStatus
                              }
                            >
                              {appointment.status ||
                                "Pending"}
                            </span>

                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

            )}

        </section>

      </main>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles: Record<
  string,
  React.CSSProperties
> = {

  container: {
    minHeight: "100vh",
    display: "flex",
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
    color: "#172033",
  },

  sidebar: {
    width: "250px",
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    bottom: 0,
    zIndex: 50,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "5px 10px 30px",
  },

  logoIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "bold",
    flexShrink: 0,
  },

  logoText: {
    margin: 0,
    color: "#2563eb",
    fontSize: "20px",
  },

  logoSubtext: {
    margin: "3px 0 0",
    fontSize: "12px",
    color: "#7b8495",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  navButton: {
    border: "none",
    background: "transparent",
    padding: "13px 15px",
    borderRadius: "10px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    color: "#526075",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
  },

  activeNavButton: {
    background: "#eaf1ff",
    color: "#2563eb",
    fontWeight: "bold",
  },

  sidebarBottom: {
    marginTop: "auto",
  },

  backButton: {
    width: "100%",
    border: "1px solid #dbe1ea",
    background: "#ffffff",
    padding: "12px",
    borderRadius: "9px",
    cursor: "pointer",
    color: "#526075",
  },

  main: {
    marginLeft: "250px",
    width: "calc(100% - 250px)",
    padding: "32px",
    minWidth: 0,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "28px",
  },

  smallText: {
    margin: 0,
    color: "#7b8495",
    fontSize: "14px",
  },

  heading: {
    margin: "5px 0 0",
    fontSize: "30px",
    lineHeight: 1.2,
  },

  adminProfile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  profileRole: {
    margin: "3px 0 0",
    fontSize: "12px",
    color: "#7b8495",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "18px",
    marginBottom: "22px",
  },

  statCard: {
    background: "#ffffff",
    border: "1px solid #e6eaf0",
    borderRadius: "15px",
    padding: "20px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.03)",
    textAlign: "left",
    cursor: "pointer",
    width: "100%",
    minWidth: 0,
  },

  statTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
  },

  statTextArea: {
    minWidth: 0,
  },

  statTitle: {
    margin: 0,
    color: "#6d7788",
    fontSize: "13px",
  },

  statValue: {
    margin: "8px 0 0",
    fontSize: "30px",
  },

  statIcon: {
    fontSize: "27px",
    background: "#eef4ff",
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  statDescription: {
    margin: "14px 0 0",
    color: "#8a93a3",
    fontSize: "12px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 2fr) minmax(280px, 1fr)",
    gap: "20px",
    marginBottom: "20px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e6eaf0",
    borderRadius: "15px",
    padding: "24px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.03)",
    marginBottom: "20px",
    minWidth: 0,
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "20px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "19px",
  },

  cardSubtitle: {
    margin: "5px 0 0",
    color: "#7b8495",
    fontSize: "13px",
  },

  actionsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "12px",
  },

  actionButton: {
    border: "1px solid #e5e9f0",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    minWidth: 0,
  },

  actionIcon: {
    fontSize: "25px",
    flexShrink: 0,
  },

  actionText: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
  },

  statusItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    padding: "14px 0",
    borderBottom: "1px solid #edf0f4",
    fontSize: "14px",
  },

  online: {
    color: "#16a34a",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  loadingBox: {
    padding: "35px 0",
    textAlign: "center",
  },

  loadingText: {
    margin: 0,
    color: "#7b8495",
  },

  errorBox: {
    marginBottom: "20px",
    padding: "16px 18px",
    borderRadius: "10px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
  },

  errorText: {
    margin: "5px 0 12px",
  },

  retryButton: {
    border: "none",
    background: "#b91c1c",
    color: "#ffffff",
    padding: "8px 14px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  viewAllButton: {
    border: "none",
    background: "#DFC5FE",
    color: "#4C1D95",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  emptyBox: {
    padding: "45px 20px",
    textAlign: "center",
    background: "#fafbfc",
    borderRadius: "12px",
    border: "1px dashed #dbe1ea",
  },

  emptyIcon: {
    fontSize: "32px",
  },

  emptyTitle: {
    margin: "10px 0 0",
    fontSize: "17px",
  },

  emptyText: {
    margin: "6px 0 18px",
    color: "#7b8495",
    fontSize: "13px",
  },

  emptyButton: {
    border: "none",
    background: "#DFC5FE",
    color: "#4C1D95",
    padding: "9px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "850px",
  },

  tableHeader: {
    textAlign: "left",
    padding: "13px 12px",
    borderBottom:
      "1px solid #e5e7eb",
    color: "#6d7788",
    fontSize: "12px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },

  tableCell: {
    padding: "15px 12px",
    borderBottom:
      "1px solid #edf0f4",
    color: "#526075",
    fontSize: "14px",
  },

  patientEmail: {
    display: "block",
    marginTop: "3px",
    color: "#8a93a3",
    fontSize: "11px",
  },

  pendingStatus: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "999px",
    background: "#DFC5FE",
    color: "#4C1D95",
    fontSize: "12px",
    fontWeight: "bold",
  },

  confirmedStatus: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "12px",
    fontWeight: "bold",
  },
};