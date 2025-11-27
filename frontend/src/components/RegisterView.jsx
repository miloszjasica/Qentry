import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User} from "lucide-react";
import { motion } from "framer-motion";

interface RegisterViewProps {
  // UWAGA: Funkcja przyjmuje teraz także pole wantsToBeOrganizer
  onRegisterSubmit: (formData: {
    email: string,
    password: string,
    name: string,
    surname: string,
    wants_to_be_organizer: boolean
  }) => void;
  apiError: string | null;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterView({ onRegisterSubmit, apiError, onBack, onSwitchToLogin }: RegisterViewProps) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wantsToBeOrganizer, setWantsToBeOrganizer] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {

    const newErrors = {};

    if (!name || name.length < 2) {
      newErrors.name = "Imię musi mieć min. 2 znaki";
    }
    if (!surname || surname.length < 2) {
      newErrors.surname = "Nazwisko musi mieć min. 2 znaki";
    }

    if (!email) {
      newErrors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Nieprawidłowy format email";
    }

    if (!password) {
      newErrors.password = "Hasło jest wymagane";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Przekazanie pełnego obiektu, W TYM NOWEGO POLA:
      onRegisterSubmit({
        name,
        surname,
        email,
        password,
        wants_to_be_organizer: wantsToBeOrganizer, // <-- NOWE POLE
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-md w-full">
        {/* ... (Pozostałe elementy: Powrót, Logo) ... */}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ... (Pola Imię, Nazwisko, Email, Hasło są bez zmian) ... */}

            {/* Pole Imię */}
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Imię</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da] focus:border-transparent`}
                  placeholder="Twoje imię"
                />
              </div>
              {errors.name && (<p className="mt-1 text-sm text-red-500">{errors.name}</p>)}
            </div>

            {/* Pole Nazwisko */}
            <div>
              <label htmlFor="surname" className="block text-gray-700 mb-2">Nazwisko</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  autoComplete="family-name"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.surname ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da] focus:border-transparent`}
                  placeholder="Twoje nazwisko"
                />
              </div>
              {errors.surname && (<p className="mt-1 text-sm text-red-500">{errors.surname}</p>)}
            </div>

            {/* Pole Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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
              {errors.email && (<p className="mt-1 text-sm text-red-500">{errors.email}</p>)}
            </div>

            {/* Pole Hasło */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Hasło</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
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
              {errors.password && (<p className="mt-1 text-sm text-red-500">{errors.password}</p>)}
            </div>

            <div className="flex items-center pt-2">
                <input
                    id="wants-organizer"
                    name="wants-organizer"
                    type="checkbox"
                    checked={wantsToBeOrganizer}
                    onChange={(e) => setWantsToBeOrganizer(e.target.checked)}
                    className="h-4 w-4 text-[#9893da] border-gray-300 rounded focus:ring-[#9893da]"
                />
                <label htmlFor="wants-organizer" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                    Chcę zostać Organizatorem wydarzeń
                </label>
            </div>


            {/* Przycisk Zarejestruj */}
            <button
              type="submit"
              className="w-full bg-[#9893da] hover:bg-[#7d78c4] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Zarejestruj się
            </button>
          </form>

          {/* Link Logowania */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">Masz już konto? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#9893da] hover:text-[#7d78c4] font-medium"
            >
              Zaloguj się
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}