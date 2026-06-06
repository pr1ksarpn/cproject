const downloadDataUrl = (fileName, dataUrl) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function ImagePreview({ files }) {
  if (!files.length) {
    return null;
  }

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Converted JPG Images</h2>
      {files.map((file) => (
        <article key={file.fileName} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-medium text-slate-800">{file.fileName}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {file.images.map((image) => {
              const outputName = `${file.fileName.replace(/\.[^.]+$/, '')}-page-${image.page}.jpg`;
              return (
                <div key={`${file.fileName}-${image.page}`} className="rounded-xl border border-slate-100 p-3">
                  <img
                    src={image.dataUrl}
                    alt={`${file.fileName} page ${image.page}`}
                    className="h-auto max-h-96 w-full rounded-md border border-slate-100 object-contain"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Page {image.page}</span>
                    <button
                      type="button"
                      onClick={() => downloadDataUrl(outputName, image.dataUrl)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      Download JPG
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}
