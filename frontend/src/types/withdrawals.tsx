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
  observations: string;
  location__code: string;
}

export interface SelectedItem {
  id: number;
  reference_code: string;
  description: string;
  quantity: number;
  location__code: string;
}

export interface Props {
  updateDialog: CallableFunction;
}

export interface Withdrawal {
  worker: number;
  lines: SelectedItem[];
}

export interface StockIncrease {
  reference_code: string;
  stock: number;
}

export interface ItemsByLocation {
  location: string;
  items: ItemByLocation[];
}

export interface ItemByLocation {
  reference_code: string;
  description: string;
  stock: number;
}
