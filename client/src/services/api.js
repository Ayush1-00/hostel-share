// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_BASE_URL = 'https://hostel-share.onrender.com/api';
class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    try {
      const response = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async register(userData) {
    try {
      const response = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // MealQR endpoints
  async getAvailableMealQRs() {
    try {
      const response = await this.request('/qr/available');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async createMealQR(formData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/qr/donate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async claimMealQR(id) {
    try {
      const response = await this.request(`/qr/claim/${id}`, {
        method: 'POST',
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // TravelPlan endpoints
  async getTravelPlans() {
    try {
      const response = await this.request('/travel/all');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async createTravelPlan(travelData) {
    try {
      const response = await this.request('/travel/create', {
        method: 'POST',
        body: JSON.stringify(travelData),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async searchTravelPlans(destination, travelDate) {
    try {
      const params = new URLSearchParams();
      if (destination) params.append('destination', destination);
      if (travelDate) params.append('travelDate', travelDate);
      const query = params.toString() ? `?${params}` : '';
      
      const response = await this.request(`/travel/match${query}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Admin endpoints
  async getAllUsers() {
    try {
      const response = await this.request('/admin/users');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getAllQRLogs() {
    try {
      const response = await this.request('/admin/qrs');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export const apiService = new ApiService();
