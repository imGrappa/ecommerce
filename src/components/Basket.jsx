import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromBasket,
  updateQuantity,
} from "../redux/slices/productBasketSlice";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";

function Basket() {
  const dispatch = useDispatch();
  const basketItems = useSelector((store) => store.basket.basketItems);
  const [productDetails, setProductDetails] = useState({});

  // Sepet öğelerinin detaylarını API'den al
  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = {};
      for (const item of basketItems) {
        if (!productDetails[item.id]) {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${item.id}`
          );
          details[item.id] = response.data;
        }
      }
      setProductDetails(details);
    };

    if (basketItems.length > 0) {
      fetchProductDetails();
    }
  }, [basketItems]);

  if (basketItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">Sepetiniz Boş</h2>
        <p>Sepetinize ürün eklemek için alışverişe devam edebilirsiniz.</p>
      </div>
    );
  }

  const increaseQuantity = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Sepetiniz</h2>
      <div className="flex gap-6 items-start">
        <div className="flex flex-col gap-4 w-[70%]  border border-gray-300 p-3 rounded-lg">
          {basketItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={productDetails[item.id]?.image}
                  alt={productDetails[item.id]?.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="font-semibold">
                    {productDetails[item.id]?.title || "Yükleniyor..."}
                  </p>
                  <p>Fiyat: ${productDetails[item.id]?.price || "N/A"}</p>
                  <p>Miktar: {item.quantity}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id, item.quantity)}
                  className="text-2xl cursor-pointer"
                >
                  <IoRemoveCircleOutline />
                </button>
                <span className="text-xl">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id, item.quantity)}
                  className="text-2xl cursor-pointer"
                >
                  <AiOutlinePlusCircle />
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Kaldır
              </button>
            </div>
          ))}
        </div>
        <div className=" w-[30%] text-end  border border-gray-300 p-3 rounded-lg">
          <p className="text-2xl text-start mb-3">Sipariş Özeti</p>
          <p className="text-lg font-semibold flex items-center justify-between">
            <span>Toplam Ürün Sayısı: </span>
            <span>
              {basketItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </p>
          <p className="text-lg font-semibold flex items-center justify-between">
            <span>Toplam Tutar:</span>
            <span>
              $
              {basketItems
                .reduce(
                  (total, item) =>
                    total +
                    (productDetails[item.id]?.price || 0) * item.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </p>
          <button className="w-full cursor-pointer mt-4 py-2 px-3 bg-[#f27a1a] text-white rounded-lg">
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
}

export default Basket;
