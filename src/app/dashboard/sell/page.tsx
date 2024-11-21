

'use client';

import React, { useState } from 'react';
import styles from './sell.module.scss';
import { FaPlus, FaTrashAlt, FaInfoCircle, FaRegTrashAlt } from 'react-icons/fa';
import MenuApi, { IMenuItem } from '@/services/menu';
import { useEffect } from "react";
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button/button';
import CustomerAPI, { ICustomer } from '@/services/customer';
import Customer from '../customer/page';

// Mock data for products with categories
const products = [
  { id: '1', name: 'Espresso', price: 39000, category: 'Coffee' },
  { id: '2', name: 'Black Coffee', price: 25000, category: 'Coffee' },
  { id: '3', name: 'Flat White', price: 45000, category: 'Coffee' },
  { id: '4', name: 'Irish Coffee', price: 50000, category: 'Coffee' },
  { id: '5', name: 'Trà Đào', price: 30000, category: 'Trà' },
  { id: '6', name: 'Bánh Croissant', price: 20000, category: 'Bánh' },
  { id: '7', name: 'Nước Cam', price: 25000, category: 'Khác' },
  // Add more products as needed
];


const Sell: React.FC = () => {
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('Coffee');
  // State for menu items
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  // State for Customer
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');



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

  // Delete
  const removeFromOrder = (productId: string) => {
    setOrderItems(orderItems.filter(item => item._id !== productId)); // Lọc bỏ sản phẩm có id tương ứng
  };

  const clearOrder = () => {
    setOrderItems([]); // Xóa tất cả các sản phẩm trong giỏ hàng
  };

  //Customer
  const [customer, setCustomer] = useState<ICustomer>({
    name: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    sex: '',
    address: '',
  });

  // Icon delete
  <ul>
    {orderItems.map((item, index) => (
      <li key={index}>
        <span>{item.name}</span>
        <span>{item.quantity}</span>
        <span>{item.total.toLocaleString()} VND</span>
        <FaTrashAlt
          className={styles.deleteIcon}
          onClick={() => removeFromOrder(item._id)}
        />
      </li>
    ))}
  </ul>


  // Filtered products based on selected category
  const filteredProducts = menuItems.filter((product) => product.type === selectedCategory && product.isAvailable);

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
            <div key={product._id} className={styles.productItem} onClick={() => addToOrder(product)}>
              <span className={styles.productName}>{product.name}</span>
              <span className={styles.productPrice}>{product.price.toLocaleString()} VND</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h2>Order Summary</h2>
        <div className={styles.customerForm}>
          <input
            type="text"
            placeholder="Customer Name"
            value={customer.name || ''} // Safeguard to ensure value is a string
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev, name: e.target.value })) // Update only the `name` field
            }
            className={styles.inputField}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{item.total.toLocaleString()} VND</span>
              <span>
                <button
                  style={{ display: "flex", background: "transparent" }}
                  onClick={() => removeFromOrder(item._id)}>
                  <FaRegTrashAlt />
                </button>
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          <span>Tổng tiền</span>
          <span>{orderItems.reduce((acc, item) => acc + item.total, 0).toLocaleString()} VND</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.payButton} onClick={generatePDF}>Thanh toán</button>
          <button className={styles.cancelButton} onClick={clearOrder}>Hủy bỏ</button>
        </div>
      </div>
    </div>
  );
}

export default Sell;
