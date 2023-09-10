import { api } from "@/utils/api";

export const registerUser = async (username: string, password: string) => {
  const response = await api.post("/users", { username, password });
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};
