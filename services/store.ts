import { Design } from '../types';

// Using localStorage to simulate a database for the demo

export const saveDesign = (design: Design) => {
  const designs = getDesigns();
  const existingIndex = designs.findIndex(d => d.id === design.id);
  
  if (existingIndex >= 0) {
    designs[existingIndex] = design;
  } else {
    designs.push(design);
  }
  
  try {
    localStorage.setItem('postara_designs', JSON.stringify(designs));
  } catch (e) {
    console.error("Storage failed", e);
  }
};

export const getDesigns = (): Design[] => {
  try {
    const data = localStorage.getItem('postara_designs');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const getDesignById = (id: string): Design | undefined => {
  return getDesigns().find(d => d.id === id);
};

// Mock checkout cart
export const addToCart = (designId: string, quantity: number) => {
  const cart = getCart();
  cart.push({ designId, quantity });
  localStorage.setItem('postara_cart', JSON.stringify(cart));
};

export const getCart = (): {designId: string, quantity: number}[] => {
   try {
    const data = localStorage.getItem('postara_cart');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export const clearCart = () => {
  localStorage.removeItem('postara_cart');
}
