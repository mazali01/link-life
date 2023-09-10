import axios from "axios"
import { useNavigate } from "react-router-dom";

export const useHttpClient = () => {
  const navigate = useNavigate();
  const httpClient = axios.create({
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/auth");
      }
      throw error;
    }
  );

  return httpClient;
}
