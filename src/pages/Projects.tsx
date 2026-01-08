import { useState, useEffect } from 'react';
import { files } from '../data/files';
import { FileCard } from '../components/FileCard';
import { FolderKanban, FileSpreadsheet, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

type Category = 'Excel' | 'Word' | null;

export const Projects = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category as Category);
      // Clear state so back button works as expected later
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const filteredFiles = files.filter(file => {
    if (selectedCategory === 'Excel') return file.type === 'xlsx';
    if (selectedCategory === 'Word') return file.type === 'docx';
    return false;
  });

  const categories = [
    {
      id: 'excel',
      name: "Excel Projects",
      type: 'Excel' as Category,
      icon: FileSpreadsheet,
      bg: 'bg-[#CAFFBF]', // Pastel Green
      border: 'border-black',
      description: "Manage and view your spreadsheet documents.",
      count: files.filter(f => f.type === 'xlsx').length
    },
    {
      id: 'word',
      name: "Word Projects",
      type: 'Word' as Category,
      icon: FileText,
      bg: 'bg-[#A0C4FF]', // Pastel Blue
      border: 'border-black',
      description: "Manage and view your word documents.",
      count: files.filter(f => f.type === 'docx').length
    }
  ];

  if (selectedCategory) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </button>

        <div className="bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-6">
            <div className={`p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${selectedCategory === 'Excel' ? 'bg-[#CAFFBF]' : 'bg-[#A0C4FF]'}`}>
                {selectedCategory === 'Excel' ? <FileSpreadsheet size={32} className="stroke-[2.5]" /> : <FileText size={32} className="stroke-[2.5]" />}
            </div>
            <div>
                <h2 className="text-3xl font-black text-black">{selectedCategory} Projects</h2>
                <p className="text-gray-600 font-bold">Showing all {selectedCategory} related files</p>
            </div>
        </div>

        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map(file => (
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
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border-4 border-black border-dashed">
            <FolderKanban size={64} className="mx-auto text-gray-300 mb-4 stroke-[1.5]" />
            <h3 className="text-xl font-black text-gray-800">No {selectedCategory} files found</h3>
            <p className="text-gray-500 font-medium">Try adding some files to the public/files directory.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
         <h2 className="text-4xl font-black text-black tracking-tight">Projects</h2>
         <p className="text-gray-600 font-bold mt-2 text-lg">Select a category to view your work.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map(cat => (
          <div 
            key={cat.id} 
            onClick={() => setSelectedCategory(cat.type)}
            className={`p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group ${cat.bg}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                <cat.icon size={40} className="stroke-[2.5]" />
              </div>
              <span className="text-sm font-black px-4 py-2 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {cat.count} Files
              </span>
            </div>
            <h3 className="text-3xl font-black text-black mb-2">{cat.name}</h3>
            <p className="text-gray-800 font-bold mb-6">{cat.description}</p>
            <div className="flex items-center text-black font-black text-lg group-hover:translate-x-2 transition-transform">
                Browse Files <ArrowRight size={24} className="ml-2 stroke-[3]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};