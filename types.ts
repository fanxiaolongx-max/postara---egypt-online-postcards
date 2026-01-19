export interface Template {
  id: string;
  title: string;
  category: 'Birthday' | 'Ramadan' | 'Wedding' | 'Travel' | 'Business';
  imageUrl: string;
  price: number;
}

export interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'sticker';
  content: string; // Text content or Image URL
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  rotation?: number;
}

export interface Design {
  id: string;
  templateId: string;
  elements: EditorElement[];
  lastModified: number;
  previewUrl?: string; // Mock preview
}

export interface Order {
  id: string;
  status: 'Draft' | 'Paid' | 'Production' | 'Shipped' | 'Delivered';
  customerName: string;
  total: number;
  date: string;
  items: number;
}

export enum PaperType {
  Standard = 'Standard Matte',
  Premium = 'Premium Glossy',
  Recycled = 'Recycled Kraft',
}
