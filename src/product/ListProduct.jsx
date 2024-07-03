import React, { useContext } from "react";
import { GlobalContext } from "../context/Global";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export default function ListProduct() {
  const { products } = useContext(GlobalContext);

  return (
    <>
      {/* <main className="px-12">
        <h3 className="text-center uppercase font-bold py-6">
          Danh sách sản phẩm
        </h3>
        <Swiper className="mySwiper" spaceBetween={10} slidesPerView={5}>
          {products.map((pro) => (
            <SwiperSlide key={pro.id}>
              <ProductItem product={pro} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main> */}

      <div className="grid grid-cols-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {products.map((pro) => (
          <ProductItem product={pro} key={pro.id} />
        ))}
      </div>
    </>
  );
}
