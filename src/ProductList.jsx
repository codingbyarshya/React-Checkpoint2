import React, { useState } from 'react';


const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Energy Drink', price: 34, quantity: 0 },
    { id: 2, name: 'Kit kat', price: 20, quantity: 0 },
    { id: 3, name: 'Ayran', price: 7, quantity: 0 },
    { id: 4, name: 'Türk kahvesi', price: 25, quantity: 0 },
    { id: 5, name: 'Sigara', price: 45, quantity: 0 },
    { id: 6, name: 'Mantar', price: 19, quantity: 0 },
    { id: 7, name: 'Karpuz', price: 38, quantity: 0 }
  ]);

  const [cartItems, setCartItems] = useState([]);

  const IncreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const DecreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const AddProduct = (id) => {
    const selectedProduct = products.find((product) => product.id === id);
    setCartItems((prevCartItems) => [...prevCartItems, selectedProduct]);
  };

  const RemoveProduct = (id) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
  };

  const IncreaseCartItemQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const DecreaseCartItemQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div className="product" key={product.id}>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}₺</p>
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => IncreaseQuantity(product.id)}>+</button>
          <button onClick={() => DecreaseQuantity(product.id)}>-</button>
          <button onClick={() => AddProduct(product.id)}>Ekle</button>
          <hr />
        </div>
      ))}
      <div className="cart">
        <h2>Sepet</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity} - Price: {item.price * item.quantity}₺
                <button onClick={() => IncreaseCartItemQuantity(item.id)}>+</button>
                <button onClick={() => DecreaseCartItemQuantity(item.id)}>-</button>
                <button onClick={() => RemoveProduct(item.id)}>Sil</button>
              </li>
            ))}
            <li>
              <strong>Total Price: {calculateTotalPrice()}₺</strong>
            </li>
          </ul>
        ) : (
          <p>No items in cart.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
