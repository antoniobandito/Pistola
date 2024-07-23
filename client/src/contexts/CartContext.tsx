import React, { createContext, useState, ReactNode, useReducer, useContext } from 'react'

interface CartItem {
    size: string;
    id: string;
    title: string;
    price: number;
    quantity: number;
    photoUrl: string;
}

interface CartState {
    items: CartItem[];
}

interface CartContextType {
    cartState: CartState;
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    updateItemSize: (itemId: string, newSize: string) => void;
}

type CartAction =
    | { type: 'ADD_ITEM'; item: CartItem }
    | { type: 'REMOVE_ITEM'; itemId: string}
    | { type: 'UPDATE_ITEM_SIZE'; itemId: string; newSize: string }

const CartContext = createContext<CartContextType>({
    cartState: { items: [] },
    addToCart: () => null,
    removeFromCart: () => null,
    updateItemSize: () => null,
    });


function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {


        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.id === action.item.id);
            if (existingItem) {
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.item.id && item.size === action.item.size
                        ? { ...item, quantity: item.quantity + action.item.quantity }
                        : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, action.item],
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.itemId),
            };
        
        case 'UPDATE_ITEM_SIZE':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.itemId ? { ...item, size: action.newSize } : item
                ),
            };
        default:
            return state;
        }
    };
           


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: {children: ReactNode }) => {
    const [cartState, dispatch] = useReducer(cartReducer, { items: [] });
    

    const addToCart = (item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', item });
    };

    const removeFromCart = (itemId: string) => {
        dispatch({ type: 'REMOVE_ITEM', itemId });
    };

    const updateItemSize = (itemId: string, newSize: string) => {
        dispatch({ type: 'UPDATE_ITEM_SIZE', itemId, newSize });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart, updateItemSize }}>
            {children}
        </CartContext.Provider>
    );
};