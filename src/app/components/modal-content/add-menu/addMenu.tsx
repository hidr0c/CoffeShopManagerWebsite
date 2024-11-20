"use client";

import { useState, useEffect } from "react";
import { Input, Select } from "@ui/input/input";
import { Button } from "@ui/button/button";
import RadioGroup from "@/components/ui/radioGroup/radioGroup";
import styles from "./addMenu.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

export default function AddDishModal({ dishData }) {
  const emptyImage = "/images/empty.jpg";

  // Khởi tạo state với giá trị mặc định là rỗng hoặc giá trị được truyền từ dishData
  const [type, setType] = useState("coffee");
  const [dishName, setDishName] = useState("");
  const [dishCode, setDishCode] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Khi dishData thay đổi, cập nhật các state tương ứng
  useEffect(() => {
    if (dishData) {
      setType(dishData.type || "coffee");
      setDishName(dishData.name || "");
      setDishCode(dishData.id || "00001");
      setPrice(dishData.quant || "1000VND");
      setImage(dishData.image || null);
      setImagePreview(
        dishData.image ? URL.createObjectURL(dishData.image) : null
      );
    }
  }, [dishData]);
  // Xử lý chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Chỉ được chọn file ảnh định dạng .jpg, .jpeg, hoặc .png");
    }
  };

  // Xử lý lưu
  const handleSave = () => {
    const updatedDishData = {
      type,
      dishName,
      dishCode,
      price,
      image,
    };
    console.log("Updated Dish Data:", updatedDishData); // Thay bằng logic gửi dữ liệu lên server
    alert("Món ăn đã được lưu thành công!");
  };

  // Xử lý hủy bỏ
  const handleCancel = () => {
    // Reset state
    setType("coffee");
    setDishName("");
    setDishCode("");
    setPrice("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className={styles.menu_container} style={{ display: "flex" }}>
      <div className="" style={{ margin: "0 0 2em 0", width: "70%" }}>
        <RadioGroup
          label="Loại"
          value={type}
          options={[
            { value: "coffee", label: "Coffee" },
            { value: "drink", label: "Đồ uống" },
            { value: "cake", label: "Bánh" },
          ]}
          onChange={(e) => setType(e.target.value)} // Cập nhật state cho loại
        />
        <Input
          style={{ marginTop: "1em", display: "flex" }}
          label="Tên món"
          value={dishName}
          required={true}
          onChange={(e) => setDishName(e.target.value)} // Cập nhật state cho Tên món
        />
        <div style={{ display: "flex", gap: "1em", flex: 1 }}>
          <Input
            label="Mã món"
            value={dishCode}
            required={true}
            onChange={(e) => setDishCode(e.target.value)} // Cập nhật state cho Mã món
          />
          <Input
            label="Giá bán"
            type="text"
            required={true}
            value={price}
            labelStyle={{ paddingLeft: "1em" }} // Add CSS for label tag
            onChange={(e) => setPrice(e.target.value)} // Cập nhật state cho Giá bán
          />
        </div>
      </div>
      <div
        className=""
        style={{
          margin: "1em",
          padding: "1em",
          border: "1px solid #C4C4C4",
          width: "30%",
          position: "relative",
          minHeight: "200px",
        }}
      >
        <label
          style={{
            position: "absolute",
            top: "-0.5em",
            left: "1em",
            background: "white",
            padding: "0 0.5em",
          }}
        >
          Ảnh đại diện
        </label>
        <div style={{ display: "flex" }}>
          <img
            src={imagePreview || emptyImage}
            alt="Preview"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              padding: "0 1em",
            }}
          >
            <div
              className=""
              style={{
                color: "#ccc",
                cursor: "pointer",
                padding: "0.4em",
                border: "1px solid #C4C4C4",
              }}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <IoIosMore />
            </div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
            />
            <div
              className=""
              style={{
                color: "#A30D11",
                cursor: "pointer",
                padding: "0.4em",
                border: "1px solid #C4C4C4",
              }}
              onClick={() => setImage(null)}
            >
              <FaRegTrashAlt />
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleSave} style={{ marginRight: "1em" }}>
          Lưu
        </Button>
        <Button onClick={handleCancel}>Hủy</Button>
      </div> */}
    </div>
  );
}
