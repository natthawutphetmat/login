"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import "./cart.css";

export default function ProductPage({ params }) {
  const productId = parseInt(use(params).id); // Unwrap params with `use`

  const [product, setProduct] = useState(null); // Store product data
  const [quantity, setQuantity] = useState(1); // Manage product quantity
  const [loading, setLoading] = useState(true); // Loading state

  const router = useRouter();

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://apifb.myad-dev.com/get/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    router.push("/cart");
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

 
  const totalPrice = (product?.price * quantity).toFixed(2);

  if (loading) return <p>Loading...</p>;

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-page-container">
      <div className="product-card">
        <img src="/img/fblogo.png" alt="Facebook Ads Logo" className="product-image" />

        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>

          <div className="quantity-container">
            <button onClick={decreaseQuantity} className="quantity-button">-</button>
            <span className="quantity-display">{quantity}</span>
            <button onClick={increaseQuantity} className="quantity-button">+</button>
          </div>

          <p className="total-price">Total: ${totalPrice}</p> {/* Display total price */}

          <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
