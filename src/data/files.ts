export interface FileData {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx';
  path: string;
  date: string;
}

export const files: FileData[] = [
  {
    id: '1',
    name: "Diya Pal Registration",
    type: "pdf",
    path: "/files/Diya Pal Registration.pdf",
    date: "2026-01-08"
  },
  {
    id: '2',
    name: "Diya Pal Registration",
    type: "docx",
    path: "/files/Diya Pal Registration.docx",
    date: "2026-01-08"
  },
  {
    id: '3',
    name: "Project Data Analysis",
    type: "xlsx",
    path: "/files/data-analysis.xlsx",
    date: "2026-01-08"
  }
];

export const projects = [
  {
    id: '1',
    name: "Excel Projects",
    description: "Spreadsheets, data analysis, and financial reports.",
    status: "Active",
    lastUpdated: "Today"
  },
  {
    id: '2',
    name: "Word Projects",
    description: "Documentation, reports, and formal registrations.",
    status: "Active",
    lastUpdated: "Today"
  }
];