import { Bell, Search } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Disaster Risk Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          District-level relocation intelligence
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            className="ml-2 w-48 bg-transparent text-sm outline-none"
            placeholder="Search habitation..."
          />
        </div>

        <button className="rounded-xl p-2 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          SA
        </div>
      </div>
    </header>
  );
}