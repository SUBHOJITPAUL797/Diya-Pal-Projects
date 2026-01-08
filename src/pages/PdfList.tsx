import { useState, useEffect, useRef } from 'react';
import { files } from '../data/files';
import { FileCard } from '../components/FileCard';
import { Download } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PdfList = () => {
  const pdfFiles = files.filter(f => f.type === 'pdf');
  const [selectedFile, setSelectedFile] = useState(pdfFiles[0]);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setContainerWidth(entry.contentRect.width); 
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="h-auto md:h-full flex flex-col md:flex-row gap-10">
      {/* List */}
      <div className="w-full md:w-1/3 overflow-y-auto pr-4 p-2 space-y-4 custom-scrollbar max-h-[35vh] md:max-h-full">
        <header className="bg-white border-4 border-black p-4 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          <h2 className="text-2xl font-black text-black">PDF Files</h2>
        </header>
        
        {pdfFiles.map(file => (
          <div 
            key={file.id} 
            onClick={() => setSelectedFile(file)}
            className={`cursor-pointer transition-transform duration-200 ${selectedFile?.id === file.id ? 'transform translate-x-2' : 'hover:translate-x-1'}`}
          >
            <div className={`
              ${selectedFile?.id === file.id 
                ? 'ring-4 ring-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#FFADAD]' 
                : 'hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'} 
              rounded-3xl overflow-hidden
            `}>
                <FileCard 
                    {...file} 
                    onView={() => setSelectedFile(file)} 
                    onDownload={() => {
                      const link = document.createElement('a');
                      link.href = file.path;
                      link.download = file.name;
                      link.click();
                    }}
                />
            </div>
          </div>
        ))}
      </div>

      {/* Viewer */}
      <div className="flex-none md:flex-1 bg-white rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col border-4 border-black h-auto md:h-[calc(100vh-6rem)]">
        {selectedFile ? (
            <>
                <div className="bg-[#FFD166] p-4 border-b-4 border-black flex justify-between items-center z-10">
                    <h3 className="font-black text-black text-lg truncate flex-1 mr-4">{selectedFile.name}</h3>
                     <a href={selectedFile.path} download className="flex items-center gap-2 text-sm font-black text-white bg-black px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] flex-shrink-0">
                        <Download size={18} className="stroke-[3]" /> <span className="hidden sm:inline">Download</span>
                    </a>
                </div>
                <div 
                    className="flex-1 bg-gray-100 overflow-auto flex justify-center p-2 md:p-4 relative" 
                    ref={containerRef}
                >
                    <Document
                        file={selectedFile.path}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="max-w-full"
                        loading={<div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-gray-500">Loading PDF...</div>}
                        error={<div className="absolute inset-0 flex items-center justify-center font-bold text-red-500">Failed to load PDF.</div>}
                    >
                        {numPages && (
                             <div className="flex flex-col gap-4">
                                {Array.from(new Array(numPages), (_, index) => (
                                    <Page 
                                        key={`page_${index + 1}`} 
                                        pageNumber={index + 1} 
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        width={containerWidth ? Math.min(containerWidth, 800) : undefined} 
                                        className="shadow-lg border-2 border-gray-200 bg-white"
                                    />
                                ))}
                             </div>
                        )}
                    </Document>
                </div>
            </>
        ) : (
            <div className="flex items-center justify-center h-full text-gray-400 font-bold text-xl bg-gray-50">
                Select a PDF to view
            </div>
        )}
      </div>
    </div>
  );
};