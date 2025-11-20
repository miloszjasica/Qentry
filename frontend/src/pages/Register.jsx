import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import LogoutButton from "../components/LogoutButton";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "", surname: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setSuccess(true);
      setError(null);

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
        let messages = [];
        for (const key in backendErrors) {
          const value = backendErrors[key];
          if (Array.isArray(value)) {
            messages.push(`${key}: ${value.join(", ")}`);
          } else {
            messages.push(`${key}: ${value}`);
          }
        }
        setError(messages.join(" | "));
      } else {
        setError("Błąd rejestracji. Sprawdź dane.");
      }
      setSuccess(false);
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
        <h2 className="text-2xl font-bold mb-6 text-center">Rejestracja</h2>

        {success && <p className="text-green-600 text-center mb-3">Rejestracja udana!</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" type="text" placeholder="Imię" value={form.name} onChange={handleChange} className="w-full p-3 border rounded-xl" />
          <input name="surname" type="text" placeholder="Nazwisko" value={form.surname} onChange={handleChange} className="w-full p-3 border rounded-xl" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 border rounded-xl" />
          <input name="password" type="password" placeholder="Hasło" value={form.password} onChange={handleChange} className="w-full p-3 border rounded-xl" />
          <button type="submit" className="w-full p-3 rounded-xl bg-black text-white font-semibold">Zarejestruj</button>
        </form>
      </div>
    </motion.div>
  );
}