import { Template, Order } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 't1',
    title: 'Pyramids Sunset',
    category: 'Travel',
    imageUrl: 'https://picsum.photos/id/1040/400/300',
    price: 2.50
  },
  {
    id: 't2',
    title: 'Nile Felucca',
    category: 'Travel',
    imageUrl: 'https://picsum.photos/id/1015/400/300',
    price: 2.50
  },
  {
    id: 't3',
    title: 'Ramadan Kareem Gold',
    category: 'Ramadan',
    imageUrl: 'https://picsum.photos/id/1047/400/300',
    price: 3.00
  },
  {
    id: 't4',
    title: 'Happy Birthday Pharaoh',
    category: 'Birthday',
    imageUrl: 'https://picsum.photos/id/1059/400/300',
    price: 2.75
  },
  {
    id: 't5',
    title: 'Alexandria Library',
    category: 'Travel',
    imageUrl: 'https://picsum.photos/id/1076/400/300',
    price: 2.50
  },
  {
    id: 't6',
    title: 'Wedding Floral',
    category: 'Wedding',
    imageUrl: 'https://picsum.photos/id/360/400/300',
    price: 3.50
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-001', customerName: 'Ahmed Ali', status: 'Production', total: 12.50, date: '2023-10-25', items: 5 },
  { id: 'ORD-002', customerName: 'Sarah Smith', status: 'Shipped', total: 5.00, date: '2023-10-24', items: 2 },
  { id: 'ORD-003', customerName: 'Mona El-Sayed', status: 'Delivered', total: 25.00, date: '2023-10-20', items: 10 },
  { id: 'ORD-004', customerName: 'John Doe', status: 'Draft', total: 2.50, date: '2023-10-26', items: 1 },
];
