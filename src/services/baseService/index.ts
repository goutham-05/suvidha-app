import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://10.20.100.179:4000/api/";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVfbnVtYmVyIjoiOTAzMDc4OTY0MCIsImFkbWlzc2lvbm5vIjoiSVAyMzI0MDAyMDQ0IiwiaWF0IjoxNjgyNjE0NzQxLCJleHAiOjE2ODI2MTgzNDF9.Wf2mAQnZZ0GskPp86dEDO4dIApbYHrODkxUr4iTdcW8";

axios.defaults.baseURL = API_BASE_URL;

axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export const axiosGet = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(endpoint);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const axiosPost = async <T>(
  endpoint: string,
  data: T,
  token?: string
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(endpoint, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const axiosPut = async <T>(endpoint: string, data: T): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.put(endpoint, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const axiosDelete = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.delete(endpoint);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
