import { files, projects } from '../data/files';
import { FileCard } from '../components/FileCard';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, FileType, FolderKanban } from 'lucide-react';

export const Home = () => {
  const recentFiles = files.slice(0, 3);
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <header className="bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-4xl font-black text-black tracking-tight">Dashboard</h2>
        <p className="text-gray-600 font-bold mt-2 text-lg">Welcome back! 👋 Here's your creative space.</p>
      </header>

      {/* Stats / Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/pdfs" className="bg-[#FFADAD] p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-white border-2 border-black rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <FileType size={32} className="stroke-[2.5]" />
            </div>
            <div className="bg-black text-white p-2 rounded-full transform group-hover:rotate-[-45deg] transition-transform">
               <ArrowRight size={20} />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-4xl font-black text-black">{files.filter(f => f.type === 'pdf').length}</h3>
            <p className="text-black font-bold text-lg">PDF Files</p>
          </div>
        </Link>

        <Link to="/docs" className="bg-[#A0C4FF] p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-white border-2 border-black rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <FileText size={32} className="stroke-[2.5]" />
            </div>
             <div className="bg-black text-white p-2 rounded-full transform group-hover:rotate-[-45deg] transition-transform">
               <ArrowRight size={20} />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-4xl font-black text-black">{files.filter(f => f.type === 'docx').length}</h3>
            <p className="text-black font-bold text-lg">Word Documents</p>
          </div>
        </Link>

         <Link to="/projects" className="bg-[#BDB2FF] p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-white border-2 border-black rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <FolderKanban size={32} className="stroke-[2.5]" />
            </div>
             <div className="bg-black text-white p-2 rounded-full transform group-hover:rotate-[-45deg] transition-transform">
               <ArrowRight size={20} />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-4xl font-black text-black">{projects.length}</h3>
            <p className="text-black font-bold text-lg">Active Projects</p>
          </div>
        </Link>
      </div>

      {/* Recent Files */}
      <section>
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black text-black mb-6 flex items-center gap-2">
                <span className="bg-[#FDFFB6] px-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 inline-block">Recent</span> 
                Files
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentFiles.map(file => (
                <FileCard 
                    key={file.id} 
                    {...file} 
                                    onView={() => {
                                        if(file.type === 'pdf') navigate('/pdfs');
                                        else if(file.type === 'docx') navigate('/docs');
                                        else navigate('/projects', { state: { category: 'Excel' } });
                                    }} 
                                    onDownload={() => {                    const link = document.createElement('a');
                    link.href = file.path;
                    link.download = file.name;
                    link.click();
                    }}
                />
            ))}
            </div>
        </div>
      </section>
    </div>
  );
};
