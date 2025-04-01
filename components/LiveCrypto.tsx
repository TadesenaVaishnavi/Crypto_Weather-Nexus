"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LiveCrypto() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newBtcPrice = data.bitcoin;
      const newEthPrice = data.ethereum;

      // Check for significant price changes before updating state
      setBtcPrice((prevBtc) => {
        if (prevBtc !== null && Math.abs(newBtcPrice - prevBtc) > 100) {
          toast.success(`Bitcoin price changed significantly: $${newBtcPrice}`);
        }
        return newBtcPrice;
      });

      setEthPrice((prevEth) => {
        if (prevEth !== null && Math.abs(newEthPrice - prevEth) > 10) {
          toast.success(`Ethereum price changed significantly: $${newEthPrice}`);
        }
        return newEthPrice;
      });
    };

    return () => {
      socket.close();
    };
  }, []); // ✅ WebSocket connection only runs once

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Live Crypto Prices</h2>
      <p><strong>Bitcoin (BTC):</strong> {btcPrice ? `$${btcPrice.toFixed(2)}` : "Loading..."}</p>
      <p><strong>Ethereum (ETH):</strong> {ethPrice ? `$${ethPrice.toFixed(2)}` : "Loading..."}</p>
    </div>
  );
}
