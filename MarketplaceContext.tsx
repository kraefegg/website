import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { MarketplaceCartItem, MarketplaceQuoteRequest } from '../types/marketplace';
import { SolarProductItem } from '../types';

interface MarketplaceContextType {
  cartItems: MarketplaceCartItem[];
  addToCart: (item: Omit<MarketplaceCartItem, 'id'>) => void;
  addProductToCart: (product: SolarProductItem, quantity?: number) => void;
  addServiceToCart: (service: {
    id: string;
    title: string;
    category: string;
    disciplines?: string[];
    customScope?: string;
  }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalKwp: number;
  lastSubmittedRequest: MarketplaceQuoteRequest | null;
  setLastSubmittedRequest: (req: MarketplaceQuoteRequest | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const STORAGE_KEY = 'kraefegg_marketplace_cart_v1';
const REQUEST_STORAGE_KEY = 'kraefegg_last_quote_request_v1';

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<MarketplaceCartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [lastSubmittedRequest, setLastSubmittedRequestState] = useState<MarketplaceQuoteRequest | null>(() => {
    try {
      const saved = localStorage.getItem(REQUEST_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const setLastSubmittedRequest = (req: MarketplaceQuoteRequest | null) => {
    setLastSubmittedRequestState(req);
    try {
      if (req) {
        localStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(req));
      } else {
        localStorage.removeItem(REQUEST_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  };

  const addToCart = (item: Omit<MarketplaceCartItem, 'id'>) => {
    setCartItems((prev) => {
      // If same product exists, increment quantity
      if (item.type === 'product') {
        const existingIndex = prev.findIndex(
          (i) => i.type === 'product' && i.itemId === item.itemId
        );
        if (existingIndex > -1) {
          const copy = [...prev];
          copy[existingIndex].quantity += item.quantity || 1;
          return copy;
        }
      }
      // For service, check if exact same service with same disciplines exists
      if (item.type === 'service') {
        const existingIndex = prev.findIndex(
          (i) => i.type === 'service' && i.itemId === item.itemId
        );
        if (existingIndex > -1) {
          const copy = [...prev];
          copy[existingIndex].details.disciplines = item.details.disciplines || copy[existingIndex].details.disciplines;
          copy[existingIndex].details.customScope = item.details.customScope || copy[existingIndex].details.customScope;
          return copy;
        }
      }
      const newItem: MarketplaceCartItem = {
        ...item,
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      };
      return [...prev, newItem];
    });

    showToast(`"${item.title}" adicionado à cotação com sucesso!`);
  };

  const addProductToCart = (product: SolarProductItem, quantity: number = 1) => {
    addToCart({
      type: 'product',
      itemId: product.id,
      title: product.name,
      subtitle: product.systemModel,
      category: product.category,
      quantity,
      powerKwp: product.powerKwp,
      details: {
        systemModel: product.systemModel,
        inverterBrand: product.inverterBrand,
        inverterModel: product.inverterModel,
        moduleBrand: product.moduleBrand,
        moduleModel: product.moduleModel,
        voltage: product.voltage,
        phase: product.phase,
        structureType: product.structureType,
        officialSupplier: product.officialSupplier,
      },
    });
  };

  const addServiceToCart = (service: {
    id: string;
    title: string;
    category: string;
    disciplines?: string[];
    customScope?: string;
  }) => {
    addToCart({
      type: 'service',
      itemId: service.id,
      title: service.title,
      subtitle: `Serviço de Engenharia • ${service.category}`,
      category: service.category,
      quantity: 1,
      details: {
        disciplines: service.disciplines,
        customScope: service.customScope,
      },
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));
    showToast('Item removido da cotação.');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is MarketplaceCartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Carrinho de cotação esvaziado.');
  };

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalKwp = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.type === 'product' && item.powerKwp) {
        return acc + item.powerKwp * item.quantity;
      }
      return acc;
    }, 0);
  }, [cartItems]);

  return (
    <MarketplaceContext.Provider
      value={{
        cartItems,
        addToCart,
        addProductToCart,
        addServiceToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalKwp,
        lastSubmittedRequest,
        setLastSubmittedRequest,
        toastMessage,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none">
          <div className="bg-slate-900/95 border border-cyan-500/50 shadow-2xl shadow-cyan-500/20 text-slate-100 px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono text-cyan-200">{toastMessage}</span>
          </div>
        </div>
      )}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
