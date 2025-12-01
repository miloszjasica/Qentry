export default function CategoryBar({ selected, onSelect }) {
  const categories = [
    { id: "all", label: "Wszystkie" },
    { id: "music", label: "Muzyka" },
    { id: "art", label: "Sztuka" },
    { id: "food", label: "Jedzenie" },
    { id: "sport", label: "Sport" },
    { id: "business", label: "Biznes" },
    { id: "theatre", label: "Teatr" },
    { id: "tech", label: "Technologia" },
    { id: "wellness", label: "Wellness" },
    { id: "gaming", label: "Gaming" },
    { id: "film", label: "Film" },
    { id: "fashion", label: "Moda" },
    { id: "books", label: "Książki" },
    { id: "other", label: "Inne" },
  ];

  return (
    <div style={{
      display: "flex",
      gap: "12px",
      marginBottom: "20px",
      overflowX: "auto",
      paddingBottom: "10px",
    }}>
      {categories.map(cat => (
        <div
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          style={{
            padding: "10px 16px",
            borderRadius: "14px",
            background: selected === cat.id ? "#544E61" : "#E5E3E8",
            color: selected === cat.id ? "white" : "#333",
            fontFamily: "Arimo",
            fontSize: "14px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {cat.label}
        </div>
      ))}
    </div>
  );
}
