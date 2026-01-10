import { useState, useEffect } from "react";
import { X, User, Image as ImageIcon, Save, Upload } from "lucide-react";

export function EditProfileModal({
  isOpen,
  onClose,
  currentName,
  currentPhotoUrl = "",
  onSave,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      const safeName = currentName || "";
      const nameParts = safeName.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setPreviewUrl(currentPhotoUrl || "");
      setSelectedFile(null);
      setErrors({});
    }
  }, [isOpen, currentName, currentPhotoUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstName || firstName.length < 2) newErrors.firstName = "Imię za krótkie";
    if (!lastName || lastName.length < 2) newErrors.lastName = "Nazwisko za krótkie";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(firstName, lastName, selectedFile);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-[#544e61]">Edytuj profil</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Sekcja zdjęcia */}
            <div className="flex flex-col items-center mb-2">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#9893da] flex items-center justify-center mb-3 relative group">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}

                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                   <Upload className="w-6 h-6 text-white" />
                   <input
                     type="file"
                     className="hidden"
                     accept="image/*"
                     onChange={handleFileChange}
                   />
                </label>
              </div>
              <p className="text-sm text-gray-500">Kliknij zdjęcie aby zmienić</p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Imię *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9893da]"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Nazwisko *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9893da]"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg">Anuluj</button>
            <button type="submit" className="flex-1 px-4 py-3 bg-[#9893da] text-white rounded-lg flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}