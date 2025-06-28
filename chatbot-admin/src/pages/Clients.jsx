import { useEffect, useState } from "react";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [fileUploads, setFileUploads] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/client`);
        setClients(res.data);
      } catch (err) {
        console.error("Failed to load clients", err);
      }
    };
    fetchClients();
  }, []);

  const handleFileChange = (clientId, file) => {
    console.log("Selected file for:", clientId, file); // ✅
    setFileUploads((prev) => ({ ...prev, [clientId]: file }));
  };

  const handleUpload = async (chatbotId) => {
    if (!fileUploads[chatbotId]) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", fileUploads[chatbotId]);

    // ✅ Add these logs here
    console.log("Uploading file for chatbotId:", chatbotId);
    console.log("File object:", fileUploads[chatbotId]);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE}/file/upload/${chatbotId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Uploaded successfully");
    } catch (err) {
      console.error("Upload error", err);
      alert("Upload failed");
    }
  };

  const handleCreateChatbot = async (clientId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE}/chatbot/create/${clientId}`
      );
      alert("Chatbot created!");
      window.location.reload(); // simple reload to refresh client list
    } catch (err) {
      console.error("Chatbot creation failed", err);
      alert("Failed to create chatbot");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Client & Chatbot Management</h2>
      <table
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={th}>Client Name</th>
            <th style={th}>Email</th>
            <th style={th}>Chatbot</th>
            <th style={th}>Upload .txt</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td style={td}>{client.name}</td>
              <td style={td}>{client.email}</td>
              <td style={td}>
                {client.chatbot ? `✅ ${client.chatbot.name}` : "❌ None"}
              </td>
              <td style={td}>
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) =>
                    handleFileChange(client.chatbot?._id, e.target.files[0])
                  }
                  disabled={!client.chatbot}
                />
                <button
                  onClick={() => handleUpload(client.chatbot?._id)}
                  style={btn}
                  disabled={!client.chatbot}
                >
                  Upload
                </button>
              </td>

              <td style={td}>
                <button
                  onClick={() => handleCreateChatbot(client._id)}
                  style={btnBlue}
                  disabled={!!client.chatbot}
                >
                  {client.chatbot ? "Created" : "Create Chatbot"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ccc",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const btn = {
  marginLeft: "10px",
  padding: "6px 12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnBlue = {
  padding: "6px 12px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const createBtn = {
  padding: "6px 10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Clients;
