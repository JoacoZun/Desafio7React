import React, { useState, useEffect, useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { useCart } from '../context/CartContext';
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, totalAmount } = useCart();
  const { token } = useContext(UserContext); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        if (!response.ok) {
          throw new Error("Failed to fetch pizzas data");
        }
        const data = await response.json();
        initializeCart(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const initializeCart = (pizzasData) => {
    const initialCart = [
      { id: "p001", count: 2 },
      { id: "p002", count: 1 },
    ];

    const cartWithDetails = initialCart.map((cartItem) => {
      const pizza = pizzasData.find((pizza) => pizza.id === cartItem.id);
      return pizza ? { ...pizza, count: cartItem.count } : null;
    }).filter(item => item !== null); 

    setCart(cartWithDetails);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <h2>Detalle del pedido:</h2>
      {cart.length > 0 ? (
        cart.map((pizza) => (
          <div key={pizza.id} className="cart-item d-flex align-items-center mb-3">
            <Image src={pizza.img} roundedCircle style={{ width: "60px", height: "60px" }} />
            <div className="ms-3 flex-grow-1">
              <h5>{pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)}</h5>
            </div>
            <div className="d-flex align-items-center">
              <Button
                variant="success"
                onClick={() => decreaseQuantity(pizza.id)}
                className="me-2"
              >
                -
              </Button>
              <span className="me-2">{pizza.count}</span>
              <Button
                variant="success"
                onClick={() => increaseQuantity(pizza.id)}
                className="me-2"
              >
                +
              </Button>
              <span>=</span>
              <strong className="ms-2">
                ${(pizza.price * pizza.count).toLocaleString()}
              </strong>
            </div>
          </div>
        ))
      ) : (
        <p>No hay pizzas en el carrito</p>
      )}
      <hr />
      <h5>Total a pagar: ${totalAmount.toLocaleString()}</h5>
      <Button
        variant={token ? "danger" : "outline-secondary"} 
        className="mt-2"
        disabled={!token}
      >
        {token ? "Pagar" : "Inicie sesión para pagar"} 
      </Button>
    </div>
  );
};

export default Cart;
