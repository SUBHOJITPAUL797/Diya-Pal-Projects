import { useState } from 'react';
import { files } from '../data/files';
import { FileCard } from '../components/FileCard';
import { Download } from 'lucide-react';

export const PdfList = () => {
  const pdfFiles = files.filter(f => f.type === 'pdf');
  const [selectedFile, setSelectedFile] = useState(pdfFiles[0]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* List */}
      <div className="w-full md:w-1/3 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
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
      <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col border-4 border-black h-[calc(100vh-6rem)]">
        {selectedFile ? (
            <>
                <div className="bg-[#FFD166] p-4 border-b-4 border-black flex justify-between items-center z-10">
                    <h3 className="font-black text-black text-lg truncate">{selectedFile.name}</h3>
                     <a href={selectedFile.path} download className="flex items-center gap-2 text-sm font-black text-white bg-black px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]">
                        <Download size={18} className="stroke-[3]" /> Download
                    </a>
                </div>
                <iframe 
                    src={selectedFile.path} 
                    className="w-full h-full bg-gray-100" 
                    title="PDF Viewer"
                />
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
