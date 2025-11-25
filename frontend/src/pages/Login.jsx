import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import LogoutButton from "../components/LogoutButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setError(null);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Błąd logowania");
      }
    }
  };

  const isLoggedIn = !!localStorage.getItem("access");

  if (isLoggedIn) {
    return (
      <motion.div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-xl font-semibold">
          Jesteś już zalogowany
        </p>
          <LogoutButton></LogoutButton>
      </motion.div>
    );
  }

  return (
    <motion.div className="flex items-center justify-center min-h-screen bg-gray-100 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Logowanie</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-xl" />
          <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-xl" />
          <button type="submit" className="w-full p-3 rounded-xl bg-black text-white font-semibold">Zaloguj</button>

        </form>

      </div>
    </motion.div>
  );
}