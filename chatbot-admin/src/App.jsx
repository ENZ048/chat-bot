import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ChatbotManager from "./pages/ChatbotManager";
import ChatTest from "./pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:clientId/chatbots" element={<ChatbotManager />} />
        <Route path="/test-chat" element={<ChatTest />} />
      </Routes>
    </Router>
  );
}

export default App;
