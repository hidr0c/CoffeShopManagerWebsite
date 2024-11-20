

'use client';

import React, { useState } from 'react';
import styles from './sell.module.scss';
import { FaPlus, FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import { supplierapi } from '@/services/supplier/supplier.api'; // Not sure 
import {IProduct} from "@services/supplier"; // Not sure 

// Mock data for products with categories
const products = [
  { id: '1', name: 'Espresso', price: 39000, category: 'Coffee', image: '/images/Testing product image/01.png' },
  { id: '2', name: 'Black Coffee', price: 25000, category: 'Coffee', image: '/images/Testing product image/01.png' },
  { id: '3', name: 'Flat White', price: 45000, category: 'Coffee', image: '/images/Testing product image/01.png' },
  { id: '4', name: 'Irish Coffee', price: 50000, category: 'Coffee', image: '/images/Testing product image/01.png' },
  { id: '5', name: 'Trà Đào', price: 30000, category: 'Trà', image: '/images/Testing product image/01.png' },
  { id: '6', name: 'Bánh Croissant', price: 20000, category: 'Bánh', image: '/images/Testing product image/01.png' },
  { id: '7', name: 'Nước Cam', price: 25000, category: 'Khác', image: '/images/Testing product image/01.png' },
  // Add more products as needed
];

// Mock data for order items
const orderItems = [
  { id: '1', name: 'Trà thạch đào', quantity: 1, total: 49000 },
  { id: '2', name: 'Black Coffee', quantity: 1, total: 25000 },
  { id: '3', name: 'Cappuccino', quantity: 2, total: 65000 },
  { id: '4', name: 'Irish Coffee', quantity: 1, total: 50000 },
  { id: '5', name: 'Mousse Cacao', quantity: 2, total: 29000 },
  { id: '6', name: 'Phô mai Caramel', quantity: 1, total: 29000 },
];

const Sell: React.FC = () => {
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('Coffee');

  // Filtered products based on selected category
  const filteredProducts = products.filter((product) => product.category === selectedCategory);

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
            <div key={product.id} className={styles.product}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price.toLocaleString()} VND</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        <table className={styles.orderItems}>
          <thead>
            <tr>
              <th>Tên món</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.total.toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.addItem}><FaPlus /> Thêm món khác</button>
        <div className={styles.summaryFooter}>
          <div>
            <FaInfoCircle /> Tổng tiền
          </div>
          <p>341.000 VND</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.payButton}>Thanh toán</button>
          <button className={styles.cancelButton}>Hủy bỏ</button>
        </div>
      </div>
    </div>
  );
}

export default Sell;
