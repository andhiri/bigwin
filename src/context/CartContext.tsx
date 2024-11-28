import React, { createContext, useContext, useReducer } from 'react';

type CartItem = {
  tags: number;
  price: number;
  entries: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.tags === action.payload.tags
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return {
          items: newItems,
          total: state.total + action.payload.price
        };
      }

      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(item => item.tags !== action.payload),
        total: state.items.reduce((acc, item) => 
          item.tags !== action.payload ? acc + (item.price * item.quantity) : acc, 0
        )
      };
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}