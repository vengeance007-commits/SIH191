interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
  Immediate: "bg-red-100 text-red-700",
  "Short-term": "bg-orange-100 text-orange-700",
  "Medium-term": "bg-yellow-100 text-yellow-700",
  Info: "bg-blue-100 text-blue-700",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        statusStyles[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}