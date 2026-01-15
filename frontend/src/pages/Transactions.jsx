import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TransactionCard from "../components/TransactionCard";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("access");
      if (!token) return setError("Musisz być zalogowany");

      try {
        const res = await fetch("http://localhost:8000/api/tokens/transactions/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Błąd pobierania transakcji");

        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        console.error(err);
        setError("Nie udało się pobrać transakcji");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const navigate = useNavigate();

  function onBack() {
    navigate("/profil");
  }

  if (loading) return <div style={{ padding: 24 }}>Ładowanie transakcji...</div>;
  if (error) return <div style={{ padding: 24, color: "red" }}>{error}</div>;
  if (transactions.length === 0) return <div style={{ padding: 24 }}>Brak transakcji</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#9893da] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Wróć do profilu</span>
        </button>
      {transactions.map((t) => {
        const isTopUp = t.type === "topup";

        const value = isTopUp
          ? Number(t.amount)
          : Number(t.price);

        return (
          <TransactionCard
            key={t.id_transaction}
            transaction={{
              title: isTopUp
                ? "Doładowanie tokenów"
                : t.attraction_name || "Atrakcja",
              subtitle: t.event_name || "-",
              transactionDate: new Date(t.date).toLocaleString("pl-PL"),
              transactionId: t.id_transaction,
              value,
              isTopUp,
            }}
          />
        );
      })}
    </div>
  );
}
