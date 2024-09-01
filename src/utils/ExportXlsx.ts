import * as XLSX from 'xlsx';

interface ExportXlsxProps {
  data: {
    [key: string]: string | number;
  }[];
  filename: string;
}

export default function ExportXlsx({ data, filename }: ExportXlsxProps) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilha 1');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
