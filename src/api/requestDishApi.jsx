// src/api/requestDishApi.js
import { apiClient } from "../services/ApiServices";

export const sendRequestDish = async ({ name, note }) => {
  try {
    const res = await apiClient.post("/checkout", {
      name,
      note,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi gửi yêu cầu món ăn:", err);
    throw err;
  }
};
