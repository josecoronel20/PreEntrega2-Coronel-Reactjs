import React from "react";
import { CartWidgetContext } from "../context/CartWidgetContext";
import { useContext } from "react";
import "../styles/checkout.css";
import BuyBtn from "../components/checkoutComponents/BuyBtn";

const Checkout = () => {
  const [cart, setCart] = useContext(CartWidgetContext);

  const handleDelete = (e) => {
    const idX = e.target.id;

    const productDelete = cart.find((product) => product.id == idX);

    if (productDelete.quantity > 1) {
      const updateCart = [...cart];
      const productIndex = updateCart.findIndex((product) => product.id == idX);
      productDelete.quantity = productDelete.quantity - 1;
      updateCart[productIndex] = productDelete;
      setCart(updateCart);
    } else {
      const updateCart = cart.filter((product) => product.id !== idX);
      setCart(updateCart);
    }
  };


  const total = Math.floor(
    cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
  );
  return (
    <div className="checkoutContainer">
      <div className="checkout">
        {cart.length !== 0 ? (
          cart.map((product) => (
            <div key={product.id} className="cardCheckout">
              <img src={product.src} alt="imagen de producto" />
              <h3>{product.name}</h3>
              <p className="quantity">cantidad: {product.quantity}</p>
              <p className="price">${product.price * product.quantity}</p>
              <p className="x" onClick={handleDelete} id={product.id}>
                x
              </p>
            </div>
          ))
        ) : (
          <p>el carrito está vacío</p>
        )}
        <p>TOTAL: ${total}</p>
        <BuyBtn />
      </div>
    </div>
  );
};

export default Checkout;
