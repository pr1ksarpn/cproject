import { useMemo, useState } from 'react';
import axios from 'axios';

import FileUpload from './components/FileUpload';
import ConversionProgress from './components/ConversionProgress';
import ImagePreview from './components/ImagePreview';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const [conversionErrors, setConversionErrors] = useState([]);
  const [converted, setConverted] = useState([]);

  const hasResults = useMemo(() => converted.length > 0, [converted]);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files || []));
  };

  const handleConvert = async () => {
    if (!files.length) {
      return;
    }

    setError('');
    setConversionErrors([]);
    setConverted([]);
    setProgress(0);
    setIsConverting(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/convert`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          if (!event.total) {
            setProgress(50);
            return;
          }

          const uploaded = (event.loaded / event.total) * 100;
          setProgress(uploaded);
        },
      });

      setProgress(100);
      setConverted(data.files || []);
      setConversionErrors(data.errors || []);

      if (!(data.files || []).length) {
        setError('No files were converted. Please check your documents and try again.');
      }
    } catch {
      setError('Conversion failed. Please ensure the server is running and files are valid.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Word to JPG Converter</h1>
        <p className="text-slate-600">Upload .doc/.docx files, preview pages, and download JPG output.</p>
      </div>

      <div className="space-y-6">
        <FileUpload
          files={files}
          onFileChange={handleFileChange}
          onConvert={handleConvert}
          disabled={isConverting}
        />

        <ConversionProgress progress={progress} active={isConverting} />

        {error ? <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}

        {conversionErrors.length ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="mb-2 text-sm font-semibold text-amber-900">Some files could not be converted:</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-amber-800">
              {conversionErrors.map((item) => (
                <li key={`${item.file}-${item.message}`}>
                  {item.file}: {item.message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {hasResults ? <ImagePreview files={converted} /> : null}
      </div>
    </main>
  );
}
