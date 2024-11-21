

'use client';

import React, { useState } from 'react';
import styles from './sell.module.scss';
import { FaPlus, FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import MenuApi from '@/services/menu';
import { useEffect } from "react"; 
import jsPDF from 'jspdf';

// Mock data for products with categories
const products = [
  { id: '1', name: 'Espresso', price: 39000, category: 'Coffee'},
  { id: '2', name: 'Black Coffee', price: 25000, category: 'Coffee' },
  { id: '3', name: 'Flat White', price: 45000, category: 'Coffee'},
  { id: '4', name: 'Irish Coffee', price: 50000, category: 'Coffee' },
  { id: '5', name: 'Trà Đào', price: 30000, category: 'Trà'},
  { id: '6', name: 'Bánh Croissant', price: 20000, category: 'Bánh'},
  { id: '7', name: 'Nước Cam', price: 25000, category: 'Khác'},
  // Add more products as needed
];


const Sell: React.FC = () => {
 // State for selected category
 const [selectedCategory, setSelectedCategory] = useState('Coffee');
 // State for menu items
 const [menuItems, setMenuItems] = useState([]);


 // Fetch menu items from API
 const fetchMenuItems = async () => {
   const response = await MenuApi.getMenuList({ limit: 100, page: 1 });
   if (response && response.items) {
     setMenuItems(response.items);
   }
 };

 useEffect(() => {
   fetchMenuItems();
 }, []);

  // State for order
  const [orderItems, setOrderItems] = useState([]);

  // Add product to order summary
  const addToOrder = (product) => {
    const existingItem = orderItems.find(item => item._id === product._id);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * product.price } : item
      ));
    } else {
      setOrderItems([...orderItems, { ...product, quantity: 1, total: product.price }]);
    }
  };

  // Generate PDF for order summary
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Order Summary', 10, 10);
    let y = 20;
    orderItems.forEach(item => {
      doc.text(`${item.name} - ${item.quantity} x ${item.price.toLocaleString()} VND - Total: ${item.total.toLocaleString()} VND`, 10, y);
      y += 10;
    });
    doc.save('order_summary.pdf');
  };
  

  // Filtered products based on selected category
  const filteredProducts = menuItems.filter((product) => product.category === selectedCategory);

  return (
    <div className={styles.container}>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Product Tabs */}
        <div className={styles.tabs}>
          <button onClick={() => setSelectedCategory('Coffee')} className={selectedCategory === 'Coffee' ? styles.active : ''}>Coffee</button>
          <button onClick={() => setSelectedCategory('Trà')} className={selectedCategory === 'Trà' ? styles.active : ''}>Trà</button>
          <button onClick={() => setSelectedCategory('Bánh')} className={selectedCategory === 'Bánh' ? styles.active : ''}>Bánh</button>
          <button onClick={() => setSelectedCategory('Khác')} className={selectedCategory === 'Khác' ? styles.active : ''}>Khác</button>
        </div>

        {/* Product List */}
        <div className={styles.productList}>
          {filteredProducts.map((product) => (
             <li key={product._id} onClick={() => addToOrder(product)}>
             <span>{product.name}</span>
             <span>{product.price.toLocaleString()} VND</span>
           </li>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h2>Order Summary</h2>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{item.total.toLocaleString()} VND</span>
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          <span>Tổng tiền</span>
          <span>{orderItems.reduce((acc, item) => acc + item.total, 0).toLocaleString()} VND</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.payButton} onClick={generatePDF}>Thanh toán</button>
          <button className={styles.cancelButton}>Hủy bỏ</button>
        </div>
      </div>
    </div>
  );
}

export default Sell;
