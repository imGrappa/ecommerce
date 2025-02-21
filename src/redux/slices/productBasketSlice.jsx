// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   productCount: [],
// };

// export const productBasketSlice = createSlice({
//   name: "basket",
//   initialState,
//   reducers: {},
//   extraReducers: {},
// });

// export const {} = productBasketSlice.actions;

// export default productBasketSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  basketItems: loadFromLocalStorage("basketItems") || [], // Eğer localStorage'da veri yoksa boş array kullan
};

export const productBasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.basketItems.find((item) => item.id === id);

      if (existingItem) {
        // Eğer ürün sepette zaten varsa, miktarını güncelle
        existingItem.quantity += quantity;
      } else {
        // Eğer ürün sepette yoksa, yeni bir öğe olarak ekle
        state.basketItems.push({ id, quantity });
      }

      // localStorage'a güncel sepeti kaydet
      saveToLocalStorage("basketItems", state.basketItems);
    },
    removeFromBasket: (state, action) => {
      const { id } = action.payload;
      state.basketItems = state.basketItems.filter((item) => item.id !== id);

      // localStorage'a güncel sepeti kaydet
      saveToLocalStorage("basketItems", state.basketItems);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.basketItems.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      // localStorage'a güncel sepeti kaydet
      saveToLocalStorage("basketItems", state.basketItems);
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity } =
  productBasketSlice.actions;

export default productBasketSlice.reducer;
