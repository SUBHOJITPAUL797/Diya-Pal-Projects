import { files } from '../data/files';
import { FileCard } from '../components/FileCard';
import { FileText } from 'lucide-react';

export const WordList = () => {
  const docFiles = files.filter(f => f.type === 'docx');

  return (
    <div className="space-y-8">
      <header className="bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
        <div className="p-4 bg-[#A0C4FF] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
           <FileText size={32} className="stroke-[2.5]" />
        </div>
        <div>
           <h2 className="text-3xl font-black text-black">Word Documents</h2>
           <p className="text-gray-600 font-bold">Download and view your documents.</p>
        </div>
      </header>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {docFiles.map(file => (
          <FileCard 
            key={file.id} 
            {...file} 
            onView={() => {
                 const link = document.createElement('a');
                link.href = file.path;
                link.download = file.name;
                link.click();
            }} 
            onDownload={() => {
                const link = document.createElement('a');
                link.href = file.path;
                link.download = file.name;
                link.click();
            }}
          />
        ))}
      </div>
      
      {/* Info Box */}
       <div className="bg-[#E0F7FA] border-4 border-black rounded-3xl p-8 flex items-start gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-4 bg-white border-2 border-black rounded-full text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FileText size={32} className="stroke-[2.5]" />
        </div>
        <div>
            <h3 className="text-xl font-black text-black">About Word Documents</h3>
            <p className="text-black font-medium mt-2 leading-relaxed">
                Word documents are available for direct download. 
                For the best viewing experience, please download and open in Microsoft Word.
            </p>
        </div>
      </div>
    </div>
  );
};
