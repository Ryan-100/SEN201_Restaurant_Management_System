import React, { createContext, useContext, useCallback, useState } from 'react';
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
    const [cookNotifications, setCookNotifications] = useState([]); // For cook
    const [serverNotifications, setServerNotifications] = useState([]); // For server

    const addMenuItem = useCallback((item) => {
        setMenu(prev => [...prev, { ...item, id: Date.now().toString() }]);
    }, [setMenu]);

    const updateMenuItem = useCallback((updatedItem) => {
        setMenu(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    }, [setMenu]);
    
    const deleteMenuItem = useCallback((itemId) => {
        setMenu(prev => prev.filter(item => item.id !== itemId));
    }, [setMenu]);

    const addCookNotification = useCallback((message) => {
        const id = Date.now().toString();
        setCookNotifications(prev => [...prev, {id, message}]);
        setTimeout(() => {
            setCookNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    }, []);

    const addServerNotification = useCallback((message) => {
        const id = Date.now().toString();
        setServerNotifications(prev => [...prev, {id, message}]);
        setTimeout(() => {
            setServerNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    }, []);

    const placeOrder = useCallback((tableNumber, items) => {
        setOrders(prev => {
            const itemsWithUniqueIds = items.map(item => ({
                ...item,
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            }));
            
            const newOrder = {
                id: `T${tableNumber}-${Date.now()}`,
                tableNumber,
                items: itemsWithUniqueIds,
                status: OrderStatus.Active,
                createdAt: Date.now(),
            };
            return [...prev, newOrder];
        });

        addCookNotification(`New order for table ${tableNumber}!`); // Notify cook
    }, [setOrders, addCookNotification]);

    const updateOrder = useCallback((orderId, items) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                // Replace items but keep existing unique IDs for items that already exist
                const updatedItems = items.map(item => {
                    // If item has existing unique ID, keep it; otherwise create new one
                    const existingItem = order.items.find(existingItem => 
                        existingItem.menuItemId === item.menuItemId && 
                        existingItem.notes === item.notes
                    );
                    
                    return {
                        ...item,
                        id: existingItem ? existingItem.id : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                    };
                });
                
                return {
                    ...order,
                    items: updatedItems
                };
            }
            return order;
        }));
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

    const markItemReady = useCallback((orderId, orderItemId) => {
        // Add this new function or update your existing one
        updateOrderItemStatus(orderId, orderItemId, 'Ready');
        addServerNotification(`Item ready for pickup!`); // Notify server
    }, [updateOrderItemStatus, addServerNotification]);

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
        updateOrder,
        cancelOrderItem,
        updateOrderItemStatus,
        deliverBill,
        cookNotifications,
        serverNotifications,
        addCookNotification,
        addServerNotification,
        markItemReady,
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
