"use client";

import { useState, useEffect } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders"); // API ของคุณ
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin - Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => {
            const items = order.items ? JSON.parse(order.items) : [];

            return (
              <div
                key={order.id}
                style={{
                  border: "1px solid #ddd",
                  marginBottom: "20px",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h2>Order ID: {order.id}</h2>
                <p><strong>Total Amount:</strong> ${order.total_amount}</p>
                <p><strong>Total Quantity:</strong> {order.total_quantity}</p>
                <p><strong>Timestamp:</strong> {new Date(order.timestamp).toLocaleString()}</p>

                {items.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <h3>Items in Order</h3>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                      }}
                    >
                    
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
