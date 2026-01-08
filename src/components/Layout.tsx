import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/pdfs': return 'PDF Files';
      case '/docs': return 'Word Documents';
      case '/projects': return 'Projects';
      default: return 'Diya Pal Projects';
    }
  };

  return (
    <div className="flex bg-[#f0f4f8] min-h-screen font-sans selection:bg-[#FFD166] selection:text-black">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b-4 border-black p-4 flex items-center justify-between sticky top-0 z-10 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-black hover:bg-gray-100 rounded-xl border-2 border-transparent hover:border-black transition-all"
            >
              <Menu size={28} className="stroke-[2.5]" />
            </button>
            <h1 className="text-2xl font-black text-black">{getPageTitle()}</h1>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
