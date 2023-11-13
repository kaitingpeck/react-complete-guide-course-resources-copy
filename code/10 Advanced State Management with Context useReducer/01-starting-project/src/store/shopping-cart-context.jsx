import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  onUpdateCartItemQuantity: () => {},
}); // an object containing a React component
