import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Authentication interfaces
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};

export interface ReceiptItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
  totalPrice?: number;
}

export interface Receipt {
  id: string;
  filename: string;
  imageUrl?: string;
  extractedText: string;
  items: ReceiptItem[];
  totalAmount: number;
  store: string;
  category: string;
  createdDate: string;
  lastModifiedDate: string;
}

export interface AnalyticsData {
  totalSpent: number;
  totalReceipts: number;
  averageReceiptAmount: number;
  monthlySpending: Record<string, number>;
  topItems: Record<string, number>;
  categorySpending: Record<string, number>;
}

// Receipt API
export const receiptApi = {
  uploadReceipt: async (file: File): Promise<Receipt> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/receipts/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAllReceipts: async (): Promise<Receipt[]> => {
    const response = await api.get('/receipts');
    return response.data;
  },

  deleteReceipt: async (id: string): Promise<void> => {
    await api.delete(`/receipts/${id}`);
  },
};

// Analytics API
export const analyticsApi = {
  getAnalyticsSummary: async (): Promise<AnalyticsData> => {
    const response = await api.get('/analytics/summary');
    return response.data;
  },
};
