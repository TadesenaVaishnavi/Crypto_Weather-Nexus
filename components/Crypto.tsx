"use client";

import { useEffect, useState } from "react";

export default function Crypto() {
  const [cryptoData, setCryptoData] = useState<any>(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_market_cap=true&include_24hr_change=true"
      );
      const data = await response.json();
      setCryptoData(data);
    };

    fetchCrypto();
  }, []);

  return (
    <div>
      {cryptoData ? (
        Object.keys(cryptoData).map((key, index) => (
          <div key={index} className="mb-4">
            <p><strong>{key.toUpperCase()}</strong></p>
            <p>Price: ${cryptoData[key].usd}</p>
            <p>24h Change: {cryptoData[key].usd_24h_change.toFixed(2)}%</p>
            <p>Market Cap: ${cryptoData[key].usd_market_cap.toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>Loading crypto data...</p>
      )}
    </div>
  );
}
