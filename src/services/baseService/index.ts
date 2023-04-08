import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "https://example.com/api";

export const axiosGet = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(
      `${API_BASE_URL}/${endpoint}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const axiosPost = async <T>(endpoint: string, data: T): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const axiosPut = async <T>(endpoint: string, data: T): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.put(
      `${API_BASE_URL}/${endpoint}`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const axiosDelete = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.delete(
      `${API_BASE_URL}/${endpoint}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
