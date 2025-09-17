import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ReceiptItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
  totalPrice?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  profilePicture: string | null;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
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

  getReceiptById: async (id: string): Promise<Receipt> => {
    const response = await api.get(`/receipts/${id}`);
    return response.data;
  },

  updateReceipt: async (id: string, receipt: Partial<Receipt>): Promise<Receipt> => {
    const response = await api.put(`/receipts/${id}`, receipt);
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

  getMonthlySpending: async (): Promise<Record<string, number>> => {
    const response = await api.get('/analytics/monthly');
    return response.data;
  },

  getTopItems: async (): Promise<Record<string, number>> => {
    const response = await api.get('/analytics/top-items');
    return response.data;
  },

  getRecentReceipts: async (limit: number = 5): Promise<Receipt[]> => {
    const response = await api.get(`/analytics/recent-receipts?limit=${limit}`);
    return response.data;
  },
};

// User Profile API
export const userProfileApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.put('/user/profile', profile);
    return response.data;
  },

  uploadProfilePicture: async (file: File): Promise<UserProfile> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/user/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  changePassword: async (data: PasswordChange): Promise<void> => {
    await api.post('/user/change-password', data);
  }
};

export default api;