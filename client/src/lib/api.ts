import { ErrorResponse } from "./validators";

const BASE_URL = "/api/v1";

interface FetchOptions extends RequestInit {
  // Can add custom options here if needed
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorData: ErrorResponse = { message: "An unknown error occurred." };
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use status text
      errorData.message = response.statusText;
    }
    throw new Error(errorData.message);
  }
  // Check for 204 No Content response
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

export const api = {
  get: async <T>(path: string, options?: FetchOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    return handleResponse(response);
  },

  post: async <T>(path: string, data: unknown, options?: FetchOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async <T>(path: string, data: unknown, options?: FetchOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async <T>(path: string, options?: FetchOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    return handleResponse(response);
  },

  patch: async <T>(path: string, data: unknown, options?: FetchOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};