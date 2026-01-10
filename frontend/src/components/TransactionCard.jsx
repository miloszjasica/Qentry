import {
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

export default function TransactionCard({ transaction }) {
  const { isTopUp, value } = transaction;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          {isTopUp ? (
            <ArrowUpCircle className="w-6 h-6 text-green-600 mt-1" />
          ) : (
            <ArrowDownCircle className="w-6 h-6 text-red-500 mt-1" />
          )}

          <div>
            <h3 className="font-semibold text-black">
              {transaction.title}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Calendar className="w-4 h-4" />
              <span>{transaction.subtitle}</span>
            </div>
          </div>
        </div>

        <div
          className={`text-lg font-semibold ${
            isTopUp ? "text-green-600" : "text-red-500"
          }`}
        >
          {isTopUp ? "+" : "-"}
          {value} tokenów
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Data transakcji</p>
          <p className="text-gray-900 font-medium">
            {transaction.transactionDate}
          </p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Typ</p>
          <p className="text-gray-900 font-medium">
            {isTopUp ? "Doładowanie" : "Zakup"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">ID transakcji</p>
          <p className="text-gray-900 font-mono text-xs">
            {transaction.transactionId}
          </p>
        </div>
      </div>
    </div>
  );
}
