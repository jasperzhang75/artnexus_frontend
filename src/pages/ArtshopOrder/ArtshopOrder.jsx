import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import "./ArtshopOrder.css";
import service from "./../../service/api";

function ArtshopOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const fetchCartItems = async () => {
    try {
      const res = await service.get(`/api/order/cart`);
      setCartItems(res.data.artworks);
      calculateTotal(res.data.artworks);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  const handlePurchase = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      await service.put(`/api/order/purchase`);
      navigate("/purchase-success");
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await service.delete(`/api/order/delete-item/${id}`);
      fetchCartItems(); // Refresh cart items after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="artshop-order-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                <button onClick={() => removeFromCart(item._id)} className="remove-item-button">×</button>
              </div>
            ))}
          </div>
          <div className="order-details">
            <h3>Order Details</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="order-detail">
                <span>{item.title}</span>
                <span>{item.price} $</span>
              </div>
            ))}
            <hr />
            <div className="order-total">
              <span>Grand Total</span>
              <span>{totalPrice} $</span>
            </div>
            <button onClick={handlePurchase} className="purchase-button">Purchase Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtshopOrder;