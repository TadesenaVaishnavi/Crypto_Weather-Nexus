// app/crypto/page.tsx

import { FC } from "react";
import LiveCrypto from "@/components/LiveCrypto"; // Use absolute import (recommended)

const CryptoPage: FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crypto Page</h1>
      <LiveCrypto />
    </div>
  );
};

export default CryptoPage;
