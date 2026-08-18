"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // Go to Provider Management page
  const goToProviders = () => {
    setActiveMenu("Providers");
    router.push("/admin/providers");
  };

  const stats = [
    {
      title: "Total Providers",
      value: "24",
      icon: "👨‍⚕️",
      description: "Registered providers",
    },
    {
      title: "Total Treatments",
      value: "18",
      icon: "💊",
      description: "Available treatments",
    },
    {
      title: "Appointments",
      value: "156",
      icon: "📅",
      description: "Total appointments",
    },
    {
      title: "Hospitals",
      value: "12",
      icon: "🏥",
      description: "Registered hospitals",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>M</div>

          <div>
            <h2 style={styles.logoText}>MedIndia</h2>
            <p style={styles.logoSubtext}>Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
          {[
            "Dashboard",
            "Providers",
            "Treatments",
            "Hospitals",
            "Appointments",
          ].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === "Providers") {
                  goToProviders();
                } else {
                  setActiveMenu(item);
                }
              }}
              style={{
                ...styles.navButton,
                ...(activeMenu === item
                  ? styles.activeNavButton
                  : {}),
              }}
            >
              <span>
                {item === "Dashboard" && "📊"}
                {item === "Providers" && "👨‍⚕️"}
                {item === "Treatments" && "💊"}
                {item === "Hospitals" && "🏥"}
                {item === "Appointments" && "📅"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        {/* Bottom Sidebar */}
        <div style={styles.sidebarBottom}>
          <button
            style={styles.backButton}
            onClick={() => router.push("/")}
          >
            ← Back to Website
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <p style={styles.smallText}>Welcome back, Admin</p>

            <h1 style={styles.heading}>Admin Dashboard</h1>
          </div>

          <div style={styles.adminProfile}>
            <div style={styles.avatar}>A</div>

            <div>
              <strong>Administrator</strong>

              <p style={styles.profileRole}>System Admin</p>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section style={styles.statsGrid}>
          {stats.map((stat) => (
            <div
              key={stat.title}
              style={styles.statCard}
            >
              <div style={styles.statTop}>
                <div>
                  <p style={styles.statTitle}>
                    {stat.title}
                  </p>

                  <h2 style={styles.statValue}>
                    {stat.value}
                  </h2>
                </div>

                <div style={styles.statIcon}>
                  {stat.icon}
                </div>
              </div>

              <p style={styles.statDescription}>
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        {/* Main Cards */}
        <section style={styles.contentGrid}>
          {/* Quick Actions */}
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
              {/* PROVIDERS */}
              <button
                style={styles.actionButton}
                onClick={goToProviders}
              >
                <span style={styles.actionIcon}>
                  👨‍⚕️
                </span>

                <span>
                  <strong>Manage Providers</strong>

                  <small>
                    View and manage providers
                  </small>
                </span>
              </button>

              {/* TREATMENTS */}
              <button
                style={styles.actionButton}
                onClick={() =>
                  setActiveMenu("Treatments")
                }
              >
                <span style={styles.actionIcon}>
                  💊
                </span>

                <span>
                  <strong>Manage Treatments</strong>

                  <small>
                    Add or update treatments
                  </small>
                </span>
              </button>

              {/* HOSPITALS */}
              <button
                style={styles.actionButton}
                onClick={() =>
                  setActiveMenu("Hospitals")
                }
              >
                <span style={styles.actionIcon}>
                  🏥
                </span>

                <span>
                  <strong>Manage Hospitals</strong>

                  <small>
                    View hospital information
                  </small>
                </span>
              </button>

              {/* APPOINTMENTS */}
              <button
                style={styles.actionButton}
                onClick={() =>
                  setActiveMenu("Appointments")
                }
              >
                <span style={styles.actionIcon}>
                  📅
                </span>

                <span>
                  <strong>Appointments</strong>

                  <small>
                    Monitor appointments
                  </small>
                </span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              System Status
            </h2>

            <p style={styles.cardSubtitle}>
              Current platform status
            </p>

            <div style={styles.statusItem}>
              <span>Website</span>

              <span style={styles.online}>
                ● Online
              </span>
            </div>

            <div style={styles.statusItem}>
              <span>Database</span>

              <span style={styles.online}>
                ● Connected
              </span>
            </div>

            <div style={styles.statusItem}>
              <span>Appointments</span>

              <span style={styles.online}>
                ● Active
              </span>
            </div>

            <div style={styles.statusItem}>
              <span>System</span>

              <span style={styles.online}>
                ● Healthy
              </span>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>
                Recent Activity
              </h2>

              <p style={styles.cardSubtitle}>
                Latest administrative activities
              </p>
            </div>
          </div>

          <div style={styles.activityList}>
            <div style={styles.activity}>
              <span style={styles.activityIcon}>
                👨‍⚕️
              </span>

              <div>
                <strong>
                  New provider registered
                </strong>

                <p>
                  New healthcare provider was added
                  to the system.
                </p>
              </div>

              <span style={styles.time}>
                Today
              </span>
            </div>

            <div style={styles.activity}>
              <span style={styles.activityIcon}>
                💊
              </span>

              <div>
                <strong>
                  Treatment updated
                </strong>

                <p>
                  Treatment information was
                  successfully updated.
                </p>
              </div>

              <span style={styles.time}>
                Today
              </span>
            </div>

            <div style={styles.activity}>
              <span style={styles.activityIcon}>
                📅
              </span>

              <div>
                <strong>
                  Appointment created
                </strong>

                <p>
                  A new appointment was added to
                  the system.
                </p>
              </div>

              <span style={styles.time}>
                Yesterday
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  },

  adminProfile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
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
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "22px",
  },

  statCard: {
    background: "#ffffff",
    border: "1px solid #e6eaf0",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.03)",
  },

  statTop: {
    display: "flex",
    justifyContent: "space-between",
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
  },

  statDescription: {
    margin: "14px 0 0",
    color: "#8a93a3",
    fontSize: "12px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e6eaf0",
    borderRadius: "15px",
    padding: "24px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.03)",
    marginBottom: "20px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
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
    gridTemplateColumns: "1fr 1fr",
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
  },

  actionIcon: {
    fontSize: "25px",
  },

  statusItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #edf0f4",
    fontSize: "14px",
  },

  online: {
    color: "#16a34a",
    fontWeight: "bold",
  },

  activityList: {
    display: "flex",
    flexDirection: "column",
  },

  activity: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 0",
    borderBottom: "1px solid #edf0f4",
  },

  activityIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: "#eef4ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  time: {
    marginLeft: "auto",
    color: "#8992a2",
    fontSize: "12px",
  },
};