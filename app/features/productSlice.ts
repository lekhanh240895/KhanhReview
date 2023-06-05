import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:3000/api/products");
    return await response.json();
  }
);

// Action creators are generated for each case reducer function
export const {} = productSlice.actions;

export default productSlice;
