// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
// import { setSelectedProduct } from "../redux/slices/productSlice";
// import { IoRemoveCircleOutline } from "react-icons/io5";
// import { AiOutlinePlusCircle } from "react-icons/ai";

// import axios from "axios";
// import { useState } from "react";

// function ProductDetail() {
//   const { id } = useParams();
//   const { selectedProduct } = useSelector((store) => store.product);
//   const { title, price, description, category, image } = selectedProduct;
//   const dispatch = useDispatch();
//   const [productCount, setProductCount] = useState(0);

//   useEffect(() => {
//     getProductById();
//   }, [id]);

//   const getProductById = async () => {
//     try {
//       const response = await axios.get(
//         `https://fakestoreapi.com/products/${id}`
//       );
//       dispatch(setSelectedProduct(response.data));
//     } catch (error) {
//       console.error("Ürün yüklenirken hata oluştu:", error);
//     }
//   };

//   const addToBasket = () => {
//     alert(`${title} | sepete eklendi.`);
//   };
//   const increaseProductCount = () => {
//     setProductCount((prevCount) => prevCount + 1);
//   };
//   const decreaseProductCount = () => {
//     setProductCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
//   };

//   return (
//     <>
//       <div>
//         <p className="mb-3">{`Kategori > ${category}`}</p>
//         {selectedProduct ? (
//           <div className="flex gap-4">
//             <div className="max-w-[300px] border border-[#dedede] rounded-xl p-4">
//               <img src={image} alt={title} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-semibold mb-4">{title}</h1>
//               <p className="mb-10 text-xl text-[#d3760c] font-semibold">
//                 Fiyat: ${price}
//               </p>
//               <p className=" max-w-[500px]">
//                 Açıklama: <br /> {description}
//               </p>
//               <div className="flex gap-2 items-center mt-4">
//                 <button
//                   onClick={() => decreaseProductCount()}
//                   className="text-4xl cursor-pointer"
//                 >
//                   <IoRemoveCircleOutline />
//                 </button>
//                 <div className="count text-3xl">{productCount}</div>
//                 <button
//                   onClick={() => increaseProductCount()}
//                   className="text-4xl cursor-pointer"
//                 >
//                   <AiOutlinePlusCircle />
//                 </button>
//               </div>
//               <button
//                 onClick={() => addToBasket()}
//                 className="mt-4 rounded-lg bg-[#af5e5e] text-white py-2 px-4 cursor-pointer hover:bg-[#c78181]"
//               >
//                 Sepete Ekle
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p>Ürün yükleniyor...</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default ProductDetail;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { addToBasket } from "../redux/slices/productBasketSlice"; // Yeni eklenen import

function ProductDetail() {
  const { id } = useParams();
  const { selectedProduct } = useSelector((store) => store.product);
  const { title, price, description, category, image } = selectedProduct;
  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    getProductById();
  }, [id]);

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      dispatch(setSelectedProduct(response.data));
    } catch (error) {
      console.error("Ürün yüklenirken hata oluştu:", error);
    }
  };

  const handleAddToBasket = () => {
    if (productCount > 0) {
      dispatch(addToBasket({ id, quantity: productCount })); // Sepete ürünü ve miktarını ekle
      alert(`${title} | ${productCount} adet sepete eklendi.`);
    } else {
      alert("Lütfen geçerli bir miktar seçin.");
    }
  };

  const increaseProductCount = () => {
    setProductCount((prevCount) => prevCount + 1);
  };

  const decreaseProductCount = () => {
    setProductCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <>
      <div>
        <p className="mb-3">{`Kategori > ${category}`}</p>
        {selectedProduct ? (
          <div className="flex gap-4">
            <div className="max-w-[300px] border border-[#dedede] rounded-xl p-4">
              <img src={image} alt={title} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-4">{title}</h1>
              <p className="mb-10 text-xl text-[#d3760c] font-semibold">
                Fiyat: ${price}
              </p>
              <p className=" max-w-[500px]">
                Açıklama: <br /> {description}
              </p>
              <div className="flex gap-2 items-center mt-4">
                <button
                  onClick={() => decreaseProductCount()}
                  className="text-4xl cursor-pointer"
                >
                  <IoRemoveCircleOutline />
                </button>
                <div className="count text-3xl">{productCount}</div>
                <button
                  onClick={() => increaseProductCount()}
                  className="text-4xl cursor-pointer"
                >
                  <AiOutlinePlusCircle />
                </button>
              </div>
              <button
                onClick={() => handleAddToBasket()}
                className="mt-4 rounded-lg bg-[#af5e5e] text-white py-2 px-4 cursor-pointer hover:bg-[#c78181]"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        ) : (
          <p>Ürün yükleniyor...</p>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
