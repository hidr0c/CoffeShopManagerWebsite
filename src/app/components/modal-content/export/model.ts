interface ExportItem {
  name: string;
  price: number;
  quant: number;
  unit: string;
}

interface Export {
  customerName: string;
  phoneNumber: string;
  importDate: string;
  values: ExportItem[];
}

export type { ExportItem, Export as ExportData };
