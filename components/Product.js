import React from "react";
import Image from "next/image";
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

function Product({ _id, name, price, description, picture }) {
  const { setSelectedProducts } = useContext(ProductsContext);
  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }
  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <Image src={picture} width={160} height={160} />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
      </div>
      <p className="text-sm mt-1 leading-4">{description}</p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">${price}</div>
        <button
          onClick={addProduct}
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Product;
