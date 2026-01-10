import { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Users, Image as ImageIcon, Tag } from "lucide-react";

export function CreateEventView({ onBack, onSubmit, isLoading }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Muzyka");

  const [errors, setErrors] = useState({});

  const categories = [
    "Muzyka", "Technologia", "Jedzenie", "Sport", "Sztuka",
    "Business", "Wellness", "Teatr", "Gaming", "Film",
    "Moda", "Książki", "Inne"
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!name || name.length < 3) newErrors.name = "Nazwa musi mieć minimum 3 znaki";
    if (!description || description.length < 10) newErrors.description = "Opis musi mieć minimum 10 znaków";
    if (!location || location.length < 3) newErrors.location = "Lokalizacja jest wymagana";
    if (!startDate) newErrors.startDate = "Data rozpoczęcia jest wymagana";
    if (!endDate) newErrors.endDate = "Data zakończenia jest wymagana";
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = "Data zakończenia musi być po dacie rozpoczęcia";
    }

    const participants = parseInt(maxParticipants);
    if (!maxParticipants || isNaN(participants) || participants < 1) {
      newErrors.maxParticipants = "Podaj poprawną liczbę uczestników";
    }

    if (!imageUrl) newErrors.imageUrl = "URL zdjęcia jest wymagany";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Przekazujemy dane do rodzica (Page)
      onSubmit({
        name,
        description,
        location,
        startDate,
        endDate,
        maxParticipants: parseInt(maxParticipants),
        imageUrl,
        category,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          type="button"
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#9893da] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Powrót</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#544e61] mb-2 text-2xl font-bold">Utwórz nowe wydarzenie</h1>
          <p className="text-gray-600">Wypełnij poniższy formularz, aby stworzyć wydarzenie</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Nazwa wydarzenia *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`block w-full px-4 py-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]`}
                placeholder="Np. Koncert Muzyki Elektronicznej"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2 font-medium">Opis *</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 500) {
                    setDescription(value);
                    setErrors(prev => ({ ...prev, description: "" }));
                  } else {
                    setErrors(prev => ({ ...prev, description: "Opis nie może mieć więcej niż 500 znaków" }));
                  }
                }}
                rows={4}
                className={`block w-full px-4 py-3 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da] resize-none`}
                placeholder="Opisz swoje wydarzenie..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              <p className="mt-1 text-sm text-gray-500 text-right">{description.length}/500</p>
            </div>


            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-gray-700 mb-2 font-medium">Lokalizacja *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]`}
                  placeholder="Np. Klub Muzyczny 'Scena', Warszawa"
                />
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-gray-700 mb-2 font-medium">Data rozpoczęcia *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`block w-full pl-10 pr-4 py-3 border ${errors.startDate ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]`}
                  />
                </div>
                {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
              </div>

              <div>
                <label htmlFor="endDate" className="block text-gray-700 mb-2 font-medium">Data zakończenia *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`block w-full pl-10 pr-4 py-3 border ${errors.endDate ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]`}
                  />
                </div>
                {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
              </div>
            </div>

            {/* Participants */}
            <div>
              <label htmlFor="maxParticipants" className="block text-gray-700 mb-2 font-medium">Maksymalna liczba uczestników *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="maxParticipants"
                  type="number"
                  min="1"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 border ${errors.maxParticipants ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]`}
                  placeholder="Np. 100"
                />
              </div>
              {errors.maxParticipants && <p className="mt-1 text-sm text-red-500">{errors.maxParticipants}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-gray-700 mb-2 font-medium">URL zdjęcia *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 border ${errors.imageUrl ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]`}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}

              {imageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Podgląd:</p>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                  />
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">Kategoria *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da] appearance-none bg-white cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Anuluj
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-[#9893da] hover:bg-[#a9a4e5] text-white rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
              >
                {isLoading ? "Tworzenie..." : "Utwórz wydarzenie"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}