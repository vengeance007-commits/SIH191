interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No data available.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
      <p className="text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}