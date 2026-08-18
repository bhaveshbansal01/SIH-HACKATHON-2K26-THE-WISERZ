"use client";

import { useMemo, useState } from "react";

type ProviderStatus = "Active" | "Inactive";

type Provider = {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  status: ProviderStatus;
};

const initialProviders: Provider[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialty: "Cardiology",
    hospital: "MedIndia Hospital",
    location: "New Delhi",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Neurology",
    hospital: "Apollo Healthcare",
    location: "Mumbai",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Amit Singh",
    specialty: "Orthopedics",
    hospital: "Fortis Hospital",
    location: "Chandigarh",
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Neha Gupta",
    specialty: "Dermatology",
    hospital: "Max Healthcare",
    location: "Delhi",
    status: "Inactive",
  },
];

const emptyForm = {
  name: "",
  specialty: "",
  hospital: "",
  location: "",
  status: "Active" as ProviderStatus,
};

export default function ProvidersPage() {
  const [providers, setProviders] =
    useState<Provider[]>(initialProviders);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState(emptyForm);

  // -----------------------------
  // SEARCH / FILTER
  // -----------------------------

  const filteredProviders = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return providers;
    }

    return providers.filter((provider) => {
      return (
        provider.name.toLowerCase().includes(searchText) ||
        provider.specialty.toLowerCase().includes(searchText) ||
        provider.hospital.toLowerCase().includes(searchText) ||
        provider.location.toLowerCase().includes(searchText) ||
        provider.status.toLowerCase().includes(searchText)
      );
    });
  }, [providers, search]);

  // -----------------------------
  // RESET FORM
  // -----------------------------

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // -----------------------------
  // SHOW MESSAGE
  // -----------------------------

  const showSuccessMessage = (message: string) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  // -----------------------------
  // VALIDATION
  // -----------------------------

  const validateForm = () => {
    if (
      !form.name.trim() ||
      !form.specialty.trim() ||
      !form.hospital.trim() ||
      !form.location.trim()
    ) {
      return "Please fill in all required fields.";
    }

    // Name validation
    if (!/^[a-zA-Z.\s]+$/.test(form.name.trim())) {
      return "Provider name can contain only letters, spaces and dots.";
    }

    // Minimum length
    if (form.name.trim().length < 4) {
      return "Provider name is too short.";
    }

    if (form.specialty.trim().length < 3) {
      return "Please enter a valid specialty.";
    }

    if (form.hospital.trim().length < 3) {
      return "Please enter a valid hospital name.";
    }

    if (form.location.trim().length < 2) {
      return "Please enter a valid location.";
    }

    // Duplicate checking
    const duplicate = providers.some((provider) => {
      if (provider.id === editingId) {
        return false;
      }

      return (
        provider.name.trim().toLowerCase() ===
        form.name.trim().toLowerCase()
      );
    });

    if (duplicate) {
      return "A provider with this name already exists.";
    }

    return "";
  };

  // -----------------------------
  // ADD / EDIT PROVIDER
  // -----------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSaving(true);

    // Small delay to simulate save operation
    await new Promise((resolve) =>
      setTimeout(resolve, 400)
    );

    try {
      if (editingId !== null) {
        // EDIT PROVIDER

        setProviders((currentProviders) =>
          currentProviders.map((provider) =>
            provider.id === editingId
              ? {
                  ...provider,
                  name: form.name.trim(),
                  specialty: form.specialty.trim(),
                  hospital: form.hospital.trim(),
                  location: form.location.trim(),
                  status: form.status,
                }
              : provider
          )
        );

        showSuccessMessage(
          "Provider updated successfully."
        );
      } else {
        // ADD PROVIDER

        const newProvider: Provider = {
          id: Date.now(),
          name: form.name.trim(),
          specialty: form.specialty.trim(),
          hospital: form.hospital.trim(),
          location: form.location.trim(),
          status: form.status,
        };

        setProviders((currentProviders) => [
          ...currentProviders,
          newProvider,
        ]);

        showSuccessMessage(
          "Provider added successfully."
        );
      }

      resetForm();
    } catch {
      setError(
        "Something went wrong while saving the provider."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // -----------------------------
  // EDIT
  // -----------------------------

  const handleEdit = (provider: Provider) => {
    setForm({
      name: provider.name,
      specialty: provider.specialty,
      hospital: provider.hospital,
      location: provider.location,
      status: provider.status,
    });

    setEditingId(provider.id);
    setShowForm(true);

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // -----------------------------
  // DELETE
  // -----------------------------

  const handleDelete = (id: number) => {
    const provider = providers.find(
      (item) => item.id === id
    );

    if (!provider) {
      setError("Provider not found.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${provider.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setProviders((currentProviders) =>
        currentProviders.filter(
          (item) => item.id !== id
        )
      );

      showSuccessMessage(
        `${provider.name} deleted successfully.`
      );
    } catch {
      setError(
        "Unable to delete provider. Please try again."
      );
    }
  };

  // -----------------------------
  // TOGGLE STATUS
  // -----------------------------

  const toggleStatus = (id: number) => {
    setProviders((currentProviders) =>
      currentProviders.map((provider) =>
        provider.id === id
          ? {
              ...provider,
              status:
                provider.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : provider
      )
    );

    showSuccessMessage("Provider status updated.");
  };

  // -----------------------------
  // OPEN ADD FORM
  // -----------------------------

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <header style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>
            Admin / Providers
          </p>

          <h1 style={styles.title}>
            Provider Management
          </h1>

          <p style={styles.subtitle}>
            Manage healthcare providers registered in
            MedIndia Care.
          </p>
        </div>

        <button
          style={styles.addButton}
          onClick={openAddForm}
        >
          + Add Provider
        </button>
      </header>

      {/* SUCCESS */}

      {success && (
        <div style={styles.successMessage}>
          <span>✓</span>
          {success}
        </div>
      )}

      {/* ERROR */}

      {error && !showForm && (
        <div style={styles.errorMessage}>
          <span>⚠</span>
          {error}

          <button
            style={styles.dismissButton}
            onClick={() => setError("")}
          >
            ✕
          </button>
        </div>
      )}

      {/* FORM */}

      {showForm && (
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <div>
              <h2 style={styles.formTitle}>
                {editingId !== null
                  ? "Edit Provider"
                  : "Add New Provider"}
              </h2>

              <p style={styles.formSubtitle}>
                Enter provider information below.
              </p>
            </div>

            <button
              type="button"
              style={styles.closeButton}
              onClick={resetForm}
            >
              ✕
            </button>
          </div>

          {/* FORM ERROR */}

          {error && (
            <div style={styles.errorMessage}>
              <span>⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              {/* NAME */}

              <div>
                <label style={styles.label}>
                  Provider Name *
                </label>

                <input
                  style={styles.input}
                  type="text"
                  placeholder="Dr. John Smith"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              {/* SPECIALTY */}

              <div>
                <label style={styles.label}>
                  Specialty *
                </label>

                <input
                  style={styles.input}
                  type="text"
                  placeholder="Cardiology"
                  value={form.specialty}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      specialty: e.target.value,
                    })
                  }
                />
              </div>

              {/* HOSPITAL */}

              <div>
                <label style={styles.label}>
                  Hospital *
                </label>

                <input
                  style={styles.input}
                  type="text"
                  placeholder="MedIndia Hospital"
                  value={form.hospital}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hospital: e.target.value,
                    })
                  }
                />
              </div>

              {/* LOCATION */}

              <div>
                <label style={styles.label}>
                  Location *
                </label>

                <input
                  style={styles.input}
                  type="text"
                  placeholder="New Delhi"
                  value={form.location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              {/* STATUS */}

              <div>
                <label style={styles.label}>
                  Status
                </label>

                <select
                  style={styles.input}
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status:
                        e.target.value as ProviderStatus,
                    })
                  }
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>

            {/* FORM ACTIONS */}

            <div style={styles.formActions}>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={resetForm}
                disabled={isSaving}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  ...styles.saveButton,
                  opacity: isSaving ? 0.7 : 1,
                }}
                disabled={isSaving}
              >
                {isSaving
                  ? "Saving..."
                  : editingId !== null
                  ? "Update Provider"
                  : "Add Provider"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SEARCH */}

      <div style={styles.searchCard}>
        <div>
          <h2 style={styles.sectionTitle}>
            Providers
          </h2>

          <p style={styles.countText}>
            {filteredProviders.length} provider
            {filteredProviders.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        </div>

        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search provider, specialty, hospital..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* TABLE */}

      <div style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  Provider
                </th>

                <th style={styles.th}>
                  Specialty
                </th>

                <th style={styles.th}>
                  Hospital
                </th>

                <th style={styles.th}>
                  Location
                </th>

                <th style={styles.th}>
                  Status
                </th>

                <th style={styles.th}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProviders.length > 0 ? (
                filteredProviders.map(
                  (provider) => (
                    <tr key={provider.id}>
                      {/* PROVIDER */}

                      <td style={styles.td}>
                        <div
                          style={
                            styles.providerInfo
                          }
                        >
                          <div
                            style={styles.avatar}
                          >
                            {provider.name
                              .replace(
                                "Dr. ",
                                ""
                              )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>
                            {provider.name}
                          </strong>
                        </div>
                      </td>

                      {/* SPECIALTY */}

                      <td style={styles.td}>
                        {provider.specialty}
                      </td>

                      {/* HOSPITAL */}

                      <td style={styles.td}>
                        {provider.hospital}
                      </td>

                      {/* LOCATION */}

                      <td style={styles.td}>
                        {provider.location}
                      </td>

                      {/* STATUS */}

                      <td style={styles.td}>
                        <button
                          onClick={() =>
                            toggleStatus(
                              provider.id
                            )
                          }
                          style={
                            provider.status ===
                            "Active"
                              ? styles.activeStatus
                              : styles.inactiveStatus
                          }
                          title="Click to change status"
                        >
                          {provider.status}
                        </button>
                      </td>

                      {/* ACTIONS */}

                      <td style={styles.td}>
                        <div
                          style={
                            styles.actionButtons
                          }
                        >
                          <button
                            style={
                              styles.editButton
                            }
                            onClick={() =>
                              handleEdit(
                                provider
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            style={
                              styles.deleteButton
                            }
                            onClick={() =>
                              handleDelete(
                                provider.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    style={styles.emptyState}
                  >
                    <div
                      style={styles.emptyIcon}
                    >
                      🔍
                    </div>

                    <strong>
                      No providers found
                    </strong>

                    <p>
                      Try another search term.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BACK BUTTON */}

      <button
        style={styles.backButton}
        onClick={() => {
          window.location.href = "/admin";
        }}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles: Record<
  string,
  React.CSSProperties
> = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "35px",
    color: "#172033",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  breadcrumb: {
    color: "#2563eb",
    fontSize: "13px",
    margin: "0 0 8px",
  },

  title: {
    fontSize: "30px",
    margin: 0,
  },

  subtitle: {
    color: "#7b8495",
    marginTop: "7px",
  },

  addButton: {
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "13px 20px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },

  successMessage: {
    background: "#eaf8ef",
    color: "#15803d",
    border: "1px solid #bbf7d0",
    padding: "13px 16px",
    borderRadius: "9px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  errorMessage: {
    background: "#fff1f2",
    color: "#dc2626",
    border: "1px solid #fecdd3",
    padding: "12px 14px",
    borderRadius: "8px",
    marginBottom: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  dismissButton: {
    marginLeft: "auto",
    border: "none",
    background: "transparent",
    color: "#dc2626",
    cursor: "pointer",
  },

  formCard: {
    background: "#ffffff",
    border: "1px solid #e5e9f0",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "20px",
  },

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  formTitle: {
    margin: 0,
    fontSize: "20px",
  },

  formSubtitle: {
    margin: "5px 0 0",
    color: "#7b8495",
    fontSize: "13px",
  },

  closeButton: {
    border: "none",
    background: "#f1f3f6",
    borderRadius: "8px",
    width: "35px",
    height: "35px",
    cursor: "pointer",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "7px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #dce1e8",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "14px",
    outline: "none",
    background: "#ffffff",
  },

  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "22px",
  },

  cancelButton: {
    border: "1px solid #d9dee7",
    background: "#ffffff",
    padding: "11px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  saveButton: {
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "11px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  searchCard: {
    background: "#ffffff",
    border: "1px solid #e5e9f0",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "20px",
  },

  countText: {
    margin: "5px 0 0",
    color: "#7b8495",
    fontSize: "13px",
  },

  searchInput: {
    width: "350px",
    maxWidth: "100%",
    border: "1px solid #dce1e8",
    borderRadius: "9px",
    padding: "12px 15px",
    fontSize: "14px",
    outline: "none",
  },

  tableCard: {
    background: "#ffffff",
    border: "1px solid #e5e9f0",
    borderRadius: "15px",
    overflow: "hidden",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },

  th: {
    background: "#f8fafc",
    padding: "15px",
    textAlign: "left",
    fontSize: "12px",
    color: "#687386",
    borderBottom:
      "1px solid #e5e9f0",
  },

  td: {
    padding: "15px",
    borderBottom:
      "1px solid #edf0f4",
    fontSize: "13px",
  },

  providerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#eaf1ff",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  activeStatus: {
    border: "none",
    background: "#dcfce7",
    color: "#15803d",
    padding: "5px 9px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  inactiveStatus: {
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    padding: "5px 9px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  actionButtons: {
    display: "flex",
    gap: "7px",
  },

  editButton: {
    border: "1px solid #bfdbfe",
    background: "#eff6ff",
    color: "#2563eb",
    padding: "7px 11px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteButton: {
    border: "1px solid #fecaca",
    background: "#fef2f2",
    color: "#dc2626",
    padding: "7px 11px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  emptyState: {
    textAlign: "center",
    padding: "60px",
    color: "#7b8495",
  },

  emptyIcon: {
    fontSize: "35px",
    marginBottom: "10px",
  },

  backButton: {
    marginTop: "20px",
    border: "none",
    background: "transparent",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px",
  },
};