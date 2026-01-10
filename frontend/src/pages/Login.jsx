import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // Zakładam, że ścieżka do API jest poprawna
import LogoutButton from "../components/LogoutButton"; // Zakładam, że komponent istnieje
import { LoginView } from "../components/LoginView"; // Importujemy nowy komponent

export default function Login() {
  // UWAGA: Stan email i password przeniesiono do LoginView
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (email, password) => {
    try {
      // Wywołanie API z danymi z LoginView
      const res = await login(email, password);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      window.dispatchEvent(new Event("auth-change"));
      setApiError(null);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        // Przygotowanie błędu do wyświetlenia w LoginView
        setApiError(JSON.stringify(err.response.data));
      } else {
        setApiError("Błąd logowania. Spróbuj ponownie.");
      }
    }
  };

  const handleBack = () => {
    navigate("/"); // Zgodnie z Twoją logiką
  };

  const handleSwitchToRegister = () => {
    navigate("/register"); // Zakładam, że masz ścieżkę do rejestracji
  };

  const isLoggedIn = !!localStorage.getItem("access");

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-center text-xl font-semibold mb-4">
          Jesteś już zalogowany
        </p>
        {/* Zakładam, że LogoutButton ma odpowiednie style */}
        <LogoutButton />
      </div>
    );
  }

  return (
    <LoginView
      onLoginSubmit={handleLoginSubmit}
      apiError={apiError}
      onBack={handleBack}
      onSwitchToRegister={handleSwitchToRegister}
    />
  );
}