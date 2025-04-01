import Weather from "../../components/Weather";

export default function WeatherPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weather Information</h1>
      <Weather />
    </div>
  );
}
