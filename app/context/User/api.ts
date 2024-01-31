import axios, { AxiosInstance, AxiosResponse } from "axios";

interface LoginResponse {
  token: string;
}

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true, // Enable sending cookies along with the request
});

export const setBearerToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("bearerToken", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("bearerToken");
  }
};

export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    console.log("usao u login");

    const csrfResponse = await api.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    const response: AxiosResponse<LoginResponse> = await api.post(
      "/api/login",
      {
        email,
        password,
      }
    );

    const { token } = response.data;

    setBearerToken(token);

    return { success: true, token };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: error };
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.get("/api/user");
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("currentUser");
  const response: AxiosResponse<User> = await api.post("/api/logout");
  setBearerToken(null);
};
