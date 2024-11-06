interface ISelectExportOptions {
  key: string;
  label: string;
  value: string;
}

interface IExportSelect {
  key?: React.Key;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: ISelectExportOptions[];
}

interface IExportInput {
  key?: React.Key;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IExport {
  info?: {
    selects?: IExportSelect[];
    inputs?: IExportInput[];
  };
  onSubmit?: () => void;
  onCancel?: () => void;
}

export type { ISelectExportOptions, IExportSelect, IExportInput, IExport };
