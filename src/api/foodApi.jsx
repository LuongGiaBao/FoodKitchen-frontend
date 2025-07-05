import axios from "axios";
import { apiClient } from "../services/ApiServices";

export const fetchAllFood = async () => {
  try {
    const response = await apiClient.get("/foods?populate=*");
    return response.data;
  } catch (error) {
    console.error("Error fetching buses:", error);
    throw error;
  }
};
