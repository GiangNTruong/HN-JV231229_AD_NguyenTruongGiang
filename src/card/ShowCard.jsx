import React, { useContext } from "react";
import { Avatar, Button, Drawer, List } from "antd";
import { GlobalContext } from "../context/Global";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ShowCard() {
  const {
    open,
    onClose,
    carts,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleRemoveAllFromCart,
  } = useContext(GlobalContext);
  const totalPrice = carts.reduce(
    (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
    0
  );
  return (
    <>
      <Drawer
        title="Your Cart"
        onClose={onClose}
        open={open}
        width={800}
        style={{ backgroundColor: "black", color: "white", height: "auto" }} // height auto
        closeIcon={<CloseOutlined style={{ color: "white" }} />} //màu nút X
        styles={{
          body: { paddingBottom: 80 },
          header: { color: "white" },
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={carts}
          renderItem={(cartItem) => (
            <List.Item
              actions={[
                <Button
                  onClick={() =>
                    handleUpdateCartQuantity(cartItem.product.id, 1)
                  }
                >
                  +
                </Button>,
                <span style={{ padding: "0 10px", color: "white" }}>
                  {cartItem.quantity}
                </span>,
                <Button
                  onClick={() =>
                    handleUpdateCartQuantity(cartItem.product.id, -1)
                  }
                >
                  -
                </Button>,
                <Button
                  onClick={() => handleRemoveFromCart(cartItem.product.id)}
                  danger
                >
                  <DeleteOutlined />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={cartItem.product.image} />}
                title={
                  <span style={{ color: "white" }}>
                    {cartItem.product.productName}
                  </span>
                }
                description={
                  <span style={{ color: "white" }}>
                    Price: ${cartItem.product.price}
                  </span>
                }
              />
              <div style={{ color: "white" }}>
                Total: ${cartItem.product.price * cartItem.quantity}
              </div>
            </List.Item>
          )}
        />
        <Button onClick={() => handleRemoveAllFromCart(carts)} type="primary">
          Xóa toàn bộ sản phẩm ở giỏ hàng
        </Button>
        <div
          style={{
            borderTop: "1px solid #f0f0f0",
            padding: "10px 0",
            textAlign: "right",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Total Price: ${totalPrice}
        </div>
      </Drawer>
    </>
  );
}
