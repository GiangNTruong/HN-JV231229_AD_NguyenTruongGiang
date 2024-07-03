import React, { createContext, useState } from "react";
import Header from "../layouts/header/Header";
import ListProduct from "../product/ListProduct";
import ProductJSON from "../data.json";
import ShowCard from "../card/ShowCard";
export const GlobalContext = createContext();
//Tạo ngữ cảnh
export default function Global() {
  // Lấy dữ liệu carts trên localStorage
  const [carts, setCarts] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];
    return cartLocals;
  });

  //Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const findIndexProduct = carts.findIndex(
      (cart) => cart.product.id === product.id
    );
    if (findIndexProduct === -1) {
      const newCart = {
        id: Math.ceil(Math.random() * 10000000),
        product: product,
        quantity: 1,
      };
      //Thêm sản phẩm vào trong giỏ hàng
      const updateCart = [...carts, newCart];
      // Cập nhật vào state
      setCarts(updateCart);
      // lưu vào local
      localStorage.setItem("carts", JSON.stringify(updateCart));
    } else {
      const newCartUpdate = [...carts];
      // Tăng số lượng
      newCartUpdate[findIndexProduct].quantity =
        newCartUpdate[findIndexProduct].quantity + 1;
      // Cập nhật vào state
      setCarts(newCartUpdate);
      // lưu vào local
      localStorage.setItem("carts", JSON.stringify(newCartUpdate));
    }
  };

  // Hàm show Card
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //Hàm quản lý số lượng
  const handleUpdateCartQuantity = (productId, quantity) => {
    // Duyệt qua các sản phẩm hiện có trong giỏ hàng
    const updatedCarts = carts
      .map(
        (cart) =>
          // Kiểm tra nếu sản phẩm hiện tại khớp với product ID cần cập nhật
          cart.product.id === productId
            ? { ...cart, quantity: cart.quantity + quantity } // Cập nhật số lượng
            : cart // Giữ nguyên các sản phẩm khác
      )
      .filter((cart) => cart.quantity > 0); // Loại bỏ các sản phẩm có số lượng bằng 0 hoặc ít hơn

    // Cập nhật state với các sản phẩm mới trong giỏ hàng
    setCarts(updatedCarts);
    // Lưu các sản phẩm đã cập nhật vào localStorage
    localStorage.setItem("carts", JSON.stringify(updatedCarts));
  };

  // Hàm xoá sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (productId) => {
    // Lọc bỏ sản phẩm khớp với product ID ra khỏi giỏ hàng
    const updatedCarts = carts.filter((cart) => cart.product.id !== productId);

    setCarts(updatedCarts);
    localStorage.setItem("carts", JSON.stringify(updatedCarts));
  };

  //Hàm xóa toàn bộ sản phẩm ở giỏ hàng
  const handleRemoveAllFromCart = () => {
    setCarts([]);
    localStorage.setItem("carts", JSON.stringify([]));
  };

  const dataGlobal = {
    products: ProductJSON.products,
    carts,
    cartLength: carts.length,
    handleAddToCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleRemoveAllFromCart,
    open,
    showDrawer,
    onClose,
  };

  return (
    <>
      <GlobalContext.Provider value={dataGlobal}>
        <Header />
        <ListProduct />
        <ShowCard />
      </GlobalContext.Provider>
    </>
  );
}
