import { useState } from "react";

export default function EventQR({ qrId }) {
  const [showQR, setShowQR] = useState(false);

  const qrUrl = `/api/tokens/qr/${qrId}/image/`; // Twój endpoint

  return (
    <div>
      <button
        onClick={() => setShowQR(!showQR)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showQR ? "Ukryj QR" : "Pokaż QR"}
      </button>

      {showQR && (
        <div className="mt-4">
          <img src={qrUrl} alt="QR Code" className="border p-2 rounded shadow-md" />
        </div>
      )}
    </div>
  );
}
