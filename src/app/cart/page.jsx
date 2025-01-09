"use client";

import { useState, useEffect } from "react";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode.react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);  

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Calculate total amount and generate QR code
  useEffect(() => {
    try {
      const totalAmount = cartItems.reduce((sum, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);

        if (isNaN(price) || isNaN(quantity)) {
          console.error("Invalid price or quantity:", item);
          throw new Error("Invalid price or quantity.");
        }

        return sum + price * quantity;
      }, 0);

      setTotal(totalAmount);

      
      const payload = generatePayload("0912345678", { amount: totalAmount });
      setQrCode(payload);
    } catch (error) {
      console.error("Error calculating total:", error);
    }
  }, [cartItems]);

 
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

 
  const handleConfirmOrder = async () => {
    const orderData = {
      items: cartItems,
      totalAmount: total,
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      timestamp: new Date().toISOString(),
    };

    try {
      setIsLoading(true);  
      const response = await fetch("https://odapi.myads.dev/api/confirm-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm order");
      }

      const result = await response.json();
      alert("Order confirmed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      console.error("Error confirming order:", error);
      alert(`Error confirming order: ${error.message}`);
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cartbox">
          <div className="cartb">
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  marginBottom: "20px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{item.name}</p>
                  <span
                    className="remove-item"
                    style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    &#10005;
                  </span>
                </div>
                <p>Price per item: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
            

            <div className="text-center" style={{ marginTop: "20px" }}>
              <h3>Total: ${total.toFixed(2)}</h3>
              {qrCode && <QRCode value={qrCode} alt="QR Code" />}

              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={handleConfirmOrder}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Confirming..." : "Confirm Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

