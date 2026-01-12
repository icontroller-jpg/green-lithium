export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        © {new Date().getFullYear()} GreenLithium. Powering a sustainable future.
      </div>
    </footer>
  );
}
