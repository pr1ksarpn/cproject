export default function ConversionProgress({ progress, active }) {
  if (!active) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
      <p className="mb-2 text-sm font-medium text-indigo-900">Converting documents...</p>
      <div className="h-3 w-full overflow-hidden rounded-full bg-indigo-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-200"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-indigo-700">{Math.round(progress)}%</p>
    </section>
  );
}
