export default function FileUpload({ files, onFileChange, onConvert, disabled }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Upload Word Documents</h2>
        <p className="text-sm text-slate-500">Select one or more .doc/.docx files.</p>
        <input
          type="file"
          accept=".doc,.docx"
          multiple
          onChange={onFileChange}
          className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-700"
        />
        <p className="text-sm text-slate-600">
          {files.length ? `${files.length} file(s) selected` : 'No files selected yet.'}
        </p>
        <button
          type="button"
          disabled={disabled || files.length === 0}
          onClick={onConvert}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Convert to JPG
        </button>
      </div>
    </section>
  );
}
