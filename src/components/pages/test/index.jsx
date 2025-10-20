/*
 * test/index.jsx
 *
 * Test interface component for development and testing purposes.
 * Provides buttons to test various functionality including order placement and notifications.
 *
 * Created by Ryan, 29 September 2025
 */

import React from "react";

import { useAppContext } from '../../../contexts/AppContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import CookNotification from '../../ui/shared/CookNotification';
import ServerNotification from '../../ui/shared/ServerNotification';

/*
 * Test interface component for development testing
 *
 * Returns: JSX element containing test buttons and notification components
 */
const TestInterface = () => {
  const { placeOrder, menu } = useAppContext();

  const handleFakePlaceOrder = () => {
    const randomTable = Math.floor(Math.random() * 10) + 1;
    const randomItems = [
      { menuItemId: menu[0].id, quantity: 1, notes: "Test order" }
    ];
    placeOrder(randomTable, randomItems);
    // Removed alert - notification will show instead
  };

  const handleTestSound = () => {
    // Direct audio test to bypass autoplay restrictions
    const audio = new Audio('/notification.mp3');
    audio.play().catch(err => console.log('Direct audio test failed:', err));
    // Removed alert - just test the sound
  };

  return (
    <div className='p-4 space-y-4'>
      <Button variant="primary" onClick={handleFakePlaceOrder}>Fake Place Order</Button>
      <Button variant="secondary" onClick={handleTestSound}>Test Sound Direct</Button>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="danger">Danger Button</Button>
      <Button variant="success">Success Button</Button>
      <Card className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-2">Card Title</h2>
        <p className="text-gray-700">This is a simple card component using Tailwind CSS.</p>
      </Card>
      <CookNotification />
      <ServerNotification />
    </div>
  );
};

export default TestInterface;
