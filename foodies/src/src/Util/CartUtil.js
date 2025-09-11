export const calculateCartTotal = (cartItems, quantities) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 0),
    0
  );
  const shipping = subtotal === 0 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total
  };
};
