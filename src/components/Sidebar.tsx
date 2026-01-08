import { NavLink } from 'react-router-dom';
import { FileText, FileType, LayoutDashboard, FolderKanban, X } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'PDF Files', to: '/pdfs', icon: FileType },
  { name: 'Word Documents', to: '/docs', icon: FileText },
  { name: 'Projects', to: '/projects', icon: FolderKanban },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "bg-[#FFD166] text-black min-h-screen p-4 border-r-4 border-black flex flex-col",
        "fixed md:static inset-y-0 left-0 z-30 w-72 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="mb-8 px-4 pt-6 flex justify-between items-center">
          <div className="flex items-center gap-3 bg-white border-2 border-black p-2 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <img 
              src="/site-logo.jpg" 
              alt="Logo" 
              className="w-10 h-10 rounded-full object-cover border-2 border-black"
            />
            <div>
              <h1 className="text-lg font-black leading-tight">
                Diya Pal<br/>Projects
              </h1>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden bg-white p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
            <X size={24} />
          </button>
        </div>
        
        <nav className="space-y-4 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200 group border-2 border-black font-bold",
                  isActive
                    ? "bg-[#EF476F] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white text-gray-800 hover:bg-[#118AB2] hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                )
              }
            >
              <item.icon size={24} className="group-hover:scale-110 transition-transform stroke-[2.5]" />
              <span className="text-lg">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-2 pt-10 pb-4">
          <a 
            href="https://subhojit-paul.pages.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-4 bg-[#06D6A0] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
          >
            <p className="text-[11px] font-black uppercase tracking-widest text-black/70 mb-1">Developed By</p>
            <p className="text-xl font-black text-black group-hover:underline">SUBHOJIT PAUL</p>
            <p className="text-[12px] font-bold text-black/60 mt-2 bg-white/30 rounded-lg py-1 px-2 border border-black/10">
              Click to view dev info ✨
            </p>
          </a>
        </div>
      </aside>
    </>
  );
};
