// src/api/checkoutApi.js
import { apiClient } from "../services/ApiServices";

/// thanh toan gui thong bao ve mail
export const checkoutOrder = async (cart, userEmail) => {
  try {
    const res = await apiClient.post("/checkout", {
      cart,
      userEmail,
    });
    return res.data;
  } catch (error) {
    console.error("Checkout failed:", error);
    throw error;
  }
};


/// them mon an gui ve mail

