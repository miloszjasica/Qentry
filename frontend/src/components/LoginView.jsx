import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface LoginViewProps {
  onLoginSubmit: (email: string, password: string) => void;
  apiError: string | null;
  onBack: () => void;
  onSwitchToRegister: () => void;
}

export function LoginView({ onLoginSubmit, apiError, onBack, onSwitchToRegister }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Walidacja Email
    if (!email) {
      newErrors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Nieprawidłowy format email";
    }

    // Walidacja Hasła
    if (!password) {
      newErrors.password = "Hasło jest wymagane";
    }
    // USUNIĘTO: else if (password.length < 6) { newErrors.password = "Hasło musi mieć minimum 6 znaków"; }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onLoginSubmit(email, password);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-md w-full">
        {/* Przycisk Powrót */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#9893da] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Powrót do strony głównej</span>
        </button>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#544e61] mb-2">QentRy</h2>
          <p className="text-gray-600">Zaloguj się do swojego konta</p>
        </div>

        {/* Karta Logowania */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Wyświetlanie błędu z API */}
          {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Pole Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da] focus:border-transparent`}
                  placeholder="twoj@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Pole Hasło */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Hasło
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da] focus:border-transparent`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Przycisk Zaloguj */}
            <button
              type="submit"
              className="w-full bg-[#9893da] hover:bg-[#7d78c4] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Zaloguj się
            </button>
          </form>

          {/* Link Rejestracji */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">Nie masz konta? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#9893da] hover:text-[#7d78c4] font-medium"
            >
              Zarejestruj się
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}