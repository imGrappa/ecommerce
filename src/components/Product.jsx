import React from "react";
import { useNavigate } from "react-router";

function Product({ product }) {
  const { title, id, price, description, category, image } = product;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/product-details/" + id)}
      className="border border-[#e2e2e2] rounded-2xl py-3 px-4 hover:shadow-sm"
    >
      <div className="max-w-[200px] h-[300px] mx-auto mb-4 flex flex-col items-center justify-center">
        <img
          className="w-full h-full object-contain max-w-full"
          src={image}
          alt={title}
        />
      </div>
      <h2 className="text-md mb-2">{title}</h2>
      <div className="text-lg text-[#f27a1a] font-bold">{price} TL</div>
    </div>
  );
}

export default Product;
