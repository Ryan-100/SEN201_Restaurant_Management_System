import React, { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const initialMenu = [
    { id: '1', name: 'Margherita Pizza', price: 12.99 },
    { id: '2', name: 'Caesar Salad', price: 8.50 },
    { id: '3', name: 'Spaghetti Carbonara', price: 15.00 },
    { id: '4', name: 'Bruschetta', price: 6.75 },
    { id: '5', name: 'Tiramisu', price: 7.00 },
];

const OrderStatus = {
    Active: 'Active',
    Paid: 'Paid',
};

const OrderItemStatus = {
    Cancelled: 'Cancelled',
    // Add other statuses as needed
};

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [menu, setMenu] = useLocalStorage('restaurant-menu', initialMenu);
    const [orders, setOrders] = useLocalStorage('restaurant-orders', []);

    const addMenuItem = useCallback((item) => {
        setMenu(prev => [...prev, { ...item, id: Date.now().toString() }]);
    }, [setMenu]);

    const updateMenuItem = useCallback((updatedItem) => {
        setMenu(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    }, [setMenu]);
    
    const deleteMenuItem = useCallback((itemId) => {
        setMenu(prev => prev.filter(item => item.id !== itemId));
    }, [setMenu]);

    const placeOrder = useCallback((tableNumber, items) => {
        setOrders(prev => {
            const existingOrderIndex = prev.findIndex(o => o.tableNumber === tableNumber && o.status === OrderStatus.Active);
            if (existingOrderIndex > -1) {
                const updatedOrders = [...prev];
                const existingOrder = updatedOrders[existingOrderIndex];
                updatedOrders[existingOrderIndex] = { ...existingOrder, items: [...existingOrder.items, ...items] };
                return updatedOrders;
            } else {
                const newOrder = {
                    id: `T${tableNumber}-${Date.now()}`,
                    tableNumber,
                    items,
                    status: OrderStatus.Active,
                    createdAt: Date.now(),
                };
                return [...prev, newOrder];
            }
        });
    }, [setOrders]);

    const updateOrderItemStatus = useCallback((orderId, orderItemId, status) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    items: order.items.map(item => 
                        item.id === orderItemId ? { ...item, status } : item
                    ),
                };
            }
            return order;
        }));
    }, [setOrders]);

    const cancelOrderItem = useCallback((orderId, orderItemId) => {
        updateOrderItemStatus(orderId, orderItemId, OrderItemStatus.Cancelled);
    }, [updateOrderItemStatus]);

    const deliverBill = useCallback((orderId) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                return { ...order, status: OrderStatus.Paid, paidAt: Date.now() };
            }
            return order;
        }));
    }, [setOrders]);

    const contextValue = {
        menu,
        orders,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        placeOrder,
        cancelOrderItem,
        updateOrderItemStatus,
        deliverBill,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
