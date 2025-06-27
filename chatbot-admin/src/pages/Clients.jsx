import { useState, useEffect } from "react";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", website: "", email: "" });

  const fetchClients = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_BASE}/client`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE}/client`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", website: "", email: "" });
      fetchClients();
    } catch (err) {
      alert("Failed to add client");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🧑‍💼 Client Management
      </h1>

      <form
        onSubmit={handleAdd}
        style={{
          marginBottom: "2rem",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Client Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="url"
          placeholder="Website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Add Client
        </button>
      </form>

      <h2>📋 All Clients</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {clients.map((c) => (
          <div key={c._id} style={cardStyle}>
            <h3 style={{ margin: 0 }}>{c.name}</h3>
            <p style={{ margin: "6px 0" }}>
              <a href={c.website} target="_blank" rel="noreferrer">
                {c.website}
              </a>
            </p>
            <p style={{ margin: 0, color: "#555" }}>{c.email}</p>
            <button
              style={{
                marginTop: "10px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() =>
                (window.location.href = `/clients/${c._id}/chatbots`)
              }
            >
              Manage Chatbots
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  flex: "1 1 30%",
  minWidth: "200px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const buttonStyle = {
  padding: "10px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cardStyle = {
  padding: "16px",
  border: "1px solid #eee",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  backgroundColor: "#fff",
};

export default Clients;
