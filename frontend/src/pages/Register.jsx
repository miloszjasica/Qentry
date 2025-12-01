import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { RegisterView } from "../components/RegisterView";
import LogoutButton from "../components/LogoutButton";
import { motion } from "framer-motion";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  // Funkcja odbierająca DANE Z FORMULARZA (w tym wants_to_be_organizer)
  const handleRegisterSubmit = async (formData) => {
    try {
      // formData teraz zawiera: { name, surname, email, password, wants_to_be_organizer }
      await registerUser(formData);
      setApiError(null);

      alert("Rejestracja udana! Zostaniesz przeniesiony do strony logowania.");
      navigate("/login");

    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
        let messages = [];
        for (const key in backendErrors) {
           messages.push(`${key}: ${Array.isArray(backendErrors[key]) ? backendErrors[key].join(", ") : backendErrors[key]}`);
        }
        setApiError(messages.join(" | "));
      } else {
        setApiError("Błąd rejestracji. Spróbuj ponownie.");
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("access");

  if (isLoggedIn) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-center text-xl font-semibold mb-4">
          Jesteś już zalogowany
        </p>
        <LogoutButton />
      </motion.div>
    );
  }

  return (
    <RegisterView
      onRegisterSubmit={handleRegisterSubmit}
      apiError={apiError}
      onBack={handleBack}
      onSwitchToLogin={handleSwitchToLogin}
    />
  );
}