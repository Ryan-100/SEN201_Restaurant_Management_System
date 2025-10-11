# Server Notification Integration Guide

## Overview
The notification system is already set up and ready to use in the server UI. Here's how to integrate it.

## What's Already Available

### 1. Context Functions
The `AppContext` already provides these functions:
- `serverNotifications` - Array of current server notifications
- `addServerNotification(message)` - Function to add a new notification

### 2. Notification Component
The `ServerNotification` component is ready to use at:
```
src/components/ui/shared/ServerNotification.jsx
```

## How to Integrate

### Step 1: Import the Component
Add this import to your server page:
```jsx
import ServerNotification from '../../ui/shared/ServerNotification';
```

### Step 2: Add the Component to Your JSX
Add `<ServerNotification />` anywhere in your component's return statement:
```jsx
const ServerView = () => {
  return (
    <div>
      {/* Your existing server UI content */}
      
      {/* Add this line */}
      <ServerNotification />
    </div>
  );
};
```

### Step 3: Use Notifications in Your Functions
When you want to show a notification, use the context function:
```jsx
import { useAppContext } from '../../../contexts/AppContext';

const ServerView = () => {
  const { addServerNotification } = useAppContext();
  
  const handlePickupItem = () => {
    // Your pickup logic here
    
    // Add notification
    addServerNotification("Item picked up successfully!");
  };
  
  return (
    <div>
      {/* Your UI */}
      <button onClick={handlePickupItem}>Pick Up Item</button>
      
      <ServerNotification />
    </div>
  );
};
```

## How Notifications Work

### Automatic Notifications
Some notifications are already automatic:
- When cooks mark items as "Ready", servers automatically get notified: "🔔 Item ready for pickup!"

### Manual Notifications
You can add custom notifications:
```jsx
addServerNotification("Your custom message here");
```

## Notification Features
- ✅ **Sound**: Plays notification sound automatically
- ✅ **Visual**: Green notification box in top-right corner
- ✅ **Auto-hide**: Disappears after 5 seconds
- ✅ **Multiple**: Can show multiple notifications at once
- ✅ **Responsive**: Works on all screen sizes

## Example Integration
Here's a complete example:

```jsx
import React from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import ServerNotification from '../../ui/shared/ServerNotification';

const ServerView = () => {
  const { 
    orders, 
    serverNotifications, 
    addServerNotification 
  } = useAppContext();

  const handleDeliverOrder = (orderId) => {
    // Your delivery logic here
    
    // Add custom notification
    addServerNotification("Order delivered successfully!");
  };

  return (
    <div className="p-6">
      <h1>Server Dashboard</h1>
      
      {/* Your existing server UI */}
      {orders.map(order => (
        <div key={order.id}>
          <button onClick={() => handleDeliverOrder(order.id)}>
            Deliver Order
          </button>
        </div>
      ))}
      
      {/* This shows the notifications */}
      <ServerNotification />
    </div>
  );
};

export default ServerView;
```

## Testing
To test notifications:
1. Go to the "Test" role
2. Click "Fake Place Order" (creates cook notification)
3. Switch to "Cook" role
4. Click "Mark Ready" on any item
5. Switch to "Server" role
6. You should see the green notification: "🔔 Item ready for pickup!"

## Questions?
If you need help or have questions about the notification system, just ask!
