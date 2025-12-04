import { Music, Brush, Coffee, Activity, Briefcase, Theater, Cpu, Heart, Gamepad, Film, ShoppingBag, BookOpen, MoreHorizontal } from "lucide-react";

export default function CategoryBar({ selected, onSelect }) {
  const categories = [
    { id: "all", label: "Wszystkie", icon: MoreHorizontal },
    { id: "music", label: "Muzyka", icon: Music },
    { id: "art", label: "Sztuka", icon: Brush },
    { id: "food", label: "Jedzenie", icon: Coffee },
    { id: "sport", label: "Sport", icon: Activity },
    { id: "business", label: "Biznes", icon: Briefcase },
    { id: "theatre", label: "Teatr", icon: Theater },
    { id: "tech", label: "Technologia", icon: Cpu },
    { id: "wellness", label: "Wellness", icon: Heart },
    { id: "gaming", label: "Gaming", icon: Gamepad },
    { id: "film", label: "Film", icon: Film },
    { id: "fashion", label: "Moda", icon: ShoppingBag },
    { id: "books", label: "Książki", icon: BookOpen },
    { id: "other", label: "Inne", icon: MoreHorizontal },
  ];

  return (
    <div style={{
      display: "flex",
      gap: "12px",
      marginBottom: "20px",
      overflowX: "auto",
      paddingBottom: "10px",
      paddingTop: "5px",
      position: "relative",
      flexWrap: "wrap"
    }}>
      {categories.map(cat => {
        const Icon = cat.icon;
        return (
          <div
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "10px",
              borderColor: "#E5E7EB",
              background: selected === cat.id ? "#9893DA" : "#FFFFFF",
              color: selected === cat.id ? "white" : "#333",
              fontFamily: "Arimo",
              fontSize: "14px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              outline: "1.11px solid #E5E7EB",
              outlifetOffset: "-1.11px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.10)"

            }}
          >
            <Icon size={16} /> {cat.label}
          </div>
        );
      })}
    </div>
  );
}
