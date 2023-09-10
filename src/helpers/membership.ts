import { api } from "@/utils/api";

export const getMembership = async (name: string) => {
  const response = await api.post("/membership/corporate", {
    membership_name: name,
  });
  return response.data;
};
