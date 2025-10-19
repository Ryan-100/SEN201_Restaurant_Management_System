import React, { createContext, useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
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
    Accepted: 'Accepted',
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
        // Normalize incoming items: expand quantity into individual per-unit items
        const expandToPerUnitItems = (list) => {
            const perUnit = [];
            list.forEach(srcItem => {
                const quantity = Math.max(1, srcItem.quantity || 1);
                for (let i = 0; i < quantity; i += 1) {
                    const preserveIdWhenSingle = quantity === 1 && srcItem.id && typeof srcItem.id !== 'undefined';
                    perUnit.push({
                        name: srcItem.name,
                        price: srcItem.price,
                        notes: srcItem.notes,
                        // Preserve existing status if provided (e.g., when editing), otherwise undefined
                        status: srcItem.status,
                        // Keep existing id if editing a single item; otherwise assign new unique id
                        id: preserveIdWhenSingle ? srcItem.id : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    });
                }
            });
            return perUnit;
        };

        const normalizedItems = expandToPerUnitItems(items);

        setOrders(prev => {
            const existingOrderIndex = prev.findIndex(o => o.tableNumber === tableNumber && o.status === OrderStatus.Active);

            if (existingOrderIndex > -1) {
                const updatedOrders = [...prev];
                const existingOrder = updatedOrders[existingOrderIndex];
                // Replace items with the newly submitted normalized list (edit behavior)
                updatedOrders[existingOrderIndex] = {
                    ...existingOrder,
                    items: normalizedItems,
                };
                return updatedOrders;
            } else {
                const newOrder = {
                    id: `T${tableNumber}-${Date.now()}`,
                    tableNumber,
                    items: normalizedItems,
                    status: OrderStatus.Active,
                    createdAt: Date.now(),
                };
                return [...prev, newOrder];
            }
        });

        addCookNotification(`New order for table ${tableNumber}!`); // Notify cook
    }, [setOrders, addCookNotification]);

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


    

    const acceptOrderItem = useCallback((orderId, orderItemId) => {
        updateOrderItemStatus(orderId, orderItemId, OrderItemStatus.Accepted);
    }, [updateOrderItemStatus]);

    const markItemReady = useCallback((orderId, orderItemId) => {
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
        cancelOrderItem,
        updateOrderItemStatus,
        deliverBill,
        cookNotifications,
        serverNotifications,
        addCookNotification,
        addServerNotification,
        markItemReady,
        acceptOrderItem,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node,
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
