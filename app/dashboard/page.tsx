// app/dashboard/page.tsx
import Link from "next/link";
import Weather from "@/components/Weather";
import Crypto from "@/components/Crypto";
import News from "@/components/News";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">CryptoWeather Nexus</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weather Section */}
        <section className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Weather</h2>
          <Weather />
          <Link href="/weather" className="text-blue-500 hover:underline">
            View More
          </Link>
        </section>

        {/* Crypto Section */}
        <section className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Cryptocurrency</h2>
          <Crypto />
          <Link href="/crypto" className="text-blue-500 hover:underline">
            View More
          </Link>
        </section>

        {/* News Section */}
        <section className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Crypto News</h2>
          <News />
        </section>
      </div>
    </div>
  );
}
