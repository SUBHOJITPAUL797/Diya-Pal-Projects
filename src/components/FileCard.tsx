import { Download, Eye, FileText, FileType, FileSpreadsheet } from 'lucide-react';

interface FileCardProps {
  name: string;
  type: 'pdf' | 'docx' | 'xlsx';
  date: string;
  onView: () => void;
  onDownload: () => void;
}

export const FileCard = ({ name, type, date, onView, onDownload }: FileCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'pdf': return FileType;
      case 'xlsx': return FileSpreadsheet;
      default: return FileText;
    }
  };

  const getCardStyle = () => {
    switch (type) {
      case 'pdf': return 'bg-[#FFADAD] border-black'; // Pastel Red
      case 'xlsx': return 'bg-[#CAFFBF] border-black'; // Pastel Green
      default: return 'bg-[#A0C4FF] border-black'; // Pastel Blue
    }
  };

  const Icon = getIcon();
  const cardColor = getCardStyle();

  return (
    <div className={`p-5 rounded-3xl border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer ${cardColor} border-black group`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Icon size={28} className="text-black stroke-[2.5]" />
        </div>
        <div className="flex gap-2">
            {type !== 'docx' && (
              <button 
                  onClick={(e) => { e.stopPropagation(); onView(); }}
                  className="p-2 bg-white text-black border-2 border-black rounded-xl hover:bg-[#FDFFB6] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none" 
                  title="View"
              >
                  <Eye size={20} className="stroke-[2.5]" />
              </button>
            )}
             <button 
                onClick={(e) => { e.stopPropagation(); onDownload(); }}
                className="p-2 bg-white text-black border-2 border-black rounded-xl hover:bg-[#9BF6FF] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none" 
                title="Download"
            >
                <Download size={20} className="stroke-[2.5]" />
            </button>
        </div>
      </div>
      <h3 className="text-xl font-black text-black mb-1 truncate leading-tight" title={name}>{name}</h3>
      <p className="text-sm font-bold text-gray-700">{date}</p>
      <div className="mt-4 flex items-center gap-2">
         <span className="text-xs font-black px-3 py-1.5 rounded-lg bg-black text-white uppercase tracking-wider">{type}</span>
      </div>
    </div>
  );
};
