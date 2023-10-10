import React, { createContext, ReactNode, useState} from 'react';

type CartItem = {
  // Define el tipo de los elementos del carrito
  // Puedes ajustar esto según la estructura real de tus elementos del carrito
  id: number;
  name: string;
  price: number;
};

type CartContextType = {
  cart: CartItem[];
};

const initialState: CartContextType = {
  cart: [],
};

export const CartContext = createContext(initialState);

type CartProviderProps = {
  children: ReactNode; // Usa ReactNode para permitir cualquier tipo de contenido como children
  value: CartContextType; // Ajusta el tipo de value según tu necesidad
};

export const CartProvider: React.FC<CartProviderProps> = ({ children, value }) => {
  const [resfreshData,setRefreshData] = useState(false)

  return (<CartContext.Provider value={{...value, resfreshData, setRefreshData}}>
    {children}
    </CartContext.Provider>);
};
