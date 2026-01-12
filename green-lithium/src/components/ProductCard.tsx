export default function ProductCard() {
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <div className="flex gap-2 mb-3">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          Verified
        </span>
        <span className="text-xs bg-accent text-black px-2 py-1 rounded">
          Low CO₂
        </span>
      </div>
      <h3 className="font-semibold text-lg">LFP Battery 280Ah</h3>
      <p className="text-sm text-gray-500">China • CATL Partner</p>
      <p className="mt-2 text-sm">CO₂: 42 kg/kWh</p>
      <button className="mt-4 w-full bg-primary text-white py-2 rounded">
        Request Quote
      </button>
    </div>
  );
}
