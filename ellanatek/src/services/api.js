// src/services/api.js
class EllantekAPI {
    constructor() {
      this.baseURL = 'http://localhost:5004/api';
      this.token = localStorage.getItem('ellanatek_token');
      this.refreshToken = localStorage.getItem('ellanatek_refresh_token');
    }
  
    // Helper method to get headers
    getHeaders(includeAuth = true, contentType = 'application/json') {
      const headers = {
        'Content-Type': contentType,
      };
  
      if (includeAuth && this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }
  
      return headers;
    }
  
    // Generic request method
    async request(endpoint, options = {}) {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        ...options,
        headers: {
          ...this.getHeaders(options.includeAuth !== false),
          ...options.headers,
        },
      };
  
      try {
        const response = await fetch(url, config);
        
        // Handle unauthorized responses
        if (response.status === 401) {
          this.clearAuth();
          throw new Error('Unauthorized - please login again');
        }
  
        // Handle other error responses
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
  
        // Return response based on content type
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        }
        
        return response;
      } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
      }
    }
  
    // Authentication methods
    setAuth(token, refreshToken = null) {
      this.token = token;
      this.refreshToken = refreshToken;
      localStorage.setItem('ellanatek_token', token);
      if (refreshToken) {
        localStorage.setItem('ellanatek_refresh_token', refreshToken);
      }
    }
  
    clearAuth() {
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem('ellanatek_token');
      localStorage.removeItem('ellanatek_refresh_token');
    }
  
    isAuthenticated() {
      return !!this.token;
    }
  
    // Auth endpoints
    async signup(userData) {
      const response = await this.request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        includeAuth: false,
      });
      
      if (response.token) {
        this.setAuth(response.token, response.refreshToken);
      }
      
      return response;
    }
  
    async login(credentials) {
      const response = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        includeAuth: false,
      });
      
      if (response.token) {
        this.setAuth(response.token, response.refreshToken);
      }
      
      return response;
    }
  
    async sendVerificationCode(phoneNumber) {
      return await this.request('/auth/send-code', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
        includeAuth: false,
      });
    }
  
    async verifyCode(phoneNumber, code) {
      return await this.request('/auth/verify-code', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, code }),
        includeAuth: false,
      });
    }
  
    async logout() {
      // If you have a logout endpoint, call it here
      // await this.request('/auth/logout', { method: 'POST' });
      this.clearAuth();
    }
  
    // Ads methods
    async uploadAd(formData) {
      return await this.request('/api/ads/upload', {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set content-type for FormData, let browser set it
          'Authorization': `Bearer ${this.token}`,
        },
      });
    }
  
    async getAds(status = null) {
      const query = status ? `?status=${status}` : '';
      return await this.request(`/api/ads${query}`);
    }
  
    async approveAd(adId) {
      return await this.request(`/api/ads/${adId}/approve`, {
        method: 'PATCH',
      });
    }
  
    async rejectAd(adId) {
      return await this.request(`/api/ads/${adId}/reject`, {
        method: 'PATCH',
      });
    }
  
    async toggleAdActive(adId) {
      return await this.request(`/api/ads/${adId}/active`, {
        method: 'PATCH',
      });
    }
  
    async bookAd(bookingData) {
      return await this.request('/api/ads/book', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
    }
  
    // Contact methods
    async submitContact(contactData) {
      return await this.request('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
        includeAuth: false,
      });
    }
  
    async getContacts() {
      return await this.request('/api/contacts');
    }
  
    // Controller methods
    async getControllerHealth() {
      return await this.request('/api/ws-health');
    }
  
    // Email methods
    async sendEmail(emailData) {
      return await this.request('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(emailData),
      });
    }
  
    // Payment methods
    async createPaymentIntent(paymentData) {
      return await this.request('/api/payments/create-intent', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
    }
  
    // Unsubscribe methods
    async unsubscribe(contactData) {
      return await this.request('/api/unsubscribe', {
        method: 'POST',
        body: JSON.stringify(contactData),
        includeAuth: false,
      });
    }
  
    // WebSocket connection for LED controllers
    connectWebSocket(onMessage, onError, onClose) {
      const wsUrl = this.baseURL.replace('http', 'ws');
      const ws = new WebSocket(`${wsUrl}/ws`);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
      };
      
      ws.onmessage = onMessage;
      ws.onerror = onError || ((error) => console.error('WebSocket error:', error));
      ws.onclose = onClose || (() => console.log('WebSocket disconnected'));
      
      return ws;
    }
  }
  
  // Create and export a singleton instance
  const ellantekAPI = new EllantekAPI();
  export default ellantekAPI;
  
  // Also export the class for testing or multiple instances
  export { EllantekAPI };