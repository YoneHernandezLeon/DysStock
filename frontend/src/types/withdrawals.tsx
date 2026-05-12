export interface Worker {
  id: number;
  code: number;
  name: string;
}

export interface Item {
  id: number;
  reference_code: string;
  description: string;
  stock: number;
  safety_stock: number;
}

export interface SelectedItem {
  id: number;
  reference_code: string;
  description: string;
  quantity: number;
}

export interface Props {
  updateDialog: CallableFunction;
}

export interface Withdrawal {
  worker: number;
  lines: SelectedItem[];
}
