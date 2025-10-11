import React from "react";
import { useAppContext } from '../../../contexts/AppContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import CookNotification from '../../ui/shared/CookNotification';
import ServerNotification from '../../ui/shared/ServerNotification';

const TestInterface = () => {
  const { placeOrder, menu, addCookNotification } = useAppContext();

  const fakePlaceOrder = () => {
    const randomTable = Math.floor(Math.random() * 10) + 1;
    const randomItems = [
      { menuItemId: menu[0].id, quantity: 1, notes: "Test order" }
    ];
    placeOrder(randomTable, randomItems);
    // Removed alert - notification will show instead
  };

  const testSound = () => {
    // Direct audio test to bypass autoplay restrictions
    const audio = new Audio('/notification.mp3');
    audio.play().catch(err => console.log('Direct audio test failed:', err));
    // Removed alert - just test the sound
  };

  return (
    <div className='p-4 space-y-4'>
      <Button variant="primary" onClick={fakePlaceOrder}>Fake Place Order</Button>
      <Button variant="secondary" onClick={testSound}>Test Sound Direct</Button>
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