import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();
  const [showDesc, setShowDesc] = useState(false);

  const handleToggleDesc = () => {
    setShowDesc(!showDesc);
  };

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Img variant="top" src={pizza.img} />
      <Card.Body>
        <Card.Title>Pizza {pizza.name}</Card.Title>
        <hr />
        <strong>Ingredientes:</strong>
        <ul>
          {pizza.ingredients.map((ingredient, index) => (
            <li key={index}>🍕 {ingredient}</li>
          ))}
        </ul>
        {showDesc && (
          <>
            <hr />
            <div className="description">{pizza.desc}</div>
          </>
        )}
        <hr />
        <div className="card-price">Precio: ${pizza.price.toLocaleString()}</div>
        <Button variant="outline-dark" onClick={handleToggleDesc}>
          {showDesc ? "Ocultar 👀" : "Ver Más 👀"}
        </Button>
        <Button onClick={() => addToCart(pizza)} className="ms-2">
          Añadir 🛒
        </Button>
        <Link to={`/pizza/${pizza.id}`}>
          <Button className="ms-2" variant="info">
            Ver Pizza 🍕
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
