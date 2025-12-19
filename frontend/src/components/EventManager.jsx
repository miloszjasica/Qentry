import { useState, useEffect, useCallback } from "react";
import { X, Users, User, CreditCard, Download, Plus, Ticket, Trash2, Edit2 } from "lucide-react";

const roleConfig = {
  guest: { 
    icon: Users, 
    bgColor: "bg-blue-100", 
    color: "text-blue-700",
    label: "Gość"
  },
  staff: { 
    icon: User, 
    bgColor: "bg-gray-100", 
    color: "text-gray-700",
    label: "Personel"
  },
  token_taker: { 
    icon: Download, 
    bgColor: "bg-green-100", 
    color: "text-green-700",
    label: "Pobierający tokeny"
  },
  token_seller: { 
    icon: CreditCard, 
    bgColor: "bg-yellow-100", 
    color: "text-yellow-700",
    label: "Kasjer"
  },
};

export function EventManager({ eventId, eventTitle, onClose, onUpdateRole, refreshCounter = 0 }) {
  const [participants, setParticipants] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attractionsLoading, setAttractionsLoading] = useState(false);
  const [searchQuery] = useState("");
  const [isUpdating, setIsUpdating] = useState({});
  const [activeTab, setActiveTab] = useState("participants");
  const [showAddAttractionModal, setShowAddAttractionModal] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: 0,
    is_active: true
  });
  const [newAttraction, setNewAttraction] = useState({
    name: "",
    description: "",
    price: 0,
    is_active: true
  });

  const fetchParticipants = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    const token = localStorage.getItem("access");

    try {
      const res = await fetch(
        `http://localhost:8000/api/tokens/events/${eventId}/roles/`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      if (!res.ok) throw new Error("Błąd pobierania uczestników");

      const data = await res.json();
      
      const normalizedParticipants = data.map(participant => ({
        ...participant,
        role: participant.user_role || participant.role
      }));
      
      setParticipants(normalizedParticipants);
    } catch (err) {
      console.error("Błąd pobierania uczestników:", err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

    const fetchAttractions = useCallback(async (force = false) => {
    if (!eventId) return;
    
    setAttractionsLoading(true);
    const token = localStorage.getItem("access");

    try {
        const res = await fetch(
        `http://localhost:8000/events/${eventId}/attractions/`,
        { 
            headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
            } 
        }
        );

        if (res.ok) {
        const data = await res.json();
        setAttractions(data);
        }
    } catch (err) {
        console.error("Błąd pobierania atrakcji:", err);
    } finally {
        setAttractionsLoading(false);
    }
    }, [eventId]);

  const handleAddAttraction = async () => {
    if (!newAttraction.name.trim()) {
      alert("Nazwa atrakcji jest wymagana");
      return;
    }

    const token = localStorage.getItem("access");
    
    try {
      const res = await fetch(
        `http://localhost:8000/events/${eventId}/attractions/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAttraction),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Błąd dodawania atrakcji");
      }

      setNewAttraction({
        name: "",
        description: "",
        price: 0,
        is_active: true
      });
      
      setShowAddAttractionModal(false);
      
      fetchAttractions();
      
    } catch (err) {
      console.error("Błąd dodawania atrakcji:", err);
      alert(`Błąd: ${err.message}`);
    }
  };

  const startEditing = (attraction) => {
    setEditingAttraction(attraction.id_attraction);
    setEditForm({
      name: attraction.name || "",
      description: attraction.description || "",
      price: attraction.price || 0,
      is_active: attraction.is_active !== false 
    });
  };

  const cancelEditing = () => {
    setEditingAttraction(null);
    setEditForm({
      name: "",
      description: "",
      price: 0,
      is_active: true
    });
  };

  const saveAttractionEdit = async (attractionId) => {
    if (!editForm.name.trim()) {
      alert("Nazwa atrakcji jest wymagana");
      return;
    }

    const token = localStorage.getItem("access");
    
    try {
      const res = await fetch(
        `http://localhost:8000/attractions/${attractionId}/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Błąd aktualizacji atrakcji");
      }

      setEditingAttraction(null);
      
      fetchAttractions();
      
    } catch (err) {
      console.error("Błąd aktualizacji atrakcji:", err);
      alert(`Błąd: ${err.message}`);
    }
  };

  const handleDeleteAttraction = async (attractionId, attractionName) => {
    if (!window.confirm(`Czy na pewno chcesz usunąć atrakcję "${attractionName || 'bez nazwy'}"?`)) return;

    const token = localStorage.getItem("access");
    
    try {
      const res = await fetch(
        `http://localhost:8000/attractions/${attractionId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        // Refresh list of attracitons
        fetchAttractions();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Błąd usuwania atrakcji");
      }
    } catch (err) {
      console.error("Błąd usuwania atrakcji:", err);
      alert(`Błąd usuwania atrakcji: ${err.message}`);
    }
  };

  useEffect(() => {
    if (activeTab === "participants") {
      fetchParticipants();
    } else if (activeTab === "attractions") {
      fetchAttractions();
    }
  }, [eventId, refreshCounter, activeTab, fetchParticipants, fetchAttractions]);

  const handleRoleUpdate = async (email, newRole, participantId) => {
    if (!onUpdateRole) return;

    setIsUpdating(prev => ({ ...prev, [email]: true }));

    try {
      await onUpdateRole(email, newRole);
      
      setParticipants(prevParticipants =>
        prevParticipants.map(participant =>
          participant.email === email
            ? { ...participant, role: newRole }
            : participant
        )
      );

      setTimeout(() => {
        fetchParticipants();
      }, 300);

    } catch (error) {
      console.error("Błąd aktualizacji roli:", error);
    } finally {
      setIsUpdating(prev => ({ ...prev, [email]: false }));
    }
  };

  const filteredParticipants = participants.filter((p) =>
    p.email && p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[#544e61] text-xl mb-1">Zarządzanie wydarzeniem - <span className="text-gray-600 font-bold">{eventTitle}</span></h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="flex gap-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("participants")}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === "participants"
                    ? "bg-[#9893da] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Uczestnicy ({participants.length})
              </button>
              <button
                onClick={() => setActiveTab("attractions")}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === "attractions"
                    ? "bg-[#9893da] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Ticket className="w-4 h-4 inline mr-2" />
                Atrakcje ({attractions.length})
              </button>
            </div>
          </div>
        </div>
        {activeTab === "participants" ? (
          loading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9893da] mb-4"></div>
              <p className="text-gray-600">Ładowanie listy uczestników...</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {participants.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">Brak uczestników</p>
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                      Nie znaleziono żadnych uczestników dla tego wydarzenia.
                    </p>
                  </div>
                ) : filteredParticipants.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-2">Nie znaleziono uczestników</p>
                    <p className="text-sm text-gray-400">
                      Brak wyników dla zapytania: "{searchQuery}"
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 text-sm text-gray-500 flex justify-between items-center">
                      <span>
                        {filteredParticipants.length} {filteredParticipants.length === 1 ? "uczestnika/uczestniczkę" : "uczestników"}
                      </span>
                    </div>
                    
                    {filteredParticipants.map((participant) => {
                      const roleInfo = roleConfig[participant.role] || roleConfig.guest;
                      const RoleIcon = roleInfo.icon;
                      const isUpdatingUser = isUpdating[participant.email];

                      return (
                        <div
                          key={participant.id || participant.email}
                          className={`bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow flex items-center justify-between ${
                            isUpdatingUser ? 'opacity-75' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#9893da] flex items-center justify-center text-white flex-shrink-0">
                              {participant.email?.charAt(0).toUpperCase() || "?"}
                            </div>
                            <div>
                              <h3 className="text-gray-900 truncate font-medium">
                                {participant.email || "Brak email"}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm px-2 py-0.5 rounded ${roleInfo.bgColor} ${roleInfo.color}`}>
                                  {roleInfo.label}
                                </span>
                                {isUpdatingUser && (
                                  <div className="w-4 h-4 border-2 border-[#9893da] border-t-transparent rounded-full animate-spin"></div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="relative">
                            <select
                              value={participant.role || "guest"}
                              onChange={(e) => {
                                handleRoleUpdate(participant.email, e.target.value, participant.id);
                              }}
                              disabled={isUpdatingUser}
                              className={`appearance-none pl-3 pr-8 py-2 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9893da] ${roleInfo.bgColor} ${roleInfo.color} ${
                                isUpdatingUser ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              <option value="guest">Gość</option>
                              <option value="staff">Personel</option>
                              <option value="token_taker">Pobierający tokeny</option>
                              <option value="token_seller">Kasjer</option>
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                              {isUpdatingUser ? (
                                <div className="w-4 h-4 border-2 border-[#9893da] border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <RoleIcon className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )
        ) : (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Atrakcje dla wydarzenia:
              </div>
              <button
                onClick={() => setShowAddAttractionModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#9893da] hover:bg-[#a9a4e5] text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Dodaj atrakcję
              </button>
            </div>

            {/* Attractions List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {attractionsLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9893da]"></div>
                </div>
              ) : attractions.length === 0 ? (
                <div className="text-center py-12">
                  <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Brak atrakcji</p>
                  <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
                    Dodaj atrakcje aby uczestnicy mogli je zakupić podczas wydarzenia.
                  </p>
                  <button
                    onClick={() => setShowAddAttractionModal(true)}
                    className="px-4 py-2 bg-[#9893da] hover:bg-[#a9a4e5] text-white rounded-lg transition-colors"
                  >
                    Dodaj pierwszą atrakcję
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {attractions.map((attraction) => (
                    <div
                      key={attraction.id_attraction}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      {editingAttraction === attraction.id_attraction ? (
                        /* editing */
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">Edycja atrakcji</h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => saveAttractionEdit(attraction.id_attraction)}
                                className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                              >
                                Zapisz
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="flex items-center gap-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                              >
                                Anuluj
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nazwa *
                            </label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Opis
                            </label>
                            <textarea
                              value={editForm.description}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]"
                              rows={2}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cena (Tokeny)
                              </label>
                              <input
                                type="number"
                                value={editForm.price}
                                onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value) || 0})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]"
                                min="0"
                                step="0.01"
                              />
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`active-${attraction.id_attraction}`}
                                checked={editForm.is_active}
                                onChange={(e) => setEditForm({...editForm, is_active: e.target.checked})}
                                className="w-4 h-4 text-[#9893da] border-gray-300 rounded focus:ring-[#9893da]"
                              />
                              <label htmlFor={`active-${attraction.id_attraction}`} className="ml-2 text-sm text-gray-700">
                                Aktywna
                              </label>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-medium text-gray-900">
                                {attraction.name}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                attraction.is_active 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {attraction.is_active ? 'Aktywna' : 'Nieaktywna'}
                              </span>
                            </div>
                            
                            {attraction.description && (
                              <p className="text-gray-600 mb-3">
                                {attraction.description}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-medium text-[#9893da]">
                                {attraction.price ? `${attraction.price} zł` : 'Bezpłatna'}
                              </span>
                              <span className="text-gray-500">
                                Zakupów: {attraction.counter || 0}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditing(attraction)}
                              className="p-2 text-[#9893da]  hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edytuj atrakcję"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAttraction(attraction.id_attraction, attraction.name)}
                              className="p-2 text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Usuń atrakcję"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#9893da] hover:bg-[#a9a4e5] text-white rounded-lg transition-colors"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>

      {/* Adding attractions */}
      {showAddAttractionModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Dodaj nową atrakcję</h3>
              <button
                onClick={() => setShowAddAttractionModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa atrakcji *
                </label>
                <input
                  type="text"
                  value={newAttraction.name}
                  onChange={(e) => setNewAttraction({...newAttraction, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]"
                  placeholder="Nazwa atrakcji"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opis
                </label>
                <textarea
                  value={newAttraction.description}
                  onChange={(e) => setNewAttraction({...newAttraction, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]"
                  placeholder="Opis atrakcji"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cena (Tokeny)
                </label>
                <input
                  type="number"
                  value={newAttraction.price}
                  onChange={(e) => setNewAttraction({...newAttraction, price: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9893da]"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={newAttraction.is_active}
                  onChange={(e) => setNewAttraction({...newAttraction, is_active: e.target.checked})}
                  className="w-4 h-4 text-[#9893da] border-gray-300 rounded focus:ring-[#9893da]"
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                  Atrakcja aktywna
                </label>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowAddAttractionModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={handleAddAttraction}
                className="px-4 py-2 bg-[#9893da] hover:bg-[#a9a4e5] text-white rounded-lg transition-colors"
              >
                Dodaj atrakcję
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}